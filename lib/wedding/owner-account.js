import { ConflictError, NotFoundError } from "../errors.js";

// Dependencies are supplied by the authenticated admin route; passwords never enter Firestore.
export async function createOwnerAccount({ auth, db, fieldValue, eventId, actorUid, email, password }) {
  const ref = db.collection("events").doc(eventId);
  if (!(await ref.get()).exists) throw new NotFoundError();
  let user;
  try { user = await auth.createUser({ email, password }); }
  catch (error) { if (error.code === "auth/email-already-exists") throw new ConflictError("Ese correo ya tiene una cuenta. Usa el enlace de activación para darle acceso con su contraseña actual."); throw error; }
  try {
    await db.runTransaction(async transaction => {
      if (!(await transaction.get(ref)).exists) throw new NotFoundError();
      transaction.update(ref, { ownerUids: fieldValue.arrayUnion(user.uid), updatedAt: fieldValue.serverTimestamp() });
      transaction.create(db.collection("auditLogs").doc(), { actorUid, eventId, action: "owner.account_created", createdAt: fieldValue.serverTimestamp(), metadata: { uid: user.uid } });
    });
  } catch (error) {
    try { await auth.deleteUser(user.uid); } catch { console.error("Owner account cleanup failed"); }
    throw error;
  }
  return { ok: true, uid: user.uid, loginPath: "/panel/login" };
}
