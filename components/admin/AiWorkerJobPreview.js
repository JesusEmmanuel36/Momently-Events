'use client';
import {useEffect,useState} from 'react';
import {AiCoverPreview} from './AiCoverPreview';
import {coverDocument} from '@/lib/ai/cover-code';
export default function AiWorkerJobPreview({candidate}){
 const [origin,setOrigin]=useState('');useEffect(()=>{setOrigin(window.location.origin)},[]);
 const c=candidate,document=coverDocument(c.cover,c.imageUrl,origin,{fullInvitation:true,floral:c.showFloral?c.artwork.floral:'',gallery:c.gallery,videos:c.videos,featurePreview:c.features});
 return <AiCoverPreview document={document} imageUrl={c.imageUrl} musicUrl={c.musicUrl} musicControl={c.cover.musicControl} envelopeLetter={c.cover.envelopeLetter} closedUrl={c.artwork['envelope-closed']} openUrl={c.artwork['envelope-open']} title={[c.name1,c.name2].filter(Boolean).join(' y ')} subtitle={c.occasion} date={c.dateLabel} layout={c.envelopeLayout} interactive/>;
}
