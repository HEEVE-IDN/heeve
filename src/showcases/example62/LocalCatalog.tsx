import { useMemo, useState } from "react";
import type { Product, ShowcaseConfig } from "../../types/showcase";

type Props = {
  products: Product[];
  slug: string;
  navigate: (path: string) => void;
  whatsapp?: ShowcaseConfig["contactPersonWhatsapp"];
  purchaseLabel?: string;
  detailLabel?: string;
  countLabel?: string;
  variant?: "editorial";
};

export function LocalCatalog({ products, slug, navigate, whatsapp, purchaseLabel = "Purchase", detailLabel = "Details", countLabel = "Products" }: Props) {
  const [category, setCategory] = useState("");
  const visible = products.filter((product) => !product.hide);
  const categories = useMemo(() => [...new Set(visible.map((product) => product.category))], [visible]);
  const listed = category ? visible.filter((product) => product.category === category) : visible;
  const productPath = (product: Product) => `/showcase/${slug}/product/${product.number}`;
  const whatsappUrl = (product: Product) => whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Halo, saya tertarik dengan ${product.name}${product.variant ? ` (${product.variant})` : ""}. Harga: Rp ${product.price.toLocaleString("id-ID")} / ${product.unit}.`)}` : productPath(product);

  return <div className="showcase-catalog catalog-editorial">
    <div className="catalog-toolbar">
      <span className="catalog-count">{listed.length} {countLabel}</span>
      <div className="category-filter" aria-label={countLabel}>
        <button type="button" className={!category ? "active" : ""} onClick={() => setCategory("")}>All</button>
        {categories.map((item) => <button type="button" className={category === item ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
    </div>
    <div className="showcase-catalog-grid editorial">
      {listed.map((product) => <article className="showcase-product showcase-product-editorial" key={product.number}>
        <button type="button" className="showcase-product-art" onClick={() => navigate(productPath(product))} aria-label={`${detailLabel} ${product.name}`}>
          {product.photoUrls[0] ? <img src={product.photoUrls[0]} alt={product.name} /> : <b>{String(product.number).padStart(2, "0")}</b>}
          <em>{product.stockOut ? "×" : "✓"}</em>
        </button>
        <div className="showcase-product-copy">
          <p className="eyebrow">{product.category} · {product.unit}</p><h3>{product.name}</h3>
          {product.variant && <small>{product.variant}</small>}<p>{product.description}</p>
          <div className="showcase-product-footer"><strong>Rp {product.price.toLocaleString("id-ID")}</strong><div className="showcase-product-actions">
            {!product.stockOut && <a className="whatsapp-cta" href={whatsappUrl(product)} target={whatsapp ? "_blank" : undefined} rel={whatsapp ? "noreferrer" : undefined}>{purchaseLabel}</a>}
            <button type="button" className="product-detail-link" onClick={() => navigate(productPath(product))}>{detailLabel}</button>
          </div></div>
        </div>
      </article>)}
    </div>
  </div>;
}
