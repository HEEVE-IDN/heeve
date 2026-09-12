import { useEffect, useState } from "react";
import type { Product } from "../types/showcase";

export default function ProductGallery({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const photos = product.photoUrls.length ? product.photoUrls : [];
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const current = photos[index];
  const move = (step: number) =>
    setIndex((value) => (value + step + photos.length) % photos.length);
  useEffect(() => {
    if (!zoom || photos.length < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Escape") setZoom(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [zoom, photos.length]);

  return (
    <>
      <div className={`product-gallery ${className}`}>
        <div
          className="product-gallery-stage"
          onClick={() => current && setZoom(true)}
          role={current ? "button" : undefined}
          tabIndex={current ? 0 : undefined}
          aria-label={current ? `Open ${product.name} image` : undefined}
          onKeyDown={(event) => {
            if ((event.key === "Enter" || event.key === " ") && current) {
              event.preventDefault();
              setZoom(true);
            }
          }}
        >
          {current ? (
            <img src={current} alt={`${product.name} ${index + 1}`} />
          ) : (
            <span>#{String(product.number).padStart(2, "0")}</span>
          )}
        </div>
        {photos.length > 1 && (
          <div className="product-gallery-controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Previous image"
            >
              ←
            </button>
            <span>
              {index + 1} / {photos.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Next image"
            >
              →
            </button>
          </div>
        )}
        {photos.length > 1 && (
          <div className="product-gallery-thumbs">
            {photos.map((photo, photoIndex) => (
              <button
                type="button"
                className={photoIndex === index ? "is-active" : ""}
                key={photo}
                onClick={() => setIndex(photoIndex)}
              >
                <img src={photo} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
      {zoom && current && (
        <div
          className="product-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
          onClick={() => setZoom(false)}
        >
          <button
            className="product-lightbox-close"
            type="button"
            aria-label="Close image"
            onClick={() => setZoom(false)}
          >
            ×
          </button>
          {photos.length > 1 && (
            <button
              className="product-lightbox-prev"
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                move(-1);
              }}
            >
              ←
            </button>
          )}
          <img
            src={current}
            alt={`${product.name} ${index + 1}`}
            onClick={(event) => event.stopPropagation()}
          />
          {photos.length > 1 && (
            <button
              className="product-lightbox-next"
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                move(1);
              }}
            >
              →
            </button>
          )}
          <span className="product-lightbox-count">
            {index + 1} / {photos.length}
          </span>
        </div>
      )}
    </>
  );
}
