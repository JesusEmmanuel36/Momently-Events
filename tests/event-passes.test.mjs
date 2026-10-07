import test from "node:test";
import assert from "node:assert/strict";
import { createPass, updatePass, deletePass, readPass, confirmPass, passTokenPattern, assertPassOrigin } from "../lib/event-passes/server.js";

function fixture(slug = "alejandra-y-david") {
  const store = new Map(); let counter = 0; let queue = Promise.resolve();
  const snap = ref => ({ id: ref.id, ref, exists: store.has(ref.path), data: () => store.get(ref.path) });
  const doc = path => ({ id: path.split("/").at(-1), path, firestore: db,
    collection: name => collection(path + "/" + name),
    get: async () => snap(doc(path)), create: async value => { assert.ok(!store.has(path)); store.set(path, value); },
    delete: async () => { store.delete(path); },
  });
  const collection = path => ({ doc: id => doc(path + "/" + (id || `guest-${++counter}`)),
    where: (key, op, value) => { assert.equal(op, "=="); return { limit: count => ({ get: async () => {
      const docs = [...store.keys()].filter(item => item.startsWith(path + "/") && store.get(item)[key] === value).slice(0,count).map(item => snap(doc(item)));
      return { docs, empty: !docs.length };
    } }) }; },
  });
  const db = { runTransaction: callback => {
    const run = queue.then(async () => {
      const writes = []; const result = await callback({ get: async ref => snap(ref),
        update: (ref, value) => writes.push([ref, value, true]), set: (ref, value, opts) => writes.push([ref, value, opts?.merge]),
      });
      writes.forEach(([ref, value, merge]) => store.set(ref.path, merge ? { ...store.get(ref.path), ...value } : value));return result;
    }); queue = run.catch(() => {}); return run;
  }};
  const event = { slug, status: "published", settings: { rsvp: { enabled: true, maxCompanions: 0, deadline: null } } };
  const ref = doc("events/test-event");store.set(ref.path,event);
  return { context: { event, ref }, store };
}
const details = { displayName: "Familia López", allowedSeats: 4, phone: "private-phone", notes: "private-notes" };

test("owner passes produce secure links; public pass omits private guest data", async () => {
  const { context } = fixture(); const created = await createPass(context, details);
  assert.match(created.passToken, passTokenPattern);assert.match(created.path,/\/eventos\/alejandra-y-david\/pase\//);
  const read = await readPass(created.passToken, { context });
  assert.deepEqual(read,{displayName:"Familia López",allowedSeats:4,response:null});
  for(const allowedSeats of [0,21,2.5]) await assert.rejects(createPass(context,{...details,allowedSeats}),e=>e.status===400);
  await assert.rejects(readPass("guess",{context}),e=>e.status===404);
  await assert.rejects(readPass("a".repeat(43),{context}),e=>e.status===404);
});

test("server enforces total seats and canonical name, ignoring forged extra fields", async () => {
  const { context,store }=fixture();const pass=await createPass(context,details);
  for(const totalPeople of [0,5,-1,2.5,"4"]) await assert.rejects(confirmPass(pass.passToken,{attending:"yes",totalPeople},{context}),e=>e.status===400);
  const saved=await confirmPass(pass.passToken,{attending:"yes",totalPeople:4,name:"Forged name",allowedSeats:999,companions:99},{context});
  const response=store.get(`events/test-event/rsvps/${saved.rsvpId}`);
  assert.equal(response.name,details.displayName);assert.equal(response.totalPeople,4);assert.equal(response.companions,3);assert.equal(response.allowedSeats,4);
  await assert.rejects(confirmPass(pass.passToken,{attending:"no",totalPeople:1},{context}),e=>e.status===400);
});

test("replies across devices and retries update one RSVP and preserve creation time", async () => {
  const { context,store }=fixture();const pass=await createPass(context,details);
  const first=await confirmPass(pass.passToken,{attending:"yes",totalPeople:4},{context});
  const created=store.get(`events/test-event/rsvps/${first.rsvpId}`).createdAt;
  const results=await Promise.all([2,3,1].map(totalPeople=>confirmPass(pass.passToken,{attending:"yes",totalPeople},{context})));
  assert.ok(results.every(result=>result.rsvpId===first.rsvpId));assert.equal([...store.keys()].filter(k=>k.includes('/rsvps/')).length,1);
  assert.equal(store.get(`events/test-event/rsvps/${first.rsvpId}`).createdAt,created);
  await confirmPass(pass.passToken,{attending:"no",totalPeople:0,message:"No podremos"},{context});
  assert.deepEqual((await readPass(pass.passToken,{context})).response,{attending:"no",totalPeople:0,message:"No podremos"});
});

test("editing keeps link stable and rejects reducing below confirmed seats; deleting revokes link", async () => {
  const { context,store }=fixture();const pass=await createPass(context,details);
  const answer=await confirmPass(pass.passToken,{attending:"yes",totalPeople:3},{context});
  await assert.rejects(updatePass(context,pass.id,{...details,allowedSeats:2}),e=>e.status===400);
  const edited=await updatePass(context,pass.id,{...details,displayName:"Familia nueva",allowedSeats:5});assert.equal(edited.passToken,pass.passToken);
  assert.equal((await readPass(pass.passToken,{context})).displayName,"Familia nueva");assert.equal(store.get(`events/test-event/rsvps/${answer.rsvpId}`).name,"Familia nueva");
  await deletePass(context,pass.id);await assert.rejects(readPass(pass.passToken,{context}),e=>e.status===404);
  await assert.rejects(confirmPass(pass.passToken,{attending:"yes",totalPeople:1},{context}),e=>e.status===404);
  assert.ok(store.has(`events/test-event/rsvps/${answer.rsvpId}`));
});

test("other events, disabled RSVP, closed deadlines and unpublished events cannot use pass confirmation", async () => {
  const other=fixture("caleb-y-ciriam");await assert.rejects(createPass(other.context,details),e=>e.status===404);
  const {context,store}=fixture();const pass=await createPass(context,details);
  const answer={attending:"yes",totalPeople:1};
  for(const event of [
    {...context.event,status:"draft"},
    {...context.event,settings:{rsvp:{enabled:false}}},
    {...context.event,settings:{rsvp:{enabled:true,deadline:"2020-01-01"}}},
  ]) { store.set(context.ref.path,event);await assert.rejects(confirmPass(pass.passToken,answer,{context}),e=>[403,404].includes(e.status)); }
  assert.equal([...store.keys()].filter(k=>k.includes('/rsvps/')).length,0);
});

test("public writes reject missing or foreign origins", () => {
  const input=origin=>new Request("https://example.com/api/pass",{headers:origin?{origin}:{}});
  assert.doesNotThrow(()=>assertPassOrigin(input("https://example.com")));
  for(const origin of [null,"https://evil.example"])assert.throws(()=>assertPassOrigin(input(origin)),e=>e.status===403);
});
