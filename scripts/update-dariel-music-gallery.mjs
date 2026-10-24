import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));const require=createRequire(import.meta.url);require('@next/env').loadEnvConfig(root);
const {darielBabyshower:event}=await import('../config/events/dariel-babyshower.js');
const {initializeApp,cert,getApps}=require('firebase-admin/app');const {getFirestore,FieldValue}=require('firebase-admin/firestore');
const app=getApps()[0]||initializeApp({credential:cert({projectId:process.env.FIREBASE_PROJECT_ID,clientEmail:process.env.FIREBASE_CLIENT_EMAIL,privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n')})});
const db=getFirestore(app);const slugRef=db.collection('slugs').doc(event.slug);
if(!process.argv.includes('--apply')){console.log('Dry run: actualizar música y galería de '+event.slug);process.exit(0)}
await db.runTransaction(async tx=>{const slug=await tx.get(slugRef);if(!slug.exists)throw Error('No existe el evento');const ref=db.collection('events').doc(slug.data().eventId),snapshot=await tx.get(ref);if(snapshot.data()?.slug!==event.slug)throw Error('Slug inconsistente');tx.update(ref,{'publicData.music':event.music,'publicData.gallery':event.gallery.map((p,i)=>({id:'photo-'+i,url:p.url,alt:p.alt,order:i})),'publicData.sections.gallery':true,updatedAt:FieldValue.serverTimestamp()})});console.log('Música y galería actualizadas: '+event.slug);
