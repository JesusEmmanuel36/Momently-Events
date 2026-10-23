import { z } from "zod";
import {hasAgeCounts,maxAgeCountPeople} from "./age-counts.js";

export const rsvpSchema = z.object({
  name: z.string().trim().min(2).max(100), attending: z.enum(["yes", "no"]), companions: z.coerce.number().int().min(0).max(20),
  menuPreference: z.enum(["normal", "vegetarian", "child"]).nullable().optional(), allergies: z.string().trim().max(500).default(""),
  message: z.string().trim().max(1000).default(""), songTitle: z.string().trim().max(120).default(""), artist: z.string().trim().max(120).default(""),
  website: z.string().max(0).optional().default(""), rsvpId: z.string().max(150).optional(),
});

export const panelRsvpSchema = rsvpSchema.omit({ website: true, rsvpId: true }).extend({ source: z.literal("panel").optional() });

const esmeraldaCompanions = z.coerce.number().int().min(0).max(3);
const unlimitedCompanions = z.coerce.number().int().min(0).max(Number.MAX_SAFE_INTEGER - 1);
export function publicRsvpSchemaFor(slug) { if (hasAgeCounts(slug)) return withAgeCounts(rsvpSchema,maxAgeCountPeople(slug)); return slug === "yuli-y-alexis" ? rsvpSchema.extend({ companions: unlimitedCompanions }) : slug === "esmeralda-y-antonio" ? rsvpSchema.extend({ companions: esmeraldaCompanions }) : rsvpSchema; }
export function panelRsvpSchemaFor(slug) { if (hasAgeCounts(slug)) return withAgeCounts(panelRsvpSchema,maxAgeCountPeople(slug)); return slug === "yuli-y-alexis" ? panelRsvpSchema.extend({ companions: unlimitedCompanions }) : slug === "esmeralda-y-antonio" ? panelRsvpSchema.extend({ companions: esmeraldaCompanions }) : panelRsvpSchema; }

function withAgeCounts(schema,maxPeople=6) {
  return schema.extend({ adults: z.coerce.number().int().min(0).max(maxPeople).optional(), children: z.coerce.number().int().min(0).max(maxPeople).optional() })
    .superRefine((data, ctx) => {
      if (data.adults === undefined && data.children === undefined) return;
      if (data.adults === undefined || data.children === undefined) ctx.addIssue({ code: "custom", path: ["adults"], message: "Indica adultos y niños." });
      else if (data.attending === "yes" && (data.adults < 1 || data.adults + data.children > maxPeople)) ctx.addIssue({ code: "custom", path: ["adults"], message: `Incluye al menos un adulto y hasta ${maxPeople} personas en total.` });
    }).transform(data => {
      if (data.adults === undefined && data.children === undefined) return data;
      const adults = data.attending === "yes" ? data.adults : 0;
      const children = data.attending === "yes" ? data.children : 0;
      return { ...data, adults, children, companions: data.attending === "yes" ? adults + children - 1 : 0 };
    });
}
export function ageCountFields(data, slug) {
  return hasAgeCounts(slug) && data.adults !== undefined && data.children !== undefined
    ? { adults: data.attending === "yes" ? data.adults : 0, children: data.attending === "yes" ? data.children : 0 } : {};
}
