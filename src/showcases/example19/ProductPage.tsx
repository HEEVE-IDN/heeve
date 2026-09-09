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
  const contact = config.contactPersonWhatsapp
    ? `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`I'd like to join ${product.name}.`)}`
    : "";
  return (
    <main
      className="showcase-product-page product-page-e19"
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
          className="e19-product-back"
          onClick={() => navigate(`/showcase/${config.slug}`)}
        >
          ← Back to {config.owner.name}
        </button>
        <span>SPACE / {String(product.number).padStart(2, "0")}</span>
      </header>
      <div className="e19-product-layout">
        <ProductGallery product={product} className="e19-product-visual" />
        <section
          className="e19-product-info"
          aria-labelledby="e19-product-title"
        >
          <p className="e19-product-kicker">
            {product.category} · {product.variant}
          </p>
          <h1 id="e19-product-title">{product.name}</h1>
          <p>{product.description}</p>
          <strong>Free to join</strong>
          {product.stockOut ? (
            <p className="e19-product-status">
              This space is not accepting new members right now.
            </p>
          ) : contact ? (
            <a href={contact} target="_blank" rel="noreferrer">
              Join the conversation
            </a>
          ) : null}
        </section>
      </div>
    </main>
  );
}
