import type { Product, ShowcaseConfig } from "../../types/showcase";
import Gallery from "./Gallery";

import "./product-page.css";
import { useTheme } from "../../hooks/useTheme";
import type { CSSProperties } from "react";

export default function ProductPage({ config, product, navigate }: { config: ShowcaseConfig; product: Product; navigate: (path: string) => void }) {
  const { theme } = useTheme();
  const tokens = config.theme[theme];
  const contact = config.contactPersonWhatsapp ? `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(product.name)}` : "";
  return <main className="showcase-product e48" style={{ "--bg": tokens.background, "--surface": tokens.surface, "--text": tokens.text, "--muted": tokens.muted, "--primary": tokens.primary } as CSSProperties}>
    <header><button onClick={() => navigate(`/showcase/${config.slug}`)} aria-label={config.hero.secondaryAction}>{config.hero.secondaryAction}</button><strong>{config.title}</strong></header>
    <div className="product-layout"><Gallery product={product} /><section><p className="eyebrow">{product.category} / {product.variant}</p><h1>{product.name}</h1><p>{product.description}</p><strong>{product.unit}</strong>{contact && !product.stockOut && <a href={contact} target="_blank" rel="noreferrer">{config.hero.primaryAction}</a>}</section></div>
  </main>;
}
