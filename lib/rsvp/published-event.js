import "server-only";
import { getAdminDb } from "../firebase/admin.js";
import { NotFoundError } from "../errors.js";
import { slugPattern } from "../wedding/slug.js";

export function canonicalRsvpSlug(slug) {
  return slug === "catalina-y-jorge-playa" ? "catalina-y-jorge" : slug;
}

export async function getPublishedRsvpEvent(slug, { db = getAdminDb() } = {}) {
  if (!slugPattern.test(slug)) throw new NotFoundError();
  const canonical = canonicalRsvpSlug(slug);
  const slugDoc = await db.collection("slugs").doc(canonical).get();
  if (!slugDoc.exists) throw new NotFoundError();
  const eventRef = db.collection("events").doc(slugDoc.data().eventId);
  const eventDoc = await eventRef.get();
  if (!eventDoc.exists || eventDoc.data().status !== "published" || eventDoc.data().slug !== canonical) throw new NotFoundError();
  return { db, eventRef, event: eventDoc.data() };
}
