"use client";
import {featureVariables} from '@/lib/ai/feature-appearance';
import {FEATURE_APPEARANCE_CSS} from '@/lib/ai/feature-css';
import {normalizeAiFeatures} from '@/lib/ai/feature-settings';
import Image from 'next/image';
import {useEffect,useMemo,useState,useCallback} from 'react';
import {AiCoverPreview} from '@/components/admin/AiCoverPreview';
import {coverDocument} from '@/lib/ai/cover-code';
import {RSVPSection} from '@/components/sections/GuestActions';
import {CreatorPass} from '@/components/wedding/CreatorPass';
import {GuestPhotoGallery} from '@/components/events/caleb-ciriam/photos/GuestPhotoGallery';
import {aiPhotoConfig} from '@/lib/event-photos/dynamic-config';
import styles from './PublishedAiInvitation.module.css';
export function PublishedAiInvitation({event,pass=null,passToken=null}){
 const d=event.publicData.aiDesign;const features=normalizeAiFeatures(d.features);const[origin,setOrigin]=useState(''),[opened,setOpened]=useState(!d.artwork?.['envelope-closed']);
 useEffect(()=>setOrigin(window.location.origin),[]);const onOpened=useCallback(()=>setOpened(true),[]);
 const doc=useMemo(()=>origin?coverDocument(d.cover,d.imageUrl,origin,{fullInvitation:true,published:true,floral:d.showFloral?d.artwork?.floral:'',gallery:d.gallery,videos:d.videos}):'',[d,origin]);
 const photos=aiPhotoConfig({id:event.eventId,...event,settings:{guestPhotos:{enabled:d.features.photos,lockedUntilEvent:features.photosLocked,photoOpening:features.photoOpening}}});
 const wedding={templateKey:'ai-designed',slug:event.slug,eventId:event.eventId,isLive:true,couple:{bride:d.name1,groom:d.name2},rsvpSettings:event.rsvp,rsvpMessageLabel:'Mensaje para los anfitriones',rsvpDeadline:event.rsvp.deadline?new Intl.DateTimeFormat('es-MX',{dateStyle:'long',timeZone:'America/Monterrey'}).format(new Date(event.rsvp.deadline)):''};
 return <main className={styles.page}><style>{FEATURE_APPEARANCE_CSS}</style><AiCoverPreview document={doc} publicMode interactive onOpened={onOpened} imageUrl={d.imageUrl} musicUrl={d.musicUrl} musicControl={d.cover.musicControl} envelopeLetter={d.cover.envelopeLetter} closedUrl={d.artwork?.['envelope-closed']} openUrl={d.artwork?.['envelope-open']} title={[d.name1,d.name2].filter(Boolean).join(' y ')} subtitle={d.occasion} date={d.dateLabel} layout={d.envelopeLayout}/>{opened&&<div className={styles.features}>
 {(event.personalizedPasses||event.rsvp.enabled)&&<div id="ai-confirmation" className="momently-native-feature" style={featureVariables(d.cover.featureAppearance,event.personalizedPasses?'passes':'rsvp')}>{event.personalizedPasses?<CreatorPass pass={pass} token={passToken} slug={event.slug} confirmationEnabled={event.rsvp.enabled} showMessage={features.askMessage}/>:<RSVPSection wedding={wedding}/>}</div>}
 {photos&&<section className={`${styles.photos} momently-native-feature`} style={featureVariables(d.cover.featureAppearance,'photos')}><h2>Comparte tus recuerdos</h2><p>Escanea el QR o abre el enlace para subir tus fotografías.{features.photoOpening!=='now'&&` Disponible a partir del ${photos.opensDateLabel}.`}</p><Image unoptimized src={photos.path+'/qr'} width={220} height={220} alt="Código QR para compartir fotos"/><a href={photos.path}>Subir mis fotos</a><GuestPhotoGallery event={photos}/></section>}
 </div>}</main>;
}
