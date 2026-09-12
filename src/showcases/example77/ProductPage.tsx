import type { Product, ShowcaseConfig } from "../../types/showcase";
import Gallery from "./Gallery";
import { useTheme } from "../../hooks/useTheme";

import "./product-page.css";

type PageConfig = ShowcaseConfig & { ui: Record<string, string> };
export default function ProductPage({ config, product, navigate }: { config: ShowcaseConfig; product: Product; navigate: (path: string) => void }) {
  const data = config as PageConfig;
  const { theme } = useTheme();
  const tokens = data.theme[theme];
  const contact = `https://wa.me/${data.contactPersonWhatsapp}?text=${encodeURIComponent(product.name)}`;
  return <main className="product-example77" style={{ "--bg": tokens.background, "--surface": tokens.surface, "--text": tokens.text, "--muted": tokens.muted, "--primary": tokens.primary } as React.CSSProperties}>
    <header><button onClick={() => navigate(`/showcase/${config.slug}`)} aria-label={data.ui.backAria}>{data.ui.backLabel}</button><strong>{data.owner.name}</strong></header>
    <div className="product-layout"><Gallery product={product} /><section aria-labelledby="product-title"><p className="eyebrow">{product.category} / {product.variant}</p><h1 id="product-title">{product.name}</h1><p>{product.description}</p><strong>{data.ui.unitPrefix} {product.unit}</strong><a href={contact} target="_blank" rel="noreferrer">{data.ui.contactAction}</a></section></div>
  </main>;
}
