import {z} from 'zod';
import {aiFeaturesSchema} from '../feature-settings.js';
import {artworkReference} from '../artwork-prompts.js';
// A PATCH must not materialize schema defaults and overwrite unrelated settings.
const featurePatch=z.object(Object.fromEntries(Object.entries(aiFeaturesSchema.shape).map(([key,schema])=>[key,(typeof schema.removeDefault==='function'?schema.removeDefault():schema).optional()]))).strict();
// API patches can modify only the same validated fields as the editor.
export const workerInputSchema=z.object({
 prompt:z.string().trim().min(5).max(14000),
 eventId:z.string().regex(/^[a-zA-Z0-9_-]{1,128}$/).optional(),
 publish:z.boolean().default(false),
 referenceEventId:z.string().regex(/^[a-zA-Z0-9_-]{1,128}$/).optional(),
 referenceImageUrls:z.array(artworkReference.refine(Boolean)).max(3).default([]),
 changes:z.object({
  name1:z.string().max(120).optional(),name2:z.string().max(120).optional(),occasion:z.string().max(100).optional(),dateLabel:z.string().max(160).optional(),eventDate:z.string().refine(v=>!v||/^\d{4}-\d{2}-\d{2}$/.test(v)&&Number.isFinite(Date.parse(v+'T12:00:00Z'))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v).optional(),slug:z.string().max(80).optional(),
  imageUrl:artworkReference.optional(),coverImageSource:z.enum(['unknown','uploaded','generated']).optional(),
  imagePrompt:z.string().min(5).max(8000).optional(),
  musicUrl:z.string().max(2000).refine(v=>!v||/^https:\/\/res\.cloudinary\.com\/[\w-]+\/video\/upload\//.test(v)).optional(),musicName:z.string().max(300).optional(),
  gallery:z.array(z.object({id:z.string().regex(/^[\w-]{1,100}$/).optional(),url:artworkReference.refine(Boolean),fileName:z.string().max(255),alt:z.string().max(300).default(''),source:z.enum(['uploaded','generated']).optional()}).strict()).max(40).optional(),
  videos:z.array(z.object({id:z.string().regex(/^[\w-]{1,100}$/),url:z.string().max(2000).regex(/^https:\/\/res\.cloudinary\.com\/[\w-]+\/video\/upload\//),fileName:z.string().max(255),title:z.string().max(160).default('')}).strict()).max(10).optional(),
  artwork:z.object({'envelope-closed':artworkReference.optional(),'envelope-open':artworkReference.optional(),floral:artworkReference.optional()}).strict().optional(),
  showFloral:z.boolean().optional(),envelopeLayout:z.object({openWidth:z.number().min(50).max(200),openBottom:z.number().min(-50).max(50)}).strict().optional(),
  features:featurePatch.optional(),
 }).strict().default({}),
 regenerate:z.object({cover:z.boolean().optional(),envelopes:z.boolean().optional(),floral:z.boolean().optional()}).strict().optional(),
 galleryImages:z.array(z.object({name:z.string().min(1).max(220),prompt:z.string().min(5).max(8000)}).strict()).max(5).optional(),
}).strict();
export function parseWorkerInput(value){return workerInputSchema.parse(value)}
