import test from "node:test";
import assert from "node:assert/strict";
import {coverShade} from "../lib/wedding/creator-theme.js";
test("photo overlay stays dark even when the chosen principal color is white",()=>{
 const shade=coverShade({primary:"#ffffff"});assert.ok([1,3,5].every(i=>parseInt(shade.slice(i,i+2),16)<100));
});
