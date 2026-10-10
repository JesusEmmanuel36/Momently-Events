"use client";

import { ArrowDown, ArrowUp, ImagePlus, Plus, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";

const uploadSettings = {
  images: { accept: "image/jpeg,image/png,image/webp,image/avif", max: 15 * 1024 * 1024, resourceType: "image" },
  audio: { accept: "audio/*", max: 25 * 1024 * 1024, resourceType: "video" },
  video: { accept: "video/*", max: 150 * 1024 * 1024, resourceType: "video" },
};

function uploadToCloudinary(file, signed, resourceType, onProgress) {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    body.append("file", file);
    body.append("api_key", signed.apiKey);
    body.append("timestamp", String(signed.timestamp));
    body.append("signature", signed.signature);
    body.append("folder", signed.folder);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${signed.cloudName}/${resourceType}/upload`);
    xhr.upload.onprogress = (event) => { if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100)); };
    xhr.onload = () => {
      let result;
      try { result = JSON.parse(xhr.responseText); } catch { return reject(new Error("Cloudinary devolvió una respuesta inválida.")); }
      if (xhr.status < 200 || xhr.status >= 300) return reject(new Error(result.error?.message || "No fue posible subir el archivo."));
      resolve({ url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type });
    };
    xhr.onerror = () => reject(new Error("No fue posible conectar con Cloudinary."));
    xhr.send(body);
  });
}

export function CloudinaryUploadButton({ eventId, kind = "images", multiple = false, label = "Subir archivo", onUploaded, compact = false }) {
  const inputRef = useRef(null); const [busy, setBusy] = useState(false); const [progress, setProgress] = useState(0); const [error, setError] = useState("");
  const select = async (event) => {
    const files = [...(event.target.files || [])]; event.target.value = "";
    if (!files.length) return;
    const settings = uploadSettings[kind]; const oversized = files.find((file) => file.size > settings.max);
    if (oversized) return setError(`${oversized.name} supera el tamaño máximo permitido.`);
    setBusy(true); setError(""); setProgress(0);
    try {
      const response = await fetch("/api/admin/cloudinary/signature", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventId: eventId || undefined, kind }) });
      const signed = await response.json();
      if (!response.ok) throw new Error(signed.error || "No fue posible autorizar la carga.");
      for (let index = 0; index < files.length; index += 1) {
        const asset = await uploadToCloudinary(files[index], signed, settings.resourceType, (fileProgress) => setProgress(Math.round(((index + fileProgress / 100) / files.length) * 100)));
        onUploaded(asset, files[index]);
      }
      setProgress(100);
    } catch (cause) { setError(cause.message); } finally { setBusy(false); }
  };
  return <div className={`cloud-upload ${compact ? "cloud-upload--compact" : ""}`}>
    <input ref={inputRef} className="cloud-upload__input" type="file" accept={uploadSettings[kind].accept} multiple={multiple} onChange={select} />
    <button type="button" className="cloud-upload__button" onClick={() => inputRef.current?.click()} disabled={busy}><Upload size={15} /> {busy ? `Subiendo ${progress}%` : label}</button>
    {busy && <div className="upload-progress"><span style={{ width: `${progress}%` }} /></div>}
    {error && <small className="cloud-upload__error">{error}</small>}
  </div>;
}

export function CloudinaryAssetField({ name, defaultValue = "", eventId, kind = "images", label, onAssetChange }) {
  const [url, setUrl] = useState(defaultValue);
  const update = (next) => { setUrl(next); window.setTimeout(() => onAssetChange?.(), 0); };
  return <div className="cloud-asset-field">
    <input type="hidden" name={name} value={url} />
    {url && (kind === "images" ? <div className="cloud-asset-field__preview" style={{ backgroundImage: `url("${url.replaceAll('"', "%22")}")` }} /> : <div className="cloud-asset-field__file">Archivo cargado correctamente</div>)}
    <div className="cloud-asset-field__actions"><CloudinaryUploadButton eventId={eventId} kind={kind} label={url ? "Cambiar archivo" : label} compact onUploaded={(asset) => update(asset.url)} />{url && <button type="button" className="cloud-remove" onClick={() => update("")}><Trash2 size={14} /> Quitar</button>}</div>
  </div>;
}

export function GalleryEditor({ items, eventId, onChange }) {
  const update = (index, patch) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  const move = (index, step) => { const next = [...items]; const target = index + step; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; onChange(next.map((item, order) => ({ ...item, order }))); };
  return <div className="visual-editor">
    <div className="visual-editor__toolbar"><span>{items.length} {items.length === 1 ? "fotografía" : "fotografías"}</span><CloudinaryUploadButton eventId={eventId} multiple label="Agregar fotografías" onUploaded={(asset, file) => onChange((current) => [...current, { id: `photo-${crypto.randomUUID()}`, url: asset.url, alt: file.name.replace(/\.[^.]+$/, ""), order: current.length }])} /></div>
    {!items.length && <div className="visual-editor__empty"><ImagePlus /><strong>La galería está vacía</strong><span>Selecciona una o varias fotografías para comenzar.</span></div>}
    <div className="gallery-editor__grid">{items.map((item, index) => <article className="gallery-editor__item" key={item.id || `${item.url}-${index}`}>
      <div className="gallery-editor__image" style={{ backgroundImage: `url("${String(item.url).replaceAll('"', "%22")}")` }} />
      <input aria-label={`Descripción de fotografía ${index + 1}`} value={item.alt || ""} onChange={(event) => update(index, { alt: event.target.value })} placeholder="Describe brevemente la fotografía" />
      <div><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Mover antes"><ArrowUp size={14} /></button><button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Mover después"><ArrowDown size={14} /></button><button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))} aria-label="Eliminar fotografía"><Trash2 size={14} /></button></div>
    </article>)}</div>
  </div>;
}

