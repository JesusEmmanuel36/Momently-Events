import {typographyStyle} from "@/lib/wedding/typography";
import styles from "./CoverBackground.module.css";
import { WeddingInvitation } from "@/components/WeddingInvitation";
import { toTemplateWedding } from "@/lib/wedding/public-data";
import { FlexibleInvitation } from "./FlexibleInvitation";

export function WeddingRenderer({ event, previewMode = false, previewEnvelope = false, pass = null, passToken = null }) {
  if (event.templateKey === "flexible-celebration") return <FlexibleInvitation event={event} previewMode={previewMode} previewEnvelope={previewEnvelope} pass={pass} passToken={passToken} />;
  const wedding = toTemplateWedding(event);
  const style = { ...typographyStyle(event.publicData?.typography), "--text": wedding.theme.dark, "--text-soft": wedding.theme.dark, "--coffee": wedding.theme.primary, "--coffee-dark": wedding.theme.dark, "--surface-dark": event.publicData?.theme?.surfaceDark || wedding.theme.dark, "--champagne": wedding.theme.champagne, "--cream": wedding.theme.cream, "--ivory": wedding.theme.ivory, "--rose": wedding.theme.rose, "--sage": wedding.theme.sage };
  switch (event.templateKey) {
    case "brown-romance": return <div className={styles.creatorShell} style={style}><WeddingInvitation wedding={wedding} previewMode={previewMode} previewEnvelope={previewEnvelope} pass={pass} passToken={passToken} /></div>;
    default: return <div className={styles.creatorShell} style={style}><WeddingInvitation wedding={wedding} previewMode={previewMode} previewEnvelope={previewEnvelope} pass={pass} passToken={passToken} /></div>;
  }
}
