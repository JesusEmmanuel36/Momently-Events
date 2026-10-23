import test from "node:test";
import assert from "node:assert/strict";
import {sectionAppearanceStyle,sectionColorFields} from "../lib/wedding/section-appearance.js";
test("section overrides are opt-in and do not mutate the general theme",()=>{
 assert.deepEqual(sectionAppearanceStyle({colorsEnabled:false,text:"#FFFFFF"}),{});
 const style=sectionAppearanceStyle({colorsEnabled:true,text:"#FFFFFF",background:"#102030",icons:"#D8C3A5"});
 assert.equal(style["--section-background"],"#102030");assert.equal(style["--section-icons"],"#D8C3A5");assert.equal(style["--text"],"#FFFFFF");assert.equal(style["--coffee"],undefined);
});

test("text overrides never change surface variables; controls reflect the section",()=>{
 const style=sectionAppearanceStyle({colorsEnabled:true,text:"#112233",labels:"#AABBCC",numbers:"#445566",paper:"#ABCDEF"});
 assert.equal(style["--coffee-dark"],undefined);assert.equal(style["--surface-dark"],undefined);
 assert.equal(style["--section-labels"],"#AABBCC");assert.equal(style["--section-numbers"],"#445566");
 assert.ok(sectionColorFields("intro").some(([key])=>key==="paper"));
 assert.ok(sectionColorFields("rsvp").some(([key])=>key==="asideBackground"));
 assert.ok(!sectionColorFields("countdown").some(([key])=>key==="button"));
});
