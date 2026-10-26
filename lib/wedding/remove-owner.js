import { NotFoundError } from "../errors.js";

// Admins retain access independently of ownerUids, so an event may have no client owner.
export async function removeEventOwner({ db, fieldValue, eventId, uid, actorUid }) {
  const ref = db.collection("events").doc(eventId);
  await db.runTransaction(async transaction => {
    const snapshot = await transaction.get(ref);
    if (!snapshot.exists || !snapshot.data().ownerUids?.includes(uid)) throw new NotFoundError();
    transaction.update(ref, {
      ownerUids: fieldValue.arrayRemove(uid),
      updatedAt: fieldValue.serverTimestamp(),
    });
    transaction.create(db.collection("auditLogs").doc(), {
      actorUid, eventId, action: "owner.removed",
      createdAt: fieldValue.serverTimestamp(), metadata: { ownerUid: uid },
    });
  });
}
