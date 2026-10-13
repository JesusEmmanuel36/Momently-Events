import test from "node:test";
import assert from "node:assert/strict";
import { getPublishedRsvpEvent } from "../lib/rsvp/published-event.js";

function fixture(events, slugs) {
  const read=[];
  const db={collection:name=>({doc:id=>({id,path:`${name}/${id}`,get:async()=>{read.push(`${name}/${id}`);const value=(name==="slugs"?slugs:events)[id];return {exists:!!value,data:()=>value};}})})};
  return {db,read};
}
test("both Catalina invitations resolve to the same existing panel even if the beach alias points elsewhere", async()=>{
  const {db,read}=fixture({original:{slug:"catalina-y-jorge",status:"published"},old:{slug:"catalina-y-jorge-playa",status:"published"}},{"catalina-y-jorge":{eventId:"original"},"catalina-y-jorge-playa":{eventId:"old"}});
  const original=await getPublishedRsvpEvent("catalina-y-jorge",{db});
  const beach=await getPublishedRsvpEvent("catalina-y-jorge-playa",{db});
  assert.equal(original.eventRef.path,beach.eventRef.path);
  assert.equal(beach.event.slug,"catalina-y-jorge");
  assert.ok(!read.includes("events/old"));
});
test("other invitations keep their own panel and invalid or unpublished events are rejected",async()=>{
  const {db}=fixture({other:{slug:"xv-abigail",status:"published"},hidden:{slug:"hidden",status:"unpublished"}},{"xv-abigail":{eventId:"other"},hidden:{eventId:"hidden"},wrong:{eventId:"other"}});
  assert.equal((await getPublishedRsvpEvent("xv-abigail",{db})).eventRef.id,"other");
  for(const slug of ["hidden","wrong","missing","../events"])await assert.rejects(getPublishedRsvpEvent(slug,{db}),error=>error.status===404);
});
