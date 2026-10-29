import test from 'node:test';
import assert from 'node:assert/strict';
import {defaultEnvelopeLetter,envelopeLetterSchema,envelopeLetterChangeRequested,resolveEnvelopeLetter,envelopeLetterStyle} from '../lib/ai/envelope-letter.js';
import {coverOutputSchema} from '../lib/ai/cover-code.js';
const changed={...defaultEnvelopeLetter,background:'#123456',titleFont:'script',ornament:'heart',footerText:'Te esperamos'};
test('Only an explicit request about the envelope letter authorizes a design change',()=>{
 for(const prompt of ['Cambia el diseño de la hoja que sale del sobre a dorado','Quiero la carta interior del sobre con letra cursiva','Pon fondo azul en la hoja del sobre'])assert.equal(envelopeLetterChangeRequested(prompt),true,prompt);
 for(const prompt of ['Cambia toda la invitación a azul','Cambia el sobre a dorado','Modifica la portada','No cambies la hoja que sale del sobre','Conserva el diseño de la hoja del sobre','Cambia la mesa de regalos'])assert.equal(envelopeLetterChangeRequested(prompt),false,prompt);
 assert.equal(resolveEnvelopeLetter(changed,undefined,'Cambia toda la invitación a azul'),undefined);
 assert.deepEqual(resolveEnvelopeLetter(defaultEnvelopeLetter,changed,'Cambia la portada'),changed);
 assert.deepEqual(resolveEnvelopeLetter(changed,undefined,'Cambia el diseño de la hoja del sobre'),changed);
});
test('Letter styles are validated and cannot override the envelope position or animation',()=>{
 assert.equal(envelopeLetterSchema.safeParse({...changed,background:'url(https://example.com)'}).success,false);
 assert.equal(envelopeLetterSchema.safeParse({...changed,position:'fixed'}).success,false);
 assert.equal(envelopeLetterSchema.safeParse({...changed,titleScale:99}).success,false);
 assert.deepEqual(envelopeLetterStyle(undefined),{});
 assert.equal(envelopeLetterStyle(changed)['--letter-bg'],'#123456');
 for(const key of Object.keys(envelopeLetterStyle(changed)))assert.ok(key.startsWith('--letter-'));
});
test('Old designs remain compatible; optional letter settings survive design serialization',()=>{
 const cover={summary:'Prueba',html:'<main>Invitación</main>',css:'main{color:#222}',warnings:[]};
 assert.equal(coverOutputSchema.parse(cover).envelopeLetter,undefined);
 assert.deepEqual(coverOutputSchema.parse(JSON.parse(JSON.stringify({...cover,envelopeLetter:changed}))).envelopeLetter,changed);
});
