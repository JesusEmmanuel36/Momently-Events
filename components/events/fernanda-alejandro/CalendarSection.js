"use client";
import { CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
export function CalendarSection({ wedding, onToast }) {
 const addCalendar=()=>{openGoogleCalendar({title:"Boda de Fernanda y Alejandro",start:wedding.date,end:wedding.endDate,location:wedding.ceremony.address,details:wedding.heroQuote});onToast("Abriendo Google Calendar");};
 return <section className="calendar"><Reveal><CalendarDays strokeWidth={1}/><span className="eyebrow">Reserva la fecha</span><h2>{wedding.dateDisplay}</h2><p>4:00 p. m. a 10:00 p. m. · Horario de Ajax, Ontario</p><button className="button button--ivory" onClick={addCalendar}>Agregar a mi calendario</button></Reveal></section>;
}
