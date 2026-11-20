import 'server-only';
import {getAdminDb} from '../firebase/admin.js';
import {assertAvailableTemplatePath} from '../wedding/admin-links.js';
import {findAvailableSlug} from './v2-plan.js';
export async function availableV2Slug(candidate,eventId){const db=getAdminDb();return findAvailableSlug(candidate,{isTaken:async slug=>{try{assertAvailableTemplatePath(slug)}catch{return true}const snap=await db.collection('slugs').doc(slug).get();return snap.exists&&snap.data().eventId!==eventId}})}
