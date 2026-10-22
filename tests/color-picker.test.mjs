import test from 'node:test';
import assert from 'node:assert/strict';
import {hexToHsv,hsvToHex} from '../lib/wedding/color-picker.js';
test('picker keeps HEX exact through color conversion, including grayscale',()=>{
 for(const color of ['#000000','#FFFFFF','#FF0000','#00FF00','#0000FF','#D8C3A5','#AABBCC','#808080'])assert.equal(hsvToHex(hexToHsv(color)),color);
 assert.equal(hsvToHex({h:120,s:1,v:1}),'#00FF00');
});
