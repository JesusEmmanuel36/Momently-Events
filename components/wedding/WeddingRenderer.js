import { WeddingInvitation } from "@/components/WeddingInvitation";
import { toTemplateWedding } from "@/lib/wedding/public-data";

export function WeddingRenderer({ event, previewMode = false }) {
  const wedding = toTemplateWedding(event);
  const style = { "--coffee": wedding.theme.primary, "--coffee-dark": wedding.theme.dark, "--champagne": wedding.theme.champagne, "--cream": wedding.theme.cream, "--ivory": wedding.theme.ivory, "--rose": wedding.theme.rose, "--sage": wedding.theme.sage };
  switch (event.templateKey) {
    case "brown-romance": return <div style={style}><WeddingInvitation wedding={wedding} previewMode={previewMode} /></div>;
    default: return <div style={style}><WeddingInvitation wedding={wedding} previewMode={previewMode} /></div>;
  }
}
