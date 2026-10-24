import 'server-only';
import {getPublishedRsvpEvent} from '../rsvp/published-event.js';
import {NotFoundError} from '../errors.js';
import {aiPhotoConfig} from './dynamic-config.js';
export async function publishedAiPhotos(slug){const {event,eventRef}=await getPublishedRsvpEvent(slug);const config=aiPhotoConfig({...event,id:eventRef.id});if(!config)throw new NotFoundError();return config;}
