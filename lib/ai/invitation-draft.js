import { z } from 'zod';
const texts=['eventTitle','partner1','partner2','heroSubtitle','heroQuote','welcomeTitle','welcomeText','dressTitle','dressText','giftMessage','seoTitle','seoDescription','ceremonyName','ceremonyAddress','receptionName','receptionAddress'];
export const AI_COLORS=['primary','dark','surfaceDark','champagne','cream','ivory','rose','sage'].map(k=>'theme-'+k).concat(['paperColor','letterColor','envelopeColor','sealColor','sealTextColor','flowerColor','foliageColor','lightFlowerColor'],['subtitle','names','date','quote'].map(k=>'heroColor-'+k));
export const AI_FLAGS=['ceremonyEnabled','receptionEnabled','dressEnabled','rsvpEnabled','personalizedPassesEnabled','itineraryEnabled','giftsEnabled','galleryEnabled','askMessage','askMenuPreference','askAllergies'];
export const AI_FIELDS=[...texts,...AI_COLORS,...AI_FLAGS,'date','ceremonyTime','receptionTime','whatsapp','ceremonyMapsUrl','receptionMapsUrl'];
export const aiInputSchema=z.object({prompt:z.string().trim().min(5).max(12000),context:z.record(z.string(),z.string().max(3000)).default({})}).strict();
export const draftSchema=z.object({summary:z.string().max(1200),warnings:z.array(z.string().max(500)).max(20),changes:z.array(z.object({field:z.enum(AI_FIELDS),value:z.string().max(1500)}).strict()).max(90),itinerary:z.array(z.object({time:z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),title:z.string().max(120),description:z.string().max(500),icon:z.enum(['heart','camera','glass','music','sparkles'])}).strict()).max(30).nullable()}).strict().superRefine((data,ctx)=>{
 const fields=Object.fromEntries(data.changes.map(c=>[c.field,c.value]));
 if(fields.personalizedPassesEnabled==='true'&&fields.rsvpEnabled==='false')ctx.addIssue({code:'custom',message:'Los pases del creador requieren RSVP activo'});
 const seen=new Set();for(const[i,c]of data.changes.entries()){
 let valid=!seen.has(c.field);seen.add(c.field);
 if(AI_COLORS.includes(c.field))valid&&=/^#[\da-f]{6}$/i.test(c.value);
 if(AI_FLAGS.includes(c.field))valid&&=['true','false'].includes(c.value);
 if(c.field==='date'){const date=new Date(c.value+'T00:00:00Z');valid&&=/^\d{4}-\d{2}-\d{2}$/.test(c.value)&&!Number.isNaN(date.getTime())&&date.toISOString().slice(0,10)===c.value}
 if(c.field.endsWith('Time'))valid&&=/^([01]\d|2[0-3]):[0-5]\d$/.test(c.value);
 if(c.field.endsWith('MapsUrl')){try{valid&&=new URL(c.value).protocol==='https:'}catch{valid=false}}
 if(c.field==='whatsapp')valid&&=/^\+?[\d ()-]{7,30}$/.test(c.value);
 const limits={heroSubtitle:80,heroQuote:500,welcomeTitle:120,welcomeText:1500,eventTitle:120,partner1:120,partner2:120,dressTitle:120,dressText:500,seoTitle:120,seoDescription:250};if(limits[c.field])valid&&=c.value.length<=limits[c.field];
 if(!valid)ctx.addIssue({code:'custom',path:['changes',i],message:'Cambio inválido'});
 }
});
export const draftJsonSchema={type:'object',additionalProperties:false,required:['summary','warnings','changes','itinerary'],properties:{summary:{type:'string'},warnings:{type:'array',items:{type:'string'}},changes:{type:'array',items:{type:'object',additionalProperties:false,required:['field','value'],properties:{field:{type:'string',enum:AI_FIELDS},value:{type:'string'}}}},itinerary:{anyOf:[{type:'null'},{type:'array',items:{type:'object',additionalProperties:false,required:['time','title','description','icon'],properties:{time:{type:'string'},title:{type:'string'},description:{type:'string'},icon:{type:'string',enum:['heart','camera','glass','music','sparkles']}}}}]}}};
export function safeContext(context){return Object.fromEntries(Object.entries(context).filter(([k])=>AI_FIELDS.includes(k)))}
export function parseDraftResponse(response){if(response.status!=='completed')throw Error('incomplete');const text=(response.output||[]).filter(x=>x.type==='message').flatMap(x=>x.content||[]).filter(x=>x.type==='output_text').map(x=>x.text).join('');return draftSchema.parse(JSON.parse(text))}
