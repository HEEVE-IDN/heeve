import { useState } from "react";
import type { Product, ShowcaseConfig } from "../../types/showcase";
import "./product-page.css";
import { useTheme } from "../../hooks/useTheme";
import type { CSSProperties } from "react";

function Gallery({ product }: { product: Product }) {
  const [index, setIndex] = useState(0); const [open, setOpen] = useState(false); const photos = product.photoUrls; const photo = photos[index];
  const move = (step: number) => setIndex((value) => (value + step + photos.length) % photos.length);
  return <><div className="e57-gallery"><button className="e57-gallery-image" onClick={() => photo && setOpen(true)} aria-label={product.name}>{photo ? <img src={photo} alt={product.name} /> : <span>{product.number}</span>}</button>{photos.length > 1 && <div className="e57-gallery-controls"><button onClick={() => move(-1)} aria-label="Previous image">‹</button><span>{index + 1} / {photos.length}</span><button onClick={() => move(1)} aria-label="Next image">›</button></div>}</div>{open && photo && <div className="e57-lightbox" role="dialog" aria-modal="true" aria-label={product.name} onClick={() => setOpen(false)} onKeyDown={(event) => event.key === "Escape" && setOpen(false)}><button autoFocus onClick={() => setOpen(false)} aria-label="Close image">×</button><img src={photo} alt={product.name} onClick={(event) => event.stopPropagation()} /></div>}</>;
}
export default function ProductPage({ config, product, navigate }: { config: ShowcaseConfig; product: Product; navigate: (path: string) => void }) {
  const { theme } = useTheme(); const tokens = config.theme[theme]; const contact = config.contactPersonWhatsapp ? `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(product.name)}` : "";
  return <main className="showcase-product e57" style={{ "--bg": tokens.background, "--surface": tokens.surface, "--text": tokens.text, "--muted": tokens.muted, "--primary": tokens.primary } as CSSProperties}><header><button onClick={() => navigate(`/showcase/${config.slug}`)} aria-label={config.hero.secondaryAction}>{config.hero.secondaryAction}</button><strong>{config.title}</strong></header><div className="product-layout"><Gallery product={product} /><section><p className="eyebrow">{product.category} / {product.variant}</p><h1>{product.name}</h1><p>{product.description}</p><strong>{product.price.toLocaleString("id-ID")} {product.unit}</strong>{contact && !product.stockOut && <a href={contact} target="_blank" rel="noreferrer">{config.hero.primaryAction}</a>}</section></div></main>;
}
