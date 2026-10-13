import { MessageCircle, Users } from "lucide-react";
import { Reveal } from "@/components/ui";
import styles from "./NahomiWhatsAppPass.module.css";
export function NahomiWhatsAppPass({ pass, whatsapp }) {
  const places = `${pass.allowedSeats} ${pass.allowedSeats === 1 ? "lugar" : "lugares"}`;
  const text = `Hola, Nahomi. Soy ${pass.displayName}. Quiero confirmar mi asistencia a tus XV años. Mi pase tiene ${places} asignados, incluyendo a la persona titular.`;
  return <section className={styles.section} id="tu-pase"><Reveal><span className="eyebrow">Tu pase personalizado</span><h2>{pass.displayName}</h2><div className={styles.seats}><Users strokeWidth={1}/><strong>{pass.allowedSeats}</strong><span>{pass.allowedSeats === 1 ? "lugar reservado" : "lugares reservados"}</span></div><p>Los lugares incluyen a la persona titular del pase. Agradecemos respetar el número asignado.</p><a className="button" href={`${whatsapp}?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Confirmar por WhatsApp</a></Reveal></section>;
}
