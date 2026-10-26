import test from "node:test";
import assert from "node:assert/strict";
import { removeEventOwner } from "../lib/wedding/remove-owner.js";
function fixture(owners, exists = true) {
  const writes = [];
  const db = {
    collection: name => ({ doc: id => ({ path: `${name}/${id || "audit"}` }) }),
    runTransaction: async callback => callback({
      get: async () => ({ exists, data: () => ({ ownerUids: owners }) }),
      update: (ref, data) => writes.push({ path: ref.path, data }),
      create: (ref, data) => writes.push({ path: ref.path, data }),
    }),
  };
  return { writes, args: { db, fieldValue: { arrayRemove: uid => ({ remove: uid }), serverTimestamp: () => "now" }, eventId: "event-a", uid: "wrong-owner", actorUid: "admin" } };
}
test("admin can remove the only client owner without deleting the event or account", async () => {
  const f = fixture(["wrong-owner"]);
  await removeEventOwner(f.args);
  assert.deepEqual(f.writes[0], { path: "events/event-a", data: { ownerUids: { remove: "wrong-owner" }, updatedAt: "now" } });
  assert.equal(f.writes[1].path, "auditLogs/audit");
  assert.equal(f.writes[1].data.action, "owner.removed");
  assert.equal(f.writes[1].data.actorUid, "admin");
});
test("removal targets only the selected membership", async () => {
  const f = fixture(["wrong-owner", "correct-owner"]);
  await removeEventOwner(f.args);
  assert.deepEqual(f.writes[0].data.ownerUids, { remove: "wrong-owner" });
  assert.equal(f.writes.length, 2);
});
test("unknown membership or event produces no writes", async () => {
  for (const f of [fixture(["other-owner"]), fixture([], false)]) {
    await assert.rejects(removeEventOwner(f.args), e => e.status === 404);
    assert.equal(f.writes.length, 0);
  }
});
