import test from 'node:test';import assert from 'node:assert/strict';
import {resolveRsvpTitle} from '../lib/ai/rsvp-title.js';
import {featurePreview} from '../lib/ai/feature-preview.js';
import {aiFeaturesSchema,normalizeAiFeatures} from '../lib/ai/feature-settings.js';
test('RSVP title changes only when requested and preserves a manually selected title otherwise',()=>{
 assert.equal(resolveRsvpTitle('¿Celebramos juntos?','Te esperamos','Cambia el título del RSVP a ¿Celebramos juntos?'),'¿Celebramos juntos?');
 assert.equal(resolveRsvpTitle('Nuevo título','Te esperamos','Cambia los colores a azul'),'Te esperamos');
 assert.equal(resolveRsvpTitle('Nuevo título',undefined,'Modifica las flores'),'¿Nos acompañas?');
 assert.equal(resolveRsvpTitle('Nuevo título','Te esperamos','No cambies el título del RSVP'),'Te esperamos');
 assert.equal(resolveRsvpTitle('Ven a celebrar','Anterior','En lugar de ¿Nos acompañas? pon Ven a celebrar'),'Ven a celebrar');
});
test('Custom title persists in feature settings, defaults for old invitations and is escaped in preview',()=>{
 const features=aiFeaturesSchema.parse({rsvp:true,passes:false,photos:false,rsvpTitle:'¿Celebramos juntos?'});
 assert.equal(normalizeAiFeatures(JSON.parse(JSON.stringify(features))).rsvpTitle,'¿Celebramos juntos?');
 assert.match(featurePreview(features),/<h2>¿Celebramos juntos\?<\/h2>/);
 assert.equal(normalizeAiFeatures().rsvpTitle,'¿Nos acompañas?');
 const html=featurePreview({...features,rsvpTitle:'<img src=x onerror=alert(1)>'});assert.ok(html.includes('&lt;img'));assert.ok(!html.includes('<img'));
 assert.equal(aiFeaturesSchema.safeParse({...features,rsvpTitle:'a'.repeat(161)}).success,false);
});
