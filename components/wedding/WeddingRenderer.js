import { WeddingInvitation } from "@/components/WeddingInvitation";
import { toTemplateWedding } from "@/lib/wedding/public-data";
import { FlexibleInvitation } from "./FlexibleInvitation";

export function WeddingRenderer({ event, previewMode = false, previewEnvelope = false }) {
  if (event.templateKey === "flexible-celebration") return <FlexibleInvitation event={event} previewMode={previewMode} previewEnvelope={previewEnvelope} />;
  const wedding = toTemplateWedding(event);
  const style = { "--coffee": wedding.theme.primary, "--coffee-dark": wedding.theme.dark, "--champagne": wedding.theme.champagne, "--cream": wedding.theme.cream, "--ivory": wedding.theme.ivory, "--rose": wedding.theme.rose, "--sage": wedding.theme.sage };
  switch (event.templateKey) {
    case "brown-romance": return <div style={style}><WeddingInvitation wedding={wedding} previewMode={previewMode} /></div>;
    default: return <div style={style}><WeddingInvitation wedding={wedding} previewMode={previewMode} /></div>;
  }
}
