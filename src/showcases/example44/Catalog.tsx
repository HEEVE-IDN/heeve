import type { Product } from "../../types/showcase";

export default function Catalog({ products, slug, navigate, whatsapp, purchaseLabel, detailLabel }: { products: Product[]; slug: string; navigate: (path: string) => void; whatsapp?: string; purchaseLabel: string; detailLabel: string }) {
  return <div className="e44-catalog-grid">{products.filter((product) => !product.hide).map((product) => {
    const contact = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(product.name)}` : "";
    return <article className="e44-card" key={product.number}><img src={product.photoUrls[0]} alt={product.name} /><div><p>{product.category} · {product.variant}</p><h3>{product.name}</h3><p className="e44-card-description">{product.description}</p><strong>{product.price} {product.unit}</strong><div className="e44-card-actions"><button onClick={() => navigate(`/showcase/${slug}/product/${product.number}`)}>{detailLabel}</button>{!product.stockOut && contact && <a href={contact} target="_blank" rel="noreferrer">{purchaseLabel}</a>}</div></div></article>;
  })}</div>;
}
