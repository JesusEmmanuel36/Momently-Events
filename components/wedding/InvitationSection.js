import {CssFloralArrangement} from "@/components/floral/CssFloralArrangement";
import {sectionAppearanceStyle} from "@/lib/wedding/section-appearance";
import styles from "./InvitationSection.module.css";
export function InvitationSection({name,data={},defaultFlowers=false,children}) {
 const settings=data.sectionAppearance?.[name] || {},decoration=data.decorations || {},theme=data.theme || {};
 const flowers=!["hero","intro"].includes(name) && decoration.flowers !== false && (settings.flowers ?? defaultFlowers);
 const colors={flowers:decoration.lightFlowerColor||theme.ivory,accentFlowers:decoration.flowerColor||theme.rose,leaves:decoration.foliageColor||theme.sage};
 return <div data-invitation-section={name} data-section-colors={settings.colorsEnabled?"true":undefined} className={styles.appearance} style={sectionAppearanceStyle(settings)}>{flowers&&<div className={styles.flowers} aria-hidden="true"><CssFloralArrangement lightweight colors={colors}/></div>}{children}</div>;
}
export function WeddingSection({wedding,name,children}) {
 return wedding.creatorAppearanceData?<InvitationSection name={name} data={wedding.creatorAppearanceData}>{children}</InvitationSection>:children;
}
