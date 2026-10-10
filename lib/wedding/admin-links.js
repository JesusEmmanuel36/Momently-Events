import { existsSync } from "node:fs";
import { join } from "node:path";
import { ConflictError } from "../errors.js";
import { staticEventSlugs } from "./static-slugs.js";
export function assertAvailableTemplatePath(slug) {
  if (staticEventSlugs.includes(slug) || existsSync(join(process.cwd(), "app", "eventos", slug, "page.js"))) throw new ConflictError("Ese enlace pertenece a una invitación del proyecto. Elige un enlace diferente.");
}
