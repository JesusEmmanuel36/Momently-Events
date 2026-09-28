export function normalizeSlug(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, " y ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").replace(/-{2,}/g, "-").slice(0, 80).replace(/-+$/g, "");
}

export const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
