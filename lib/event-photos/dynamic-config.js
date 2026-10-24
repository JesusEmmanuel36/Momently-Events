import {photoOpeningDate} from '../ai/feature-settings.js';
import {featureVariables} from '../ai/feature-appearance.js';
import {guestPhotos} from './config.js';
export function aiPhotoConfig(event){
 if(event?.templateKey!=='ai-designed'||event.settings?.guestPhotos?.enabled!==true)return null;
 const design=event.publicData?.aiDesign||{},date=design.eventDate;
 const mode=event.settings.guestPhotos.photoOpening||(event.settings.guestPhotos.lockedUntilEvent===false?'now':'event');
 const opening=photoOpeningDate(date,mode);if(!opening)return null;
 const vars=featureVariables(design.cover?.featureAppearance,'photos');
 const photoTheme={'--photo-page':vars['--af-background'],'--photo-paper':vars['--af-surface'],'--photo-dark':vars['--af-text'],'--photo-accent':vars['--af-accent'],'--photo-muted':vars['--af-muted'],'--photo-border':vars['--af-border'],'--photo-surface':vars['--af-surface'],'--photo-shadow':'#00000012'};
 const names=event.publicData?.eventTitle||'Nuestro evento';
 return {...guestPhotos,slug:event.slug,names,partner1:design.name1||names,partner2:design.name2||'',path:`/eventos/${event.slug}/fotos`,apiPath:`/api/public/event-photos/${event.slug}`,folder:`momently-events/ai-events/${event.id}/guest-photos`,floral:design.showFloral?design.artwork?.floral||'':'',...opening,closedMessage:`La carga de fotos estará disponible a partir del ${opening.opensDateLabel}.`,photoTheme,galleryTitle:'Las fotos de nuestros invitados',galleryEmpty:'Aún no hay fotos compartidas. ¡Comparte el primer recuerdo!',uploadEyebrow:'Recuerdos del evento',uploadIntro:'Comparte las fotos que tomaste y ayúdanos a guardar estos recuerdos.'};
}
