import test from "node:test";
import assert from "node:assert/strict";
import {invitationBackgrounds} from "../lib/wedding/backgrounds.js";
test("shared background is optional and never replaces a cover with an empty image",()=>{
 const data={intro:{imageUrl:"envelope.jpg",keepForHero:false},hero:{imageUrl:"cover.jpg"}};
 assert.deepEqual(invitationBackgrounds(data),{intro:"envelope.jpg",hero:"cover.jpg"});
 assert.equal(invitationBackgrounds({...data,intro:{...data.intro,keepForHero:true}}).hero,"envelope.jpg");
 assert.equal(invitationBackgrounds({...data,intro:{imageUrl:"",keepForHero:true}}).hero,"cover.jpg");
});
