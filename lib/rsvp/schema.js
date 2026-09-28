import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().trim().min(2).max(100), attending: z.enum(["yes", "no"]), companions: z.coerce.number().int().min(0).max(20),
  menuPreference: z.enum(["normal", "vegetarian", "child"]).nullable().optional(), allergies: z.string().trim().max(500).default(""),
  message: z.string().trim().max(1000).default(""), songTitle: z.string().trim().max(120).default(""), artist: z.string().trim().max(120).default(""),
  website: z.string().max(0).optional().default(""), rsvpId: z.string().max(150).optional(),
});

export const panelRsvpSchema = rsvpSchema.omit({ website: true, rsvpId: true }).extend({ source: z.literal("panel").optional() });
