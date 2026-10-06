import { LuisManuelNancyInvitation } from "@/components/events/luis-manuel-nancy/LuisManuelNancyInvitation";
import { luisManuelNancy } from "@/config/events/luis-manuel-nancy";
export const metadata={title:"Luis Manuel y Nancy | Nuestra boda",description:"14 de noviembre de 2026 · Paracho, Michoacán",openGraph:{title:"Luis Manuel y Nancy | Nuestra boda",images:["/images/events/luis-manuel-y-nancy/envelope-closed.png"]}};
export default function Page(){return <LuisManuelNancyInvitation wedding={luisManuelNancy}/>;}
