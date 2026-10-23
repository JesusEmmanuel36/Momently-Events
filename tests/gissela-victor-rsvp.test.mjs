import test from 'node:test';
import assert from 'node:assert/strict';
import {publicRsvpSchemaFor,panelRsvpSchemaFor,ageCountFields} from '../lib/rsvp/schema.js';
const slug='gissela-y-victor',base={name:'Familia de prueba',attending:'yes',companions:0,message:'Nos vemos pronto'};
for(const schemaFor of [publicRsvpSchemaFor,panelRsvpSchemaFor]){
 test(`${schemaFor.name}: Gissela guarda desglose y total sin duplicar titular`,()=>{const result=schemaFor(slug).parse({...base,adults:2,children:3,companions:20});assert.equal(result.companions,4);assert.deepEqual(ageCountFields(result,slug),{adults:2,children:3});assert.equal(result.message,base.message);});
 test(`${schemaFor.name}: Gissela valida edades y límite del formulario`,()=>{for(const fields of [{adults:0,children:2},{adults:1.5,children:0},{adults:1,children:-1},{adults:20,children:2},{adults:1}])assert.equal(schemaFor(slug).safeParse({...base,...fields}).success,false);assert.equal(schemaFor(slug).parse({...base,adults:1,children:20}).companions,20);});
 test(`${schemaFor.name}: Gissela conserva registros antiguos y limpia cantidades al no asistir`,()=>{const old=schemaFor(slug).parse({...base,companions:3});assert.deepEqual(ageCountFields(old,slug),{});assert.equal(old.companions,3);const no=schemaFor(slug).parse({...base,attending:'no',adults:2,children:3});assert.equal(no.companions,0);assert.deepEqual(ageCountFields(no,slug),{adults:0,children:0});});
}
