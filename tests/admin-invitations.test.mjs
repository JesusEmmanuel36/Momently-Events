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
  const parsed=eventInputSchema.parse({...base,paragraphs:[{enabled:false,title:"Frase",text:"Texto"}],family:[{enabled:true,title:"Mi mamá",names:"Nombre †"}],decorations:{envelope:true,flowers:false,envelopeColor:"#112233",flowerColor:"#445566",foliageColor:"#778899",sealColor:"#aabbcc",paperColor:"#eeeecc",lightFlowerColor:"#ffeecc",monogram:"A&E"},sections:{...base.sections,family:true,paragraphs:false},askMenuPreference:false,askAllergies:false,askMessage:false});
  const doc=buildEventDocument(parsed,"admin");assert.deepEqual(doc.publicData.family,parsed.family);assert.equal(doc.publicData.paragraphs[0].enabled,false);assert.equal(doc.publicData.sections.paragraphs,false);assert.equal(doc.publicData.decorations.envelopeColor,"#112233");assert.equal(doc.settings.rsvp.askAllergies,false);assert.equal(doc.publicData.decorations.paperColor,"#eeeecc");assert.equal(doc.publicData.decorations.lightFlowerColor,"#ffeecc");assert.equal(doc.publicData.decorations.monogram,"A&E");
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


test("cover gradient, blur and animation settings survive saving; invalid values are rejected",()=>{
  const parsed=eventInputSchema.parse({...base,heroImageUrl:"https://example.com/background.jpg",heroGradientOpacity:.7,heroBlur:12,heroAnimated:false});
  const hero=buildEventDocument(parsed,"admin").publicData.hero;
  assert.equal(hero.imageUrl,"https://example.com/background.jpg");assert.equal(hero.gradientOpacity,.7);assert.equal(hero.blur,12);assert.equal(hero.animated,false);
  assert.equal(eventInputSchema.safeParse({...base,heroBlur:30}).success,false);
  assert.equal(eventInputSchema.safeParse({...base,heroGradientOpacity:2}).success,false);
  assert.equal(eventInputSchema.parse(base).heroAnimated,true);
});

test("creator retains independent cover colors, gallery order, gift copy and disabled WhatsApp",()=>{
 const colors={subtitle:"#112233",names:"#223344",date:"#334455",quote:"#445566"};
 const parsed=eventInputSchema.parse({...base,heroGradientEnabled:false,heroColors:colors,galleryLayout:"collage",gallery:[{id:"second",url:"https://example.com/second.jpg",alt:"Second",order:0},{id:"first",url:"https://example.com/first.jpg",alt:"First",order:1}],giftMessage:"Sobre o regalo, con cariño.",sections:{...base.sections,contact:false}});
 const data=buildEventDocument(parsed,"admin").publicData;
 assert.equal(data.hero.gradientEnabled,false);assert.deepEqual(data.hero.colors,colors);assert.equal(data.galleryLayout,"collage");assert.equal(data.gallery[0].alt,"Second");assert.equal(data.giftMessage,"Sobre o regalo, con cariño.");assert.equal(data.sections.contact,false);
 assert.equal(eventInputSchema.safeParse({...base,heroColors:{names:"red"}}).success,false);assert.equal(eventInputSchema.safeParse({...base,galleryLayout:"unknown"}).success,false);
});

test("cover flowers and gradient color save independently of the overall theme",()=>{
 const data=buildEventDocument(eventInputSchema.parse({...base,heroFlowers:false,heroGradientColor:"#582966"}),"admin").publicData;
 assert.equal(data.hero.flowers,false);assert.equal(data.hero.gradientColor,"#582966");assert.deepEqual(data.theme,base.theme);
 assert.equal(eventInputSchema.parse(base).heroFlowers,true);
 assert.equal(eventInputSchema.safeParse({...base,heroGradientColor:"purple"}).success,false);
});

test("cover crop survives saving and rejects out-of-range zoom or position",()=>{
 const hero=buildEventDocument(eventInputSchema.parse({...base,heroZoom:1.75,heroPositionX:20,heroPositionY:80}),"admin").publicData.hero;
 assert.equal(hero.zoom,1.75);assert.equal(hero.positionX,20);assert.equal(hero.positionY,80);
 for(const settings of [{heroZoom:.5},{heroZoom:3},{heroPositionX:-1},{heroPositionY:101}]) assert.equal(eventInputSchema.safeParse({...base,...settings}).success,false);
});
