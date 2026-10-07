import test from "node:test";
import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import sharp from "sharp";
import { guestPhotos, guestPhotosAreOpen } from "../lib/event-photos/config.js";
import { enforcePhotoRateLimit, processGuestPhoto, uploadPhotoToCloudinary, validatePhotoFile } from "../lib/event-photos/server.js";

const env = { CLOUDINARY_CLOUD_NAME: "test-cloud", CLOUDINARY_API_KEY: "test-key", CLOUDINARY_API_SECRET: "test-secret" };
const picture = () => sharp({ create: { width: 3200, height: 1600, channels: 3, background: "#657044" } }).png().toBuffer();
function request(file, { origin = "https://example.com", id = randomUUID(), headers = {} } = {}) {
  const form = new FormData(); form.set("file", file, "foto.png"); form.set("uploadId", id);
  return new Request("https://example.com" + guestPhotos.apiPath, { method: "POST", body: form, headers: { origin, ...headers } });
}

test("real images are decoded, resized and converted; fake image payloads and oversized files are rejected", async () => {
  const result = await validatePhotoFile(new Blob([await picture()], { type: "image/png" }));
  const metadata = await sharp(result).metadata();
  assert.equal(metadata.format, "jpeg"); assert.equal(metadata.width, 2400); assert.equal(metadata.height, 1200); assert.equal(metadata.exif, undefined);
  await assert.rejects(validatePhotoFile(new Blob(["<svg>not a photo</svg>"], { type: "image/png" })), error => error.status === 400);
  await assert.rejects(validatePhotoFile(new Blob(["<svg/>"], { type: "image/svg+xml" })), error => error.status === 400);
  await assert.rejects(validatePhotoFile(new Blob([new Uint8Array(guestPhotos.maxFileBytes + 1)], { type: "image/jpeg" })), error => error.status === 413);
});

test("public handler checks origin, upload ID and configuration before invoking Cloudinary", async () => {
  const file = new Blob([await picture()], { type: "image/png" });
  let uploads = 0;
  const deps = { env, now: Date.parse(guestPhotos.opensAt), rateLimit: async () => {}, upload: async () => { uploads++; return { ok: true, id: "asset-123" }; } };
  assert.deepEqual(await processGuestPhoto(request(file), deps), { ok: true, id: "asset-123" });
  await assert.rejects(processGuestPhoto(request(file, { origin: "https://evil.example" }), deps), error => error.status === 403);
  await assert.rejects(processGuestPhoto(request(file, { id: "another-event/photo" }), deps), error => error.status === 400);
  await assert.rejects(processGuestPhoto(request(file), { ...deps, env: {} }), error => error.status === 503);
  await assert.rejects(processGuestPhoto(request(file, { headers: { "content-length": String(5 * 1024 * 1024) } }), deps), error => error.status === 413);
  assert.equal(uploads, 1);
});

test("Cloudinary requests are signed, scoped to Caleb and Ciriam and never overwrite; errors cannot produce false success", async () => {
  const uploadId = randomUUID();
  const fetcher = async (url, options) => {
    assert.equal(url, "https://api.cloudinary.com/v1_1/test-cloud/image/upload");
    const body = options.body;
    assert.equal(body.get("folder"), guestPhotos.folder);
    assert.equal(body.get("public_id"), uploadId); assert.equal(body.get("overwrite"), "false");
    const params = ["folder", "overwrite", "public_id", "tags", "timestamp"].map(key => `${key}=${body.get(key)}`).join("&");
    assert.equal(body.get("signature"), createHash("sha1").update(params + env.CLOUDINARY_API_SECRET).digest("hex"));
    return Response.json({ asset_id: "asset-123", public_id: guestPhotos.folder + "/" + uploadId, resource_type: "image" });
  };
  const result = await uploadPhotoToCloudinary(Buffer.from("test"), uploadId, { env, fetcher });
  assert.deepEqual(result, { ok: true, id: "asset-123" });
  assert.ok(!JSON.stringify(result).includes(env.CLOUDINARY_API_SECRET));
  for (const bad of [Response.json({ error: { message: "private provider details" } }, { status: 503 }), new Response("not json"), Response.json({ asset_id: "wrong", public_id: "another-event", resource_type: "image" })]) {
    await assert.rejects(uploadPhotoToCloudinary(Buffer.from("test"), uploadId, { env, fetcher: async () => bad }), error => error.status === 502 && !error.message.includes("private provider details"));
  }
});

test("rate limits persist across requests and reset after the window; no event or RSVP documents are touched", async () => {
  const documents = new Map();
  const db = {
    collection: name => { assert.equal(name, "guestPhotoRateLimits"); return { doc: id => id }; },
    runTransaction: async callback => {
      const writes = [];
      await callback({ get: async id => ({ data: () => documents.get(id) }), set: (id, value) => writes.push([id, value]) });
      writes.forEach(([id, value]) => documents.set(id, value));
    },
  };
  const input = new Request("https://example.com", { headers: { "x-vercel-forwarded-for": "192.0.2.1" } });
  for (let count = 0; count < 120; count++) await enforcePhotoRateLimit(input, { db, now: 1_000_000 });
  await assert.rejects(enforcePhotoRateLimit(input, { db, now: 1_000_001 }), error => error.status === 429);
  await enforcePhotoRateLimit(input, { db, now: 2_000_000 });
  assert.equal([...documents.entries()].find(([key]) => key !== guestPhotos.slug)[1].count, 1);
});


test("uploads stay blocked until midnight of the event in Mexico, without contacting storage", async () => {
  const opening = Date.parse(guestPhotos.opensAt);
  assert.equal(guestPhotosAreOpen(opening - 1), false);
  assert.equal(guestPhotosAreOpen(opening), true);
  assert.equal(guestPhotosAreOpen(opening + 86400000), true);
  let touched = false;
  await assert.rejects(processGuestPhoto(request(new Blob(["test"], { type: "image/jpeg" })), {
    env, now: opening - 1,
    rateLimit: async () => { touched = true; },
    upload: async () => { touched = true; },
  }), error => error.status === 403 && error.code === "photos_not_open" && error.message.includes("14 de noviembre de 2026"));
  assert.equal(touched, false);
});


test("gallery lists only this event's photos and does not expose credentials", async () => {
  const { listGuestPhotos } = await import("../lib/event-photos/gallery.js");
  const result = await listGuestPhotos("", { env, fetcher: async (url, options) => {
    assert.equal(url.searchParams.get("prefix"), guestPhotos.folder + "/");
    assert.equal(url.searchParams.get("max_results"), "30");
    assert.equal(options.headers.Authorization, "Basic " + Buffer.from("test-key:test-secret").toString("base64"));
    return Response.json({ resources: [
      { asset_id: "photo-1", public_id: guestPhotos.folder + "/1", resource_type: "image", secure_url: "https://res.cloudinary.com/test-cloud/image/upload/v1/photo.jpg" },
      { asset_id: "other", public_id: "other-event/1", resource_type: "image", secure_url: "https://res.cloudinary.com/test-cloud/image/upload/other.jpg" },
    ], next_cursor: "next123" });
  }});
  assert.equal(result.photos.length, 1);
  assert.equal(result.nextCursor, "next123");
  assert.match(result.photos[0].thumbnail, /c_fill,w_500/);
  assert.ok(!JSON.stringify(result).includes("test-secret"));
  await assert.rejects(listGuestPhotos("invalid/cursor", { env }), error => error.status === 400);
  await assert.rejects(listGuestPhotos("", { env, fetcher: async () => Response.json({}, { status: 401 }) }), error => error.status === 502);
});
