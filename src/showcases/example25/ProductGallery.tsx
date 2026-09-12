import { useEffect, useState } from "react";
import type { Product } from "../../types/showcase";
import "./product-gallery.css";

export default function ProductGallery({ product }: { product: Product }) {
  const photos = product.photoUrls;
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const current = photos[index];
  const move = (step: number) => setIndex((value) => (value + step + photos.length) % photos.length);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (photos.length > 1 && event.key === "ArrowLeft") move(-1);
      if (photos.length > 1 && event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, photos.length]);
  return <><div className="e25-local-gallery">
    {current ? <button type="button" className="e25-local-gallery-stage" onClick={() => setOpen(true)} aria-label={`Open ${product.name} image`}><img src={current} alt={product.name} /></button> : <div className="e25-local-gallery-stage"><span>{String(product.number).padStart(2, "0")}</span></div>}
    {photos.length > 1 && <div className="e25-local-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous image">Previous</button><span>{index + 1} / {photos.length}</span><button type="button" onClick={() => move(1)} aria-label="Next image">Next</button></div>}
  </div>{open && current && <div className="e25-local-lightbox" role="dialog" aria-modal="true" aria-label={product.name} onClick={() => setOpen(false)}><button type="button" onClick={() => setOpen(false)} aria-label="Close image">Close</button><img src={current} alt={product.name} onClick={(event) => event.stopPropagation()} /></div>}</>;
}
