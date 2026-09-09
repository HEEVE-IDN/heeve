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
      className="e17-product"
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
      <header className="e17-product-header">
        <button
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Back to ${config.owner.name} collection`}
        >
          ← <span>Back to collection</span>
        </button>
        <button
          className="e17-product-brand"
          onClick={() => navigate("/")}
          aria-label={`${config.owner.name} home`}
        >
          {config.owner.name}
        </button>
      </header>
      <div className="e17-product-layout">
        <div className="e17-product-gallery">
          <ProductGallery product={product} />
        </div>
        <section className="e17-product-copy" aria-labelledby="product-title">
          <p className="e17-product-kicker">
            {product.category} / {product.variant}
          </p>
          <h1 id="product-title">{product.name}</h1>
          <p className="e17-product-description">{product.description}</p>
          <div className="e17-product-price">
            <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
            <span>per {product.unit}</span>
          </div>
          {product.stockOut ? (
            <p className="e17-product-unavailable">
              Currently unavailable. Contact the studio for restock timing.
            </p>
          ) : (
            <a
              className="e17-product-cta"
              href={contact}
              target="_blank"
              rel="noreferrer"
            >
              Ask about this object <span aria-hidden="true">↗</span>
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