export function StoryEditor({ items, eventId, onChange }) {
  const update = (index, patch) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  return <div className="visual-editor story-editor">
    <div className="visual-editor__toolbar"><span>{items.length} {items.length === 1 ? "momento" : "momentos"}</span><button type="button" className="cloud-upload__button" onClick={() => onChange([...items, { year: "", title: "", description: "", imageUrl: "" }])}><Plus size={15} /> Agregar momento</button></div>
    {!items.length && <div className="visual-editor__empty"><strong>Aún no has agregado momentos</strong><span>Crea acontecimientos importantes de la historia de la pareja.</span></div>}
    {items.map((item, index) => <article className="story-editor__item" key={`story-${index}`}>
      <div className="story-editor__heading"><strong>Momento {index + 1}</strong><button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={14} /> Eliminar</button></div>
      <div className="admin-grid"><label><span>Año</span><input value={item.year || ""} onChange={(event) => update(index, { year: event.target.value })} placeholder="2024" /></label><label><span>Título</span><input value={item.title || ""} onChange={(event) => update(index, { title: event.target.value })} placeholder="La propuesta" /></label></div>
      <label><span>Descripción</span><textarea rows="3" value={item.description || ""} onChange={(event) => update(index, { description: event.target.value })} placeholder="Cuenta brevemente este momento…" /></label>
      {item.imageUrl && <div className="story-editor__image" style={{ backgroundImage: `url("${String(item.imageUrl).replaceAll('"', "%22")}")` }} />}
      <div className="cloud-asset-field__actions"><CloudinaryUploadButton eventId={eventId} label={item.imageUrl ? "Cambiar fotografía" : "Agregar fotografía"} compact onUploaded={(asset) => update(index, { imageUrl: asset.url })} />{item.imageUrl && <button type="button" className="cloud-remove" onClick={() => update(index, { imageUrl: "" })}><Trash2 size={14} /> Quitar</button>}</div>
    </article>)}
  </div>;
}

export function StructuredListEditor({ items, onChange, fields, addLabel, itemLabel, pluralLabel, emptyText, createItem }) {
  const update = (index, patch) => onChange(items.map((item, itemIndex) => itemIndex === index ? { ...item, ...patch } : item));
  const move = (index, step) => { const next = [...items]; const target = index + step; if (target < 0 || target >= next.length) return; [next[index], next[target]] = [next[target], next[index]]; onChange(next); };
  return <div className="visual-editor structured-editor">
    <div className="visual-editor__toolbar"><span>{items.length} {items.length === 1 ? itemLabel.toLowerCase() : pluralLabel.toLowerCase()}</span><button type="button" className="cloud-upload__button" onClick={() => onChange([...items, createItem])}><Plus size={15} /> {addLabel}</button></div>
    {!items.length && <div className="visual-editor__empty"><strong>No hay {pluralLabel.toLowerCase()}</strong><span>{emptyText}</span></div>}
    {items.map((item, index) => <article className="structured-editor__item" key={`${itemLabel}-${index}`}>
      <div className="story-editor__heading"><strong>{itemLabel} {index + 1}</strong>{Object.hasOwn(item, "enabled") && <label className="admin-check"><input type="checkbox" checked={item.enabled !== false} onChange={event => update(index, {enabled:event.target.checked})} />Mostrar</label>}<div className="structured-editor__actions"><button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Mover antes"><ArrowUp size={14} /></button><button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Mover después"><ArrowDown size={14} /></button><button type="button" onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={14} /> Eliminar</button></div></div>
      <div className="structured-editor__fields">{fields.map((field) => <label className={field.wide ? "is-wide" : ""} key={field.key}><span>{field.label}</span>{field.type === "textarea" ? <textarea rows={field.rows || 3} value={item[field.key] || ""} onChange={(event) => update(index, { [field.key]: event.target.value })} placeholder={field.placeholder} required={field.required} /> : field.type === "select" ? <select value={item[field.key] || field.options[0]?.[0] || ""} onChange={(event) => update(index, { [field.key]: event.target.value })} required={field.required}>{field.options.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select> : <input type={field.type || "text"} step={field.step} value={item[field.key] || ""} onChange={(event) => update(index, { [field.key]: event.target.value })} placeholder={field.placeholder} required={field.required} />}</label>)}</div>
    </article>)}
  </div>;
}
