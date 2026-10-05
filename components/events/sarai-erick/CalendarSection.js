"use client";
import { CalendarDays } from "lucide-react";
import { Reveal } from "@/components/ui";
import { openGoogleCalendar } from "@/lib/calendar";
export function CalendarSection({ wedding, onToast }) {
  const addCalendar = () => {
    openGoogleCalendar({ title: `Boda de ${wedding.couple.groom} y ${wedding.couple.bride}`, start: wedding.date, durationHours: 8, location: wedding.ceremony.address, details: wedding.heroQuote });
    onToast("Abriendo Google Calendar");
  };
  return <section className="calendar"><Reveal><CalendarDays strokeWidth={1} /><span className="eyebrow">Reserva la fecha</span><h2>{wedding.dateDisplay}</h2><p>No queremos celebrar este momento sin ti.</p><button className="button button--ivory" onClick={addCalendar}>Agregar a mi calendario</button></Reveal></section>;
}
