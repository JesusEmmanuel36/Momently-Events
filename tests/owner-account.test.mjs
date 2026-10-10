import test from "node:test";
import assert from "node:assert/strict";
import { createOwnerAccount } from "../lib/wedding/owner-account.js";
function fixture({exists=true,duplicate=false,failure=false}={}) {
  const writes=[],deleted=[];let created=0;
  const doc=path=>({path,get:async()=>({exists})});
  const db={collection:name=>({doc:id=>doc(`${name}/${id||"audit"}`)}),runTransaction:async callback=>{if(failure)throw Error("Database unavailable");await callback({get:async()=>({exists}),update:(ref,data)=>writes.push({path:ref.path,data}),create:(ref,data)=>writes.push({path:ref.path,data})});}};
  const auth={createUser:async()=>{created++;if(duplicate)throw Object.assign(Error("exists"),{code:"auth/email-already-exists"});return{uid:"new-owner"};},deleteUser:async uid=>deleted.push(uid)};
  return {args:{auth,db,fieldValue:{arrayUnion:uid=>({union:uid}),serverTimestamp:()=>"now"},eventId:"only-this-event",actorUid:"admin",email:"client@example.com",password:"Initial-password"},writes,deleted,get created(){return created;}};
}
test("new owner is assigned only to the requested event and credentials are absent from stored data",async()=>{
  const f=fixture();assert.equal((await createOwnerAccount(f.args)).uid,"new-owner");assert.equal(f.writes[0].path,"events/only-this-event");assert.deepEqual(f.writes[0].data.ownerUids,{union:"new-owner"});assert.ok(!JSON.stringify(f.writes).includes(f.args.password));
});
test("existing account is never reset or overwritten",async()=>{const f=fixture({duplicate:true});await assert.rejects(createOwnerAccount(f.args),e=>e.status===409);assert.equal(f.writes.length,0);assert.deepEqual(f.deleted,[]);});
test("missing event creates no account and failed assignment removes the newly created account",async()=>{const missing=fixture({exists:false});await assert.rejects(createOwnerAccount(missing.args),e=>e.status===404);assert.equal(missing.created,0);const failed=fixture({failure:true});await assert.rejects(createOwnerAccount(failed.args),/Database unavailable/);assert.deepEqual(failed.deleted,["new-owner"]);});
