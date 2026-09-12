import type { Product } from "../../types/showcase";

type CatalogProps = {
  products: Product[];
  slug: string;
  navigate: (path: string) => void;
  whatsapp?: string;
  purchaseLabel: string;
  detailLabel: string;
};

export default function Catalog({ products, slug, navigate, whatsapp, purchaseLabel, detailLabel }: CatalogProps) {
  const visible = products.filter((product) => !product.hide);
  return <div className="local-catalog" aria-live="polite">
    {visible.map((product) => {
      const contact = `https://wa.me/${whatsapp}?text=${encodeURIComponent(product.name)}`;
      return <article className="local-card" key={product.number}>
        <img src={product.photoUrls[0]} alt={product.name} loading="lazy" />
        <div className="local-card-copy"><p>{product.category}</p><h3>{product.name}</h3><span>{product.variant}</span><p className="local-card-description">{product.description}</p><div className="local-card-actions"><button type="button" onClick={() => navigate(`/showcase/${slug}/product/${product.number}`)}>{detailLabel}</button>{!product.stockOut && whatsapp && <a href={contact} target="_blank" rel="noreferrer">{purchaseLabel}</a>}</div></div>
      </article>;
    })}
  </div>;
}
