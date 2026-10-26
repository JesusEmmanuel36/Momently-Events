import test from 'node:test';
import assert from 'node:assert/strict';
import {imageUsageCost,textUsageCost} from '../lib/ai/usage-cost.js';
test('image cost includes prompt, reference image and generated image at their own rates',()=>{
 const cost=imageUsageCost('gpt-image-2.5-sunburst',{input_tokens_details:{text_tokens:1000,image_tokens:2000},output_tokens:3000},19);
 assert.ok(Math.abs(cost.usd-.111)<1e-10);
 assert.ok(Math.abs(cost.mxn-2.109)<1e-10);
});
test('text cost discounts cached input without omitting output',()=>{
 const cost=textUsageCost('gpt-6.1-sol',{input_tokens:10000,input_tokens_details:{cached_tokens:2000},output_tokens:5000});
 assert.equal(cost.usd,.0662);assert.equal(cost.mxnPerUsd,19);
});
test('missing usage, unknown models and invalid counts are unavailable, never zero guesses',()=>{
 assert.equal(imageUsageCost('gpt-image-2.5-sunburst',null),null);
 assert.equal(imageUsageCost('future-model',{input_tokens_details:{text_tokens:0,image_tokens:0},output_tokens:0}),null);
 assert.equal(textUsageCost('gpt-6.1-sol',{input_tokens:-1,output_tokens:1}),null);
 assert.equal(textUsageCost('unknown',{input_tokens:10,output_tokens:5}),null);
});
test('configurable reference exchange rate and separate completed images',()=>{
 const usage={input_tokens_details:{text_tokens:500,image_tokens:1000},output_tokens:1500};
 const closed=imageUsageCost('gpt-image-2.5-sunburst',usage,'20');
 const opened=imageUsageCost('gpt-image-2.5-sunburst',usage,'20');
 assert.ok(Math.abs((closed.usd+opened.usd)-.111)<1e-10);
 assert.equal(closed.mxnPerUsd,20);
});
