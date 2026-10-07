import { guestPhotos } from "@/lib/event-photos/config";

export async function preparePhoto(file, event = guestPhotos) {
  if (file.size > event.maxSourceBytes) throw new Error("Esta foto supera los 25 MB. Selecciona una versión más pequeña.");
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type)) throw new Error("Selecciona una fotografía JPG, PNG o WebP.");
  const url = URL.createObjectURL(file);
  try {
    const image = await new Promise((resolve, reject) => {
      const element = new window.Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("No pudimos abrir esta foto. Si es HEIC, guárdala como JPG y vuelve a intentar."));
      element.src = url;
    });
    const ratio = Math.min(1, event.maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * ratio));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("No pudimos preparar la fotografía en este navegador.");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    for (const quality of [0.9, 0.8, 0.65]) {
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
      if (blob && blob.size <= event.maxFileBytes) return blob;
    }
    throw new Error("No pudimos reducir esta foto. Prueba con una versión más pequeña.");
  } finally { URL.revokeObjectURL(url); }
}
