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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hi, I'd like to learn about ${product.name}.`)}`;
  return (
    <main className="e16-product">
      <header>
        <button
          type="button"
          onClick={() => navigate(`/showcase/${config.slug}`)}
        >
          ← Back to {config.showcase.title}
        </button>
        <b className="e16-logo">
          {config.owner.name}
          <span aria-hidden="true">●</span>
        </b>
      </header>
      <div>
        <ProductGallery product={product} />
        <section aria-labelledby="e16-product-title">
          <p className="e16-eyebrow">
            {product.category} · {product.variant}
          </p>
          <h1 id="e16-product-title">{product.name}</h1>
          <p>{product.description}</p>
          <strong>{config.hero.secondaryAction}</strong>
          <a href={contact} target="_blank" rel="noreferrer">
            {config.hero.primaryAction} <span aria-hidden="true">↗</span>
          </a>
        </section>
      </div>
    </main>
  );
}
