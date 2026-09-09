import type { Product, ShowcaseConfig } from "../../types/showcase";
import ProductGallery from "../../components/ProductGallery";
import { useTheme } from "../../hooks/useTheme";
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
  const { theme } = useTheme();
  const t = config.theme[theme];
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hello, I would like to ask about ${product.name}.`)}`;
  return (
    <main
      className="e21-product"
      style={
        {
          "--bg": t.background,
          "--surface": t.surface,
          "--text": t.text,
          "--muted": t.muted,
          "--primary": t.primary,
        } as React.CSSProperties
      }
    >
      <header>
        <button
          type="button"
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Back to ${config.owner.name}`}
        >
          ← Back to notes
        </button>
        <span>
          {config.owner.name.toUpperCase()} /{" "}
          {String(product.number).padStart(2, "0")}
        </span>
      </header>
      <div className="e21-product-layout">
        <ProductGallery product={product} className="e21-product-visual" />
        <section aria-labelledby="e21-product-title">
          <p className="e21-label">
            {product.category} · {product.unit}
          </p>
          <h1 id="e21-product-title">{product.name}</h1>
          <p className="e21-product-variant">{product.variant}</p>
          <p className="e21-product-description">{product.description}</p>
          <strong>
            Rp {product.price.toLocaleString("id-ID")}{" "}
            <small>/ {product.unit}</small>
          </strong>
          {product.stockOut ? (
            <p role="status">Currently unavailable.</p>
          ) : (
            <a href={contact} target="_blank" rel="noreferrer">
              Ask about this note ↗
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
