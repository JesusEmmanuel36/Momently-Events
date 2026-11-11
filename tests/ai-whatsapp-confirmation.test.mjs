import test from 'node:test';import assert from 'node:assert/strict';
import {preserveWhatsappConfirmation as preserve} from '../lib/ai/whatsapp-confirmation.js';
const a='<a href="https://wa.me/528338492533?text=Hola">Confirmar con Nancy</a>';
const previous={html:`<main><section>${a}</section></main>`};
test('unrelated edits preserve the real WhatsApp link and prefilled message',()=>{
 const proposal={html:'<main><h1>Nueva portada</h1></main>',css:'new styles'};
 const result=preserve(proposal,previous,'Cambia la foto de portada');
 assert.ok(result.html.includes(a));assert.ok(result.html.includes('Nueva portada'));assert.equal(result.css,proposal.css);assert.ok(result.html.indexOf(a)<result.html.indexOf('</main>'));
 assert.equal(preserve(result,previous,'Cambia los colores').html,result.html);
});
test('explicit removal or replacement is respected and preservation requests are honored',()=>{
 const proposal={html:'<main>Sin confirmación</main>'};
 for(const prompt of ['Quita la confirmación por WhatsApp','Cambia el número de teléfono','Solo confirmar por RSVP'])assert.equal(preserve(proposal,previous,prompt),proposal);
 assert.ok(preserve(proposal,previous,'No quites la confirmación por WhatsApp').html.includes(a));
 assert.equal(preserve(proposal,null,'Cambia colores'),proposal);
});
test('multiple contacts are preserved without duplicating existing links',()=>{
 const b='<a href="https://wa.me/521234567890">Novio</a>';
 const result=preserve({html:`<main>${a}</main>`},{html:a+b},'Cambia el itinerario');
 assert.equal(result.html.split(a).length-1,1);assert.ok(result.html.includes(b));
});
