import {z} from 'zod';
export const aiFeaturesSchema=z.object({rsvp:z.boolean(),passes:z.boolean(),photos:z.boolean(),photosLocked:z.boolean().default(true),photoOpening:z.enum(['event','week-before','now']).optional(),maxCompanions:z.number().int().min(0).max(20).default(5),askAgeCounts:z.boolean().default(false),askCompanions:z.boolean().default(true),askMenuPreference:z.boolean().default(false),askAllergies:z.boolean().default(false),askMessage:z.boolean().default(true),askSongSuggestion:z.boolean().default(false)});
export function normalizeAiFeatures(features={}){return {...{rsvp:false,passes:false,photos:false,maxCompanions:5,askAgeCounts:false,askCompanions:true,askMenuPreference:false,askAllergies:false,askMessage:true,askSongSuggestion:false},...features,photoOpening:features.photoOpening||(features.photosLocked===false?'now':'event'),photosLocked:(features.photoOpening||(features.photosLocked===false?'now':'event'))!=='now'};}
export function photoOpeningDate(date,mode='event'){
 if(mode==='now')return {opensAt:'1970-01-01T00:00:00Z',opensDateLabel:'desde ahora'};
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return null;
 const day=new Date(date+'T12:00:00Z');if(!Number.isFinite(day.getTime())||day.toISOString().slice(0,10)!==date)return null;
 if(mode==='week-before')day.setUTCDate(day.getUTCDate()-7);
 const iso=day.toISOString().slice(0,10);return {opensAt:iso+'T00:00:00-06:00',opensDateLabel:new Intl.DateTimeFormat('es-MX',{dateStyle:'long',timeZone:'UTC'}).format(day)};
}
export function allowedAiRsvpFields(data,event){
 if(event.templateKey!=='ai-designed')return data;
 const settings=event.settings?.rsvp||{};
 return {...data,companions:settings.askCompanions===false&&!settings.askAgeCounts?0:data.companions,menuPreference:settings.askMenuPreference===true?data.menuPreference:null,allergies:settings.askAllergies===true?data.allergies:'',message:settings.askMessage===false?'':data.message,songTitle:settings.askSongSuggestion===true?data.songTitle:'',artist:settings.askSongSuggestion===true?data.artist:''};
}
