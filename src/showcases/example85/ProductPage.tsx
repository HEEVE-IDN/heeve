import config from "./config.json";
import Gallery from "./Gallery";
import { useTheme } from "../../hooks/useTheme";
import type { Product, ShowcaseConfig } from "../../types/showcase";

import "./product-page.css";
const data = config as ShowcaseConfig & Record<string, any>;
const productContact = data.productContact as { prefix: string; back: string; action: string; currency: string; locale: string };
export default function ProductPage({ config: provided, product, navigate }: { config: ShowcaseConfig; product: Product; navigate: (path: string) => void }) {
  const { theme } = useTheme(); const t = (provided || data).theme[theme]; const source = provided || data;
  const contact = `https://wa.me/${source.contactPersonWhatsapp}?text=${encodeURIComponent(`${productContact.prefix} ${product.name}.`)}`;
  return <main className="product-example85" style={{ "--bg": t.background, "--surface": t.surface, "--text": t.text, "--muted": t.muted, "--primary": t.primary } as React.CSSProperties}><header><button type="button" onClick={() => navigate(`/showcase/${source.slug}`)}>{productContact.back}</button><b>{source.owner.name}</b></header><div className="product-layout"><Gallery product={product} /><section aria-labelledby="product-title"><p className="eyebrow">{product.category} / {product.variant}</p><h1 id="product-title">{product.name}</h1><p className="product-description">{product.description}</p><strong>{productContact.currency} {product.price.toLocaleString(productContact.locale)} <small>/ {product.unit}</small></strong><a href={contact} target="_blank" rel="noreferrer">{productContact.action}</a></section></div></main>;
}
