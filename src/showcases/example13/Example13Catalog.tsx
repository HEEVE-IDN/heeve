import type { Product } from "../../types/showcase";

type Example13CatalogProps = {
  products: Product[];
  slug: string;
  whatsapp?: string;
  navigate: (path: string) => void;
  description: string;
  secondaryAction: string;
};

export function Example13Catalog({
  products,
  slug,
  whatsapp,
  navigate,
  description,
  secondaryAction,
}: Example13CatalogProps) {
  const contactUrl = (product: Product) =>
    whatsapp
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello ${product.name}, I would like to learn more about this offering.`)}`
      : `/showcase/${slug}/product/${product.number}`;

  return (
    <div className="e13-catalog" aria-label={description}>
      <div className="e13-catalog-meta">
        <span>{products.length} tools</span>
        <span>For life across borders</span>
      </div>
      <div className="e13-tool-grid">
        {products.map((product, index) => (
          <article
            className={`e13-tool e13-tool-${index + 1}`}
            key={product.number}
          >
            <button
              className="e13-tool-image"
              type="button"
              onClick={() =>
                navigate(`/showcase/${slug}/product/${product.number}`)
              }
              aria-label={`Learn more about ${product.name}`}
            >
              <img src={product.photoUrls[0]} alt="" />
            </button>
            <div className="e13-tool-copy">
              <p className="e13-eyebrow">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="e13-tool-variant">{product.variant}</p>
              <p>{product.description}</p>
              <div className="e13-tool-actions">
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/showcase/${slug}/product/${product.number}`)
                  }
                >
                  Learn more
                </button>
                <a
                  href={contactUrl(product)}
                  target={whatsapp ? "_blank" : undefined}
                  rel={whatsapp ? "noreferrer" : undefined}
                >
                  {secondaryAction}
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
