import test from "node:test";
import assert from "node:assert/strict";
import {sectionAppearanceStyle} from "../lib/wedding/section-appearance.js";
test("section overrides are opt-in and do not mutate the general theme",()=>{
 assert.deepEqual(sectionAppearanceStyle({colorsEnabled:false,text:"#FFFFFF"}),{});
 const style=sectionAppearanceStyle({colorsEnabled:true,text:"#FFFFFF",background:"#102030",icons:"#D8C3A5"});
 assert.equal(style["--section-background"],"#102030");assert.equal(style["--section-icons"],"#D8C3A5");assert.equal(style["--text"],"#FFFFFF");assert.equal(style["--coffee"],undefined);
});
