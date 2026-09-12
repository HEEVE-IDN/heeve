import { useMemo, useState } from "react";
import type { Product, ShowcaseConfig } from "../../types/showcase";
import "./catalog.css";

type CatalogProps = {
  products: Product[];
  slug: string;
  navigate: (path: string) => void;
  whatsapp: ShowcaseConfig["contactPersonWhatsapp"];
  purchaseLabel: string;
  detailLabel: string;
};

export function Catalog({ products, slug, navigate, whatsapp, purchaseLabel, detailLabel }: CatalogProps) {
  const [category, setCategory] = useState("");
  const visible = products.filter((product) => !product.hide);
  const categories = useMemo(() => [...new Set(visible.map((product) => product.category))], [visible]);
  const shown = category ? visible.filter((product) => product.category === category) : visible;
  const openProduct = (product: Product) => navigate(`/showcase/${slug}/product/${product.number}`);

  return <div className="e28-local-catalog">
    {categories.length > 1 && <div className="e28-local-catalog-filter" aria-label="Product categories">
      <button type="button" className={!category ? "is-active" : ""} onClick={() => setCategory("")}>All</button>
      {categories.map((item) => <button type="button" className={category === item ? "is-active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}
    </div>}
    <div className="e28-local-catalog-grid">
      {shown.map((product) => {
        const message = `Halo, saya tertarik dengan ${product.name}${product.variant ? ` (${product.variant})` : ""}. Harga: Rp ${product.price.toLocaleString("id-ID")} / ${product.unit}.`;
        const purchaseUrl = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : `/showcase/${slug}/product/${product.number}`;
        return <article className="e28-local-product-card" key={product.number}>
          <button type="button" className="e28-local-product-open" onClick={() => openProduct(product)} aria-label={`${detailLabel} ${product.name}`}>
            <span className="e28-local-product-art">{product.photoUrls[0] ? <img src={product.photoUrls[0]} alt={product.name} /> : <span>{String(product.number).padStart(2, "0")}</span>}</span>
            <span className="e28-local-product-copy"><small>{product.category} · {product.unit}</small><strong>{product.name}</strong>{product.variant && <em>{product.variant}</em>}<span>{product.description}</span></span>
          </button>
          <div className="e28-local-product-actions">
            <a href={purchaseUrl} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined}>{purchaseLabel}</a>
            <button type="button" onClick={() => openProduct(product)}>{detailLabel}</button>
          </div>
        </article>;
      })}
    </div>
  </div>;
}
