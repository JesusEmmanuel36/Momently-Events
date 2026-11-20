// Sequential, checkpointed orchestration: never regenerate successful paid assets on retry.
export async function runV2Pipeline({draft,options,artwork,design,checkpoint,progress}){
 let current={...draft,artwork:{...draft.artwork}};
 const save=async patch=>{current={...current,...patch};await checkpoint(current)};
 const image=async(kind,referenceUrl='')=>{progress(kind);const result=await artwork(kind,current.imagePrompt,referenceUrl);if(!result?.url)throw Error('La imagen no se guardó correctamente.');await save(kind==='cover'?{imageUrl:result.url,coverImageSource:'generated'}:{artwork:{...current.artwork,[kind]:result.url}})};
 if(options.cover&&!current.imageUrl)await image('cover');
 if(options.envelopes){if(!current.artwork['envelope-closed'])await image('envelope-closed',current.imageUrl);if(!current.artwork['envelope-open'])await image('envelope-open',current.artwork['envelope-closed'])}
 if(options.floral&&!current.artwork.floral)await image('floral',current.artwork['envelope-closed']||current.imageUrl);
 if(!current.cover){progress('code');const cover=await design(current);await save({cover})}
 progress('done');return current;
}
export function pendingV2Images(draft,options){return Number(Boolean(options.cover&&!draft.imageUrl))+Number(Boolean(options.envelopes&&!draft.artwork?.['envelope-closed']))+Number(Boolean(options.envelopes&&!draft.artwork?.['envelope-open']))+Number(Boolean(options.floral&&!draft.artwork?.floral))}

export function v2SavePayload(draft){return {...(draft.savedEvent?.id?{eventId:draft.savedEvent.id}:{}),...draft.publication,name1:draft.name1,name2:draft.name2,occasion:draft.occasion,dateLabel:draft.dateLabel,cover:draft.cover,imageUrl:draft.imageUrl||'',coverImageSource:draft.coverImageSource||'unknown',musicUrl:draft.musicUrl||'',musicName:draft.musicName||'',videos:draft.videos||[],gallery:(draft.gallery||[]).map(({id,fileName,url,alt,source})=>({id,fileName,url,alt,...(source?{source}:{})})),artwork:Object.fromEntries(Object.entries(draft.artwork||{}).filter(([kind])=>['envelope-closed','envelope-open','floral'].includes(kind))),showFloral:draft.showFloral!==false,envelopeLayout:{openWidth:draft.envelopeLayout?.openWidth||101,openBottom:draft.envelopeLayout?.openBottom??4},prompt:draft.prompt||'',imagePrompt:draft.imagePrompt||''}}
// Check once before saving, then handle a concurrent claim in the server transaction.
export async function saveV2Draft(payload,{save,available,maxAttempts=3}){
 let next={...payload};
 for(let attempt=0;attempt<maxAttempts;attempt++){
  const result=await save(next);
  if(result.ok)return result.data;
  if(result.status!==409||next.eventId)throw Error(result.data?.error||'No se pudo guardar el borrador.');
  next={...next,slug:await available(next.slug)};
 }
 throw Error('El enlace acaba de ocuparse. Busca otro y guarda nuevamente; tu diseño está conservado.');
}
