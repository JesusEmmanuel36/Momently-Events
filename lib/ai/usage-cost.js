// Standard API rates in USD per million tokens, checked 2026-10-25.
// https://developers.openai.com/api/docs/pricing
const imageRates = {
  'gpt-image-2.5-sunburst': {text:5,image:8,output:30},
  'gpt-image-2.5-flare': {text:5,image:8,output:30},
  'gpt-image-2': {text:5,image:8,output:30},
};
const textRates = {'gpt-6.1-sol':{input:2,cached:0.1,output:10}};
const tokens = value => Number.isFinite(value) && value >= 0 ? value : null;
function estimate(usd, exchangeRate) {
  const rate = Number(exchangeRate);
  const mxnPerUsd = Number.isFinite(rate) && rate > 0 ? rate : 19;
  return {usd,mxn:usd*mxnPerUsd,mxnPerUsd,estimated:true,pricingDate:'2026-10-25'};
}
export function imageUsageCost(model, usage, exchangeRate) {
  const rate = imageRates[model];
  const details = usage?.input_tokens_details;
  const text = tokens(details?.text_tokens), image = tokens(details?.image_tokens), output = tokens(usage?.output_tokens);
  if (!rate || text === null || image === null || output === null) return null;
  return estimate((text*rate.text+image*rate.image+output*rate.output)/1e6,exchangeRate);
}
export function textUsageCost(model, usage, exchangeRate) {
  const rate=textRates[model], input=tokens(usage?.input_tokens), output=tokens(usage?.output_tokens);
  const cached=tokens(usage?.input_tokens_details?.cached_tokens) ?? 0;
  if (!rate || input===null || output===null || cached>input) return null;
  return estimate(((input-cached)*rate.input+cached*rate.cached+output*rate.output)/1e6,exchangeRate);
}
