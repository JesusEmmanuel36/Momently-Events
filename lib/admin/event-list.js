// Only list metadata crosses the server/client boundary, never the full design or settings.
export function eventListItem(id,data){return {id,slug:data.slug||'',status:data.status||'draft',publicPath:data.publicPath||`/eventos/${data.slug||''}`,title:data.publicData?.eventTitle||[data.publicData?.couple?.partner1,data.publicData?.couple?.partner2].filter(Boolean).join(' & ')||'Invitación',date:data.publicData?.weddingDate?.iso?.slice(0,10)||'',createdAt:data.createdAt?.toMillis?.()||0};}
export function eventListCounts(events){return events.reduce((counts,event)=>{counts.total++;if(['published','draft','archived'].includes(event.status))counts[event.status]++;return counts;},{total:0,published:0,draft:0,archived:0});}
const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
export function filterEventList(events,query='',status='all'){
 const words=normalize(query).trim().split(/\s+/).filter(Boolean);
 return events.filter(event=>(status==='all'||event.status===status)&&words.every(word=>normalize([event.title,event.slug,event.publicPath,event.date].join(' ')).includes(word)));
}
