"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`}>{children}</div>;
}

export function SectionHeading({ eyebrow, title, copy, light = false }) {
  return <header className={`section-heading ${light ? "section-heading--light" : ""}`}>
    <span className="eyebrow">{eyebrow}</span>
    <span className="flourish" aria-hidden="true"><i /><b>◇</b><i /></span>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </header>;
}

export function Modal({ open, onClose, label, children }) {
  useEffect(() => {
    if (!open) return;
    const close = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
    <div className="modal-card" role="dialog" aria-modal="true" aria-label={label} onMouseDown={(event) => event.stopPropagation()}>
      <button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar"><X /></button>
      {children}
    </div>
  </div>;
}

export function Botanical({ className = "" }) {
  return <svg className={`botanical ${className}`} viewBox="0 0 140 220" fill="none" aria-hidden="true">
    <path d="M67 214C73 158 69 92 103 15" />
    <path d="M78 150C50 145 28 126 15 102C49 97 70 112 78 150Z" />
    <path d="M86 112C106 102 123 82 129 60C101 62 86 81 86 112Z" />
    <path d="M70 178C45 174 27 159 16 141C42 137 62 150 70 178Z" />
    <path d="M96 76C111 65 119 48 120 31C99 37 90 52 96 76Z" />
  </svg>;
}
