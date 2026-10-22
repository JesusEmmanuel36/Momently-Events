export function normalizeSlug(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " y ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-").slice(0, 80).replace(/-+$/g, "");
}

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Keep the separator while typing so the next word is not joined to the first.
export function normalizeSlugInput(value) {
 const normalized=normalizeSlug(value);
 return normalized && normalized.length<80 && /[\s-]$/.test(String(value)) ? `${normalized}-` : normalized;
}
