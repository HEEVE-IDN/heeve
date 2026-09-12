import { useEffect, useState } from "react";
import type { Product } from "../../types/showcase";

export default function LocalGallery({ product, className = "" }: { product: Product; className?: string }) {
  const photos = product.photoUrls;
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = photos[index];
  const move = (step: number) => setIndex((value) => (value + step + photos.length) % photos.length);
  useEffect(() => {
    if (!zoom) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoom(false);
      if (photos.length > 1 && event.key === "ArrowLeft") move(-1);
      if (photos.length > 1 && event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoom, photos.length]);
  return <>
    <div className={`local-gallery ${className}`}>
      <button type="button" className="local-gallery-stage" onClick={() => current && setZoom(true)} aria-label={`Open ${product.name} image`}>
        {current ? <img src={current} alt={`${product.name} ${index + 1}`} /> : <span>#{String(product.number).padStart(2, "0")}</span>}
      </button>
      {photos.length > 1 && <><div className="local-gallery-controls"><button type="button" onClick={() => move(-1)} aria-label="Previous image">←</button><span>{index + 1} / {photos.length}</span><button type="button" onClick={() => move(1)} aria-label="Next image">→</button></div><div className="local-gallery-thumbs">{photos.map((photo, photoIndex) => <button type="button" className={photoIndex === index ? "is-active" : ""} key={photo} onClick={() => setIndex(photoIndex)} aria-label={`Show image ${photoIndex + 1}`}><img src={photo} alt="" /></button>)}</div></>}
    </div>
    {zoom && current && <div className="local-lightbox" role="dialog" aria-modal="true" aria-label={product.name} onClick={() => setZoom(false)}><button className="local-lightbox-close" type="button" aria-label="Close image" onClick={() => setZoom(false)}>×</button>{photos.length > 1 && <button className="local-lightbox-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); move(-1); }}>←</button>}<img src={current} alt={`${product.name} ${index + 1}`} onClick={(event) => event.stopPropagation()} />{photos.length > 1 && <button className="local-lightbox-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); move(1); }}>→</button>}</div>}
  </>;
}
