import { cinematicDemo } from '@/config/cinematic/demo';
import { CinematicInvitation } from '@/components/cinematic/CinematicInvitation';
export const metadata={title:'Cinema · Una historia de amor',description:'Una experiencia cinematográfica de invitación digital de Momently Events. Demo con pareja y datos ficticios.',robots:{index:false,follow:false},openGraph:{images:['/images/cinematic-demo/scene-02-portrait.webp']}};
export default function CinematicDemoPage(){return <CinematicInvitation config={cinematicDemo}/>;}
