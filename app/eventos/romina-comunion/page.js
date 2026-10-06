import { RominaComunionInvitation } from "@/components/events/romina-comunion/RominaComunionInvitation";
import { rominaComunion } from "@/config/events/romina-comunion";
export const metadata = {title:"Romina Jahori | Mi primera comunión",openGraph:{title:"Romina Jahori | Mi primera comunión",images:["/images/events/romina-comunion/envelope-closed.png"]}};
export default function Page(){return <RominaComunionInvitation event={rominaComunion}/>;}
