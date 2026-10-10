import test from "node:test";
import assert from "node:assert/strict";
import { eventInputSchema, buildEventDocument } from "../lib/wedding/schemas.js";
import { assertAvailableTemplatePath } from "../lib/wedding/admin-links.js";

const location = { enabled:false,name:"",time:"",address:"",mapsUrl:"",wazeUrl:"",imageUrl:"" };
const base = {
  slug:"cumpleanos-de-prueba",templateKey:"flexible-celebration",partner1:"Rosalba",partner2:"",date:"",heroQuote:"",welcomeText:"",
  ceremony:location,reception:location,dressCode:{enabled:false,title:"",text:"",colors:[]},
  bank:{enabled:false,bank:"",holder:"",clabe:"",account:""},
  sections:{story:false,gallery:false,itinerary:false,gifts:false,hotels:false,important:false,calendar:false,songRequest:false,faqs:false},
  music:{enabled:false,url:"",label:""},video:{enabled:false,url:"",posterUrl:""},
  theme:{primary:"#594238",dark:"#3a2a24",champagne:"#d8c3a5",cream:"#f5eee6",ivory:"#fbf8f3",rose:"#d7b6ac",sage:"#a9b09a"},
};
test("single-person invitation saves without date, photograph, venue, gifts, music or second name",()=>{
  const parsed=eventInputSchema.parse(base),doc=buildEventDocument(parsed,"admin");
  assert.equal(doc.publicData.couple.partner2,"");assert.equal(doc.publicData.weddingDate.iso,"");assert.equal(doc.publicData.ceremony.enabled,false);
  assert.equal(doc.templateKey,"flexible-celebration");assert.equal(doc.status,"draft");assert.deepEqual(doc.ownerUids,[]);
});
test("family, paragraphs and independent CSS colors survive a save including disabled items",()=>{
  const parsed=eventInputSchema.parse({...base,paragraphs:[{enabled:false,title:"Frase",text:"Texto"}],family:[{enabled:true,title:"Mi mamá",names:"Nombre †"}],decorations:{envelope:true,flowers:false,envelopeColor:"#112233",flowerColor:"#445566",foliageColor:"#778899",sealColor:"#aabbcc"},sections:{...base.sections,family:true,paragraphs:false},askMenuPreference:false,askAllergies:false,askMessage:false});
  const doc=buildEventDocument(parsed,"admin");assert.deepEqual(doc.publicData.family,parsed.family);assert.equal(doc.publicData.paragraphs[0].enabled,false);assert.equal(doc.publicData.sections.paragraphs,false);assert.equal(doc.publicData.decorations.envelopeColor,"#112233");assert.equal(doc.settings.rsvp.askAllergies,false);
});
test("cash gifts and hotels do not require links; blank or invalid links differ",()=>{
  assert.equal(eventInputSchema.safeParse({...base,gifts:[{name:"Lluvia de sobres",description:"Gracias por tu cariño",url:""}],hotels:[{name:"Hotel",detail:"",address:"",url:"",mapsUrl:""}]}).success,true);
  assert.equal(eventInputSchema.safeParse({...base,gifts:[{name:"Regalo",url:"javascript:alert(1)"}]}).success,false);
  assert.equal(eventInputSchema.safeParse({...base,gifts:[{name:"Regalo",url:"invalid"}]}).success,false);
});
test("classic documents retain defaults; dates and hex colors are validated",()=>{
  const parsed=eventInputSchema.parse({...base,templateKey:"brown-romance",partner2:"Persona 2",date:"2027-02-27T23:30:00.000Z"});
  assert.equal(parsed.askMenuPreference,true);assert.equal(parsed.sections.names,true);
  assert.equal(eventInputSchema.safeParse({...base,date:"not-a-date"}).success,false);
  assert.equal(eventInputSchema.safeParse({...base,decorations:{envelopeColor:"red"}}).success,false);
  assert.equal(eventInputSchema.safeParse({...base,rsvpDeadline:"not-a-date"}).success,false);
});
test("creator cannot shadow existing file-based invitations",()=>{
  assert.throws(()=>assertAvailableTemplatePath("alejandra-y-david"),e=>e.status===409);
  assert.doesNotThrow(()=>assertAvailableTemplatePath("new-invitation-unique-test"));
});
