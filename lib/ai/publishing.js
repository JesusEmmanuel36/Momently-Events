import {aiFeaturesSchema,normalizeAiFeatures} from './feature-settings.js';
import {z} from 'zod';
import {coverOutputSchema} from './cover-code.js';
import {normalizeSlug,slugPattern} from '../wedding/slug.js';
const image=z.string().max(2000).refine(v=>!v||/^https:\/\/res\.cloudinary\.com\/[\w-]+\/image\/upload\//.test(v),'Imagen inválida');
const audio=z.string().max(2000).refine(v=>!v||/^https:\/\/res\.cloudinary\.com\/[\w-]+\/video\/upload\//.test(v),'Audio inválido');
const date=z.string().refine(v=>!v||(/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v),'Fecha inválida');
export const aiPublishSchema=z.object({
 eventId:z.string().regex(/^[a-zA-Z0-9_-]{1,128}$/).optional(),
 slug:z.string().transform(normalizeSlug).pipe(z.string().min(3).max(80).regex(slugPattern)),
 name1:z.string().trim().max(120),name2:z.string().trim().max(120),occasion:z.string().max(100),dateLabel:z.string().max(160),eventDate:date,
 cover:coverOutputSchema,imageUrl:image.default(''),musicUrl:audio.default(''),musicName:z.string().max(300).default(''),
 gallery:z.array(z.object({url:image,alt:z.string().max(300).default('')})).max(40).default([]),
 artwork:z.object({'envelope-closed':image.optional(),'envelope-open':image.optional(),floral:image.optional()}).default({}),
 showFloral:z.boolean().default(true),envelopeLayout:z.object({openWidth:z.number().min(50).max(200),openBottom:z.number().min(-50).max(50)}),
 features:aiFeaturesSchema.transform(normalizeAiFeatures),
 prompt:z.string().max(16000).default(''),imagePrompt:z.string().max(8000).default('')
}).strict().superRefine((v,ctx)=>{
 if(!v.name1&&!v.name2)ctx.addIssue({code:'custom',message:'Agrega el nombre del evento o festejado.'});
 if(v.features.photos&&v.features.photoOpening!=='now'&&!v.eventDate)ctx.addIssue({code:'custom',message:'Indica la fecha del evento para programar la apertura de fotos.'});
 if(Boolean(v.artwork['envelope-closed'])!==Boolean(v.artwork['envelope-open']))ctx.addIssue({code:'custom',message:'Completa los dos sobres o retíralos antes de guardar.'});
});
export function buildAiEvent(data,actorUid){
 const {prompt,imagePrompt,eventId: _eventId,...design}=data;
 return {schemaVersion:2,templateKey:'ai-designed',slug:data.slug,status:'draft',ownerUids:[],createdByUid:actorUid,
 publicPath:`/eventos/${data.slug}`,
 publicData:{eventTitle:[data.name1,data.name2].filter(Boolean).join(' y '),couple:{partner1:data.name1,partner2:data.name2},weddingDate:{iso:data.eventDate?data.eventDate+'T12:00:00-06:00':'',timezone:'America/Monterrey'},aiDesign:design,seo:{title:[data.name1,data.name2].filter(Boolean).join(' y '),description:data.occasion||'Acompáñanos a celebrar',ogImageUrl:data.imageUrl}},
 settings:{personalizedPasses:{enabled:data.features.passes},guestPhotos:{enabled:data.features.photos,lockedUntilEvent:data.features.photosLocked,photoOpening:data.features.photoOpening},rsvp:{enabled:data.features.rsvp||data.features.passes,deadline:null,maxCompanions:data.features.askCompanions?data.features.maxCompanions:0,askCompanions:data.features.askCompanions,askMenuPreference:data.features.askMenuPreference,askAllergies:data.features.askAllergies,askMessage:data.features.askMessage,askSongSuggestion:data.features.askSongSuggestion}},
 aiEditor:{prompt,imagePrompt}};
}
