import test from "node:test";
import assert from "node:assert/strict";
import {invitationBackgrounds,introBackgroundSettings} from "../lib/wedding/backgrounds.js";
test("shared background is optional and never replaces a cover with an empty image",()=>{
 const data={intro:{imageUrl:"envelope.jpg",keepForHero:false},hero:{imageUrl:"cover.jpg"}};
 assert.deepEqual(invitationBackgrounds(data),{intro:"envelope.jpg",hero:"cover.jpg"});
 assert.equal(invitationBackgrounds({...data,intro:{...data.intro,keepForHero:true}}).hero,"envelope.jpg");
 assert.equal(invitationBackgrounds({...data,intro:{imageUrl:"",keepForHero:true}}).hero,"cover.jpg");
});

test("envelope gradient overrides the cover toggle and retains its color and blur",()=>{
 const hero={gradientEnabled:true,gradientColor:"#223344",blur:8};
 assert.deepEqual(introBackgroundSettings({hero,intro:{gradientEnabled:false}}),{...hero,gradientEnabled:false});
 assert.equal(introBackgroundSettings({hero:{gradientEnabled:false},intro:{gradientEnabled:true}}).gradientEnabled,true);
 assert.equal(introBackgroundSettings({hero:{gradientEnabled:false}}).gradientEnabled,false);
});
