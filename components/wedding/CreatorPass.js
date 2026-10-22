import {PersonalizedPass} from "@/components/events/alejandra-david/passes/PersonalizedPass";
import styles from "./CreatorPass.module.css";
export function CreatorPass({pass,token,slug,confirmationEnabled=true}){
 return <div className={styles.pass}>{pass&&confirmationEnabled?<PersonalizedPass pass={pass} token={token} slug={slug} messageLabel="Mensaje para los anfitriones"/>:<section className="section" id="tu-pase"><h2>{pass?pass.displayName:"Tu pase personalizado"}</h2>{pass&&<p>Tenemos reservados {pass.allowedSeats} {pass.allowedSeats===1?"lugar":"lugares"} para ti.</p>}<p>{pass?"Las confirmaciones no están disponibles por el momento.":"Abre el enlace de tu pase para ver los lugares reservados a tu nombre y confirmar tu asistencia."}</p></section>}</div>;
}
