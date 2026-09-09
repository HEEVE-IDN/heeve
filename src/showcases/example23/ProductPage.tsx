import type { Product, ShowcaseConfig } from "../../types/showcase";
import ProductGallery from "../../components/ProductGallery";
import "../../components/product-gallery.css";
import "./product-page.css";

export default function ProductPage({
  config,
  product,
  navigate,
}: {
  config: ShowcaseConfig;
  product: Product;
  navigate: (path: string) => void;
}) {
  const contact = config.contactPersonWhatsapp
    ? `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`${product.name} - ${product.variant}`)}`
    : "";
  return (
    <main className="e23-product">
      <header className="e23-product-nav">
        <button
          className="e23-product-back"
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Back to ${config.title}`}
        >
          ← {config.title}
        </button>
        <span>OPEN COLLECTION / {String(product.number).padStart(2, "0")}</span>
      </header>
      <div className="e23-product-layout">
        <ProductGallery product={product} className="e23-product-visual" />
        <section
          className="e23-product-info"
          aria-labelledby="e23-product-title"
        >
          <p className="e23-product-kicker">
            {product.category} · {product.unit}
          </p>
          <h1 id="e23-product-title">{product.name}</h1>
          <p className="e23-product-variant">{product.variant}</p>
          <p>{product.description}</p>
          <strong>Free to explore</strong>
          {product.stockOut ? (
            <p className="e23-product-status">Currently unavailable.</p>
          ) : contact ? (
            <a
              className="e23-product-cta"
              href={contact}
              target="_blank"
              rel="noreferrer"
            >
              Ask the community
            </a>
          ) : null}
        </section>
      </div>
    </main>
  );
}
