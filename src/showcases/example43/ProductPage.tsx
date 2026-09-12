import type { Product, ShowcaseConfig } from "../../types/showcase";
import Gallery from "./Gallery";
import { useTheme } from "../../hooks/useTheme";

import "./product-page.css";
export default function ProductPage({ config, product, navigate }: { config: ShowcaseConfig; product: Product; navigate: (path: string) => void }) {
 const { theme } = useTheme(); const t=config.theme[theme]; const contact=`https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(product.name)}`;
 return <main className="product-showcase" style={{"--bg":t.background,"--surface":t.surface,"--text":t.text,"--muted":t.muted,"--primary":t.primary} as React.CSSProperties}><header><button onClick={()=>navigate(`/showcase/${config.slug}`)} aria-label={config.title}>{config.owner.name}</button><span>{config.showcase.category}</span></header><div className="product-layout"><Gallery product={product}/><section><p>{product.category} / {product.variant}</p><h1>{product.name}</h1><p>{product.description}</p><strong>{product.unit}</strong>{product.stockOut?<p>{config.hero.secondaryAction}</p>:<a href={contact} target="_blank" rel="noreferrer">{config.hero.primaryAction}</a>}</section></div></main>;
}
