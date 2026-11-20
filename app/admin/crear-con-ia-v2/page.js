import {redirect,notFound} from 'next/navigation';
import {requireAdmin} from '@/lib/auth/session';
import {getAdminDb} from '@/lib/firebase/admin';
import {DashboardShell} from '@/components/dashboard/DashboardShell';
import {AiCoverStudio} from '@/components/admin/AiCoverStudio';
export const dynamic='force-dynamic';
export default async function Page({searchParams}){let user;try{user=await requireAdmin()}catch{redirect('/admin/login')}const {eventId}=await searchParams;let initialEvent=null;if(eventId){if(!/^[a-zA-Z0-9_-]{1,128}$/.test(eventId))notFound();const doc=await getAdminDb().collection('events').doc(eventId).get();if(!doc.exists||doc.data().templateKey!=='ai-designed')notFound();const data=doc.data();initialEvent=JSON.parse(JSON.stringify({id:doc.id,slug:data.slug,status:data.status,publicData:data.publicData,aiEditor:data.aiEditor||{}}))}return <DashboardShell area="admin" user={user}><header className="dashboard-header"><div><span className="dashboard-eyebrow">Estudio de diseño</span><h1>Crear con IA · V2</h1><p>Pega el encargo y deja que el asistente prepare los datos, el enlace y los recursos. Revisa la vista previa antes de publicar.</p></div></header><AiCoverStudio initialEvent={initialEvent} version="v2"/></DashboardShell>}
