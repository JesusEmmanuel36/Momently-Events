import test from 'node:test';
import assert from 'node:assert/strict';
import {publicRsvpSchemaFor,panelRsvpSchemaFor,ageCountFields} from '../lib/rsvp/schema.js';
import {normalizeAiFeatures,aiFeaturesSchema,allowedAiRsvpFields} from '../lib/ai/feature-settings.js';
import {featurePreview} from '../lib/ai/feature-preview.js';
const event={slug:'test-ai',templateKey:'ai-designed',settings:{rsvp:{askAgeCounts:true,askCompanions:false,maxCompanions:4}}};
const base={name:'Familia prueba',attending:'yes',companions:0};
test('AI age counts validate the combined limit and count the titular once',()=>{
 for(const schemaFor of [publicRsvpSchemaFor,panelRsvpSchemaFor]){
 const parsed=schemaFor(event.slug,event).parse({...base,adults:2,children:3,companions:20});
 assert.equal(parsed.companions,4);assert.deepEqual(ageCountFields(parsed,event),{adults:2,children:3});
 assert.equal(allowedAiRsvpFields(parsed,event).companions,4);
 for(const ages of [{adults:2,children:4},{adults:0,children:2},{adults:1.5,children:0},{adults:1,children:-1},{adults:1}])assert.equal(schemaFor(event.slug,event).safeParse({...base,...ages}).success,false);
 }
 assert.equal(publicRsvpSchemaFor(event.slug,event).safeParse(base).success,false);
});
test('AI declining attendance clears both counts and legacy panel records remain editable',()=>{
 const parsed=publicRsvpSchemaFor(event.slug,event).parse({...base,attending:'no',adults:2,children:1});
 assert.deepEqual(ageCountFields(parsed,event),{adults:0,children:0});assert.equal(parsed.companions,0);
 assert.equal(panelRsvpSchemaFor(event.slug,event).parse({...base,companions:2}).companions,2);
});
test('Old AI invitations default to single count; forged age fields are ignored when off',()=>{
 assert.equal(normalizeAiFeatures().askAgeCounts,false);
 assert.equal(aiFeaturesSchema.parse({rsvp:true,passes:false,photos:false}).askAgeCounts,false);
 const old={...event,settings:{rsvp:{askAgeCounts:false}}};const parsed=publicRsvpSchemaFor(event.slug,old).parse({...base,adults:10,children:10});assert.deepEqual(ageCountFields(parsed,old),{});assert.equal(parsed.adults,undefined);
});
test('Preview replaces the companions field with adults and children only in general RSVP',()=>{
 const html=featurePreview({rsvp:true,passes:false,photos:false,askAgeCounts:true,maxCompanions:4});
 assert.match(html,/name="adults"/);assert.match(html,/name="children"/);assert.doesNotMatch(html,/name="guests"/);
 assert.doesNotMatch(featurePreview({rsvp:true,passes:true,photos:false,askAgeCounts:true}),/name="adults"/);
});
