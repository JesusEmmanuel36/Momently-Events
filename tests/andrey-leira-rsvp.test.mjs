import test from 'node:test';
import assert from 'node:assert/strict';
import { publicRsvpSchemaFor, panelRsvpSchemaFor, ageCountFields } from '../lib/rsvp/schema.js';
const base = { name:'Invitado de prueba', attending:'yes', companions:0 };
for (const factory of [publicRsvpSchemaFor,panelRsvpSchemaFor]) {
 test(`${factory.name}: adultos incluyen a quien confirma y niños suman al total`,()=>{const data=factory('andrey-y-leira').parse({...base,adults:2,children:3});assert.equal(data.companions,4);assert.deepEqual(ageCountFields(data,'andrey-y-leira'),{adults:2,children:3});});
 test(`${factory.name}: límites y datos incompletos`,()=>{for(const fields of [{adults:0,children:1},{adults:4,children:3},{adults:1,children:-1},{adults:1.5,children:0},{adults:1}])assert.equal(factory('andrey-y-leira').safeParse({...base,...fields}).success,false);assert.equal(factory('andrey-y-leira').parse({...base,adults:1,children:5}).companions,5);});
 test(`${factory.name}: no asistencia y compatibilidad con respuestas anteriores`,()=>{const no=factory('andrey-y-leira').parse({...base,attending:'no',adults:2,children:3});assert.deepEqual(ageCountFields(no,'andrey-y-leira'),{adults:0,children:0});assert.equal(no.companions,0);const old=factory('andrey-y-leira').parse({...base,companions:3});assert.equal(old.companions,3);assert.deepEqual(ageCountFields(old,'andrey-y-leira'),{});});
 test(`${factory.name}: las demás invitaciones mantienen su validación`,()=>{const other=factory('lorena-y-francisco').parse({...base,companions:2,adults:4,children:2});assert.equal(other.companions,2);assert.equal(other.adults,undefined);assert.deepEqual(ageCountFields(other,'lorena-y-francisco'),{});assert.equal(factory('esmeralda-y-antonio').safeParse({...base,companions:4}).success,false);assert.equal(factory('yuli-y-alexis').safeParse({...base,companions:30}).success,true);});
}
