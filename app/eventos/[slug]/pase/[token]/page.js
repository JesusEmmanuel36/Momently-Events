import {notFound} from "next/navigation";
import {publishedPassEvent,readPass,passTokenPattern} from "@/lib/event-passes/server";
import {toPublicWedding} from "@/lib/wedding/public-data";
import {WeddingRenderer} from "@/components/wedding/WeddingRenderer";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export const metadata={title:"Tu pase personalizado",robots:{index:false,follow:false}};
export default async function Page({params}){
 const {slug,token}=await params;if(!passTokenPattern.test(token))notFound();
 let context,pass;
 try{context=await publishedPassEvent({slug});if(!["brown-romance","flexible-celebration","ai-designed"].includes(context.event.templateKey))notFound();pass=await readPass(token,{context});}
 catch(error){if(error.status===404||error.digest?.startsWith("NEXT_HTTP_ERROR_FALLBACK"))notFound();return <main className="empty-state"><h1>No pudimos abrir tu pase</h1><p>Intenta nuevamente en unos momentos o solicita tu enlace a los anfitriones.</p></main>;}
 return <WeddingRenderer event={toPublicWedding({id:context.ref.id,...context.event})} pass={pass} passToken={token}/>;
}
