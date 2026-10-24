import 'server-only';
import {FieldValue} from 'firebase-admin/firestore';
import {getAdminDb} from '../firebase/admin.js';
import {assertAvailableTemplatePath} from '../wedding/admin-links.js';
import {ConflictError,NotFoundError,ValidationError} from '../errors.js';
import {aiPublishSchema,buildAiEvent} from './publishing.js';
export async function saveAiInvitation(raw,actorUid,{db=getAdminDb(),now=FieldValue.serverTimestamp()}={}){
 let data;try{data=aiPublishSchema.parse(raw)}catch(error){throw new ValidationError(error.issues?.[0]?.message||'Revisa los datos para guardar.')}
 assertAvailableTemplatePath(data.slug);
 const ref=data.eventId?db.collection('events').doc(data.eventId):db.collection('events').doc(),slugRef=db.collection('slugs').doc(data.slug),next=buildAiEvent(data,actorUid);
 let status='draft';
 await db.runTransaction(async tx=>{
  const [current,slugDoc]=await Promise.all([tx.get(ref),tx.get(slugRef)]);
  if(data.eventId&&!current.exists)throw new NotFoundError();
  if(current.exists){const old=current.data();if(old.templateKey!=='ai-designed')throw new ValidationError('Este evento pertenece a otro creador.');if(old.slug!==data.slug)throw new ValidationError('El enlace guardado se conserva para proteger los pases y el QR.');if(!slugDoc.exists||slugDoc.data().eventId!==ref.id)throw new ConflictError('El enlace del evento no coincide. Revisa el registro antes de guardar.');status=old.status;if(status==='archived')throw new ValidationError('Reactiva el evento antes de editarlo.');
   tx.update(ref,{publicData:next.publicData,settings:{...old.settings,...next.settings,rsvp:{...old.settings?.rsvp,...next.settings.rsvp}},aiEditor:next.aiEditor,updatedAt:now});
  }else{
   if(slugDoc.exists)throw new ConflictError('Este enlace ya está ocupado. Elige otro.');
   tx.create(ref,{...next,createdAt:now,updatedAt:now,publishedAt:null});tx.create(slugRef,{eventId:ref.id,createdAt:now});
  }
 });
 await db.collection('auditLogs').add({actorUid,eventId:ref.id,action:data.eventId?'ai-event.updated':'ai-event.created',createdAt:now,metadata:{}});
 return {id:ref.id,slug:data.slug,status};
}
