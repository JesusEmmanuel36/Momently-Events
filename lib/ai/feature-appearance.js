import {z} from 'zod';
const color=z.string().regex(/^#[0-9a-fA-F]{6}$/);
const fonts=['serif','script','sans','georgia','times','arial'];
const shape={background:color,surface:color,text:color,muted:color,accent:color,buttonText:color,border:color,inputBackground:color,inputText:color,headingFont:z.enum(fonts),bodyFont:z.enum(fonts),radius:z.number().min(0).max(32),spacing:z.number().min(16).max(100)};
export const featureSectionSchema=z.object(shape).strict();
export const featureAppearanceSchema=z.object({rsvp:featureSectionSchema,passes:featureSectionSchema,photos:featureSectionSchema}).strict();
const colorFields=['background','surface','text','muted','accent','buttonText','border','inputBackground','inputText'];
const properties={...Object.fromEntries(colorFields.map(key=>[key,{type:'string',pattern:'^#[0-9a-fA-F]{6}$'}])),headingFont:{type:'string',enum:fonts},bodyFont:{type:'string',enum:fonts},radius:{type:'number',minimum:0,maximum:32},spacing:{type:'number',minimum:16,maximum:100}};
const sectionJson={type:'object',additionalProperties:false,required:Object.keys(properties),properties};
export const featureAppearanceJsonSchema={type:'object',additionalProperties:false,required:['rsvp','passes','photos'],properties:{rsvp:sectionJson,passes:sectionJson,photos:sectionJson}};
export const defaultFeatureStyle={background:'#FFFAF4',surface:'#FFFFFF',text:'#493A2D',muted:'#75695D',accent:'#6A533F',buttonText:'#FFFFFF',border:'#D6C6AE',inputBackground:'#FFFFFF',inputText:'#493A2D',headingFont:'serif',bodyFont:'sans',radius:12,spacing:48};
const families={serif:'Cormorant, var(--font-serif), Georgia, serif',script:'Allura, var(--font-script), cursive',sans:'Manrope, var(--font-sans), Arial, sans-serif',georgia:'Georgia, serif',times:'"Times New Roman", serif',arial:'Arial, sans-serif'};
export function featureVariables(appearance,key){const style=featureSectionSchema.safeParse(appearance?.[key]);const s=style.success?style.data:defaultFeatureStyle;return {...Object.fromEntries(colorFields.map(key=>['--af-'+key,s[key]])),'--af-heading-font':families[s.headingFont],'--af-body-font':families[s.bodyFont],'--af-radius':s.radius+'px','--af-spacing':s.spacing+'px'};}
export function featureInlineStyle(appearance,key){return Object.entries(featureVariables(appearance,key)).map(([name,value])=>name+':'+String(value).replaceAll('"','&quot;')).join(';');}
