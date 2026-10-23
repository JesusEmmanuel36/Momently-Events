import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));const require=createRequire(import.meta.url);require('@next/env').loadEnvConfig(root);
const {gisselaVictor:event}=await import('../config/events/gissela-victor.js');
if(!process.argv.includes('--apply')){console.log(JSON.stringify({slug:event.slug,action:'create-published-event-and-enable-rsvp',ownerAccountCreated:false,dryRun:true}));process.exit(0)}
const {initializeApp,cert,getApps}=require('firebase-admin/app');const {getFirestore,FieldValue}=require('firebase-admin/firestore');
const app=getApps()[0]||initializeApp({credential:cert({projectId:process.env.FIREBASE_PROJECT_ID,clientEmail:process.env.FIREBASE_CLIENT_EMAIL,privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n')})});
const db=getFirestore(app),slug=await db.collection('slugs').doc(event.slug).get();
if(!slug.exists)throw Error('Evento no activado.');
const ref=db.collection('events').doc(slug.data().eventId),snapshot=await ref.get();
if(!snapshot.exists||snapshot.data().slug!==event.slug)throw Error('Evento inconsistente.');
await ref.update({'publicData.reception.address':event.reception.address,'publicData.reception.mapsUrl':event.reception.mapsUrl,'settings.rsvp.askCompanions':true,'settings.rsvp.maxCompanions':20,updatedAt:FieldValue.serverTimestamp()});
const checked=(await ref.get()).data();if(checked.publicData.reception.mapsUrl!==event.reception.mapsUrl||checked.settings.rsvp.maxCompanions!==20)throw Error('No se pudo verificar.');
console.log(JSON.stringify({slug:event.slug,addressUpdated:true,mapsUpdated:true,ageCounts:true,recordsDeleted:false}));
