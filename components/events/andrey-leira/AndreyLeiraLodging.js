import { BedDouble, ExternalLink, Hotel } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/ui";
import styles from "./AndreyLeiraLodging.module.css";
export function AndreyLeiraLodging({ lodging }) {
  return <section className={`section ${styles.lodging}`} id="hospedaje"><Reveal><Hotel className={styles.icon} strokeWidth={1}/><SectionHeading eyebrow="Para nuestra familia y amigos" title="Información de hospedaje" copy={lodging.intro}/></Reveal><div className={styles.rooms}>
    <Reveal className={styles.room}><BedDouble strokeWidth={1}/><h3>Habitación sencilla</h3><p>{lodging.single.beds}</p><div className={styles.singleRate}><span>{lodging.single.occupancy}</span><strong>{lodging.single.price}</strong></div><small>Pesos mexicanos</small></Reveal>
    <Reveal className={styles.room}><BedDouble strokeWidth={1}/><h3>Habitación doble</h3><p>{lodging.double.beds}</p><dl className={styles.rates}>{lodging.double.rates.map(rate=><div key={rate.occupancy}><dt>{rate.occupancy}</dt><dd>{rate.price}</dd></div>)}</dl><small>Pesos mexicanos</small></Reveal>
  </div><Reveal className={styles.notes}><p className={styles.children}>{lodging.children}</p><p>{lodging.note}</p><a className="button" href={lodging.url} target="_blank" rel="noreferrer">Conocer el hotel <ExternalLink size={16}/></a><p className={styles.closing}>¡Nos hará muy felices contar con su compañía!</p></Reveal></section>;
}
