import test from "node:test";
import assert from "node:assert/strict";
import {normalizeSlug,normalizeSlugInput} from "../lib/wedding/slug.js";
test("typing a space keeps a separator for the next word",()=>{
 let draft="";for(const character of "testing event")draft=normalizeSlugInput(draft+character);
 assert.equal(draft,"testing-event");assert.equal(normalizeSlugInput("testing "),"testing-");
 assert.equal(normalizeSlugInput("Testing   "),"testing-");assert.equal(normalizeSlug("testing-"),"testing");
 assert.equal(normalizeSlugInput("Ángela Karol"),"angela-karol");
});
