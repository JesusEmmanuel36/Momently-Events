import {redirect} from 'next/navigation';
import {requireAdmin} from '@/lib/auth/session';
import {ownedWorkerJob} from '@/lib/ai/worker/jobs';
import AiWorkerJobPreview from '@/components/admin/AiWorkerJobPreview';
export const dynamic='force-dynamic';
export default async function WorkerPreview({params}){let actor;try{actor=await requireAdmin()}catch{redirect('/admin/login')}const {jobId}=await params,{job}=await ownedWorkerJob(jobId,actor);return <main style={{maxWidth:900,margin:'0 auto',padding:24}}><h1>Vista previa del trabajador IA</h1><p>Estado: {job.status}. Esta vista no envía confirmaciones.</p>{job.candidate?.cover?<div data-admin-preview><AiWorkerJobPreview candidate={job.candidate}/></div>:<p>El diseño aún se está generando. Actualiza esta página cuando termine la etapa de diseño.</p>}</main>}
