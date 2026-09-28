const labels = { draft: "Borrador", published: "Publicada", archived: "Archivada" };

export function eventStatusLabel(status) {
  return labels[status] || status;
}
