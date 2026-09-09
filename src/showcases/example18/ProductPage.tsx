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
  const tokens = config.theme[theme];
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hello, I am interested in ${product.name}.`)}`;
  return (
    <main
      className="e18-product"
      style={
        {
          "--bg": tokens.background,
          "--surface": tokens.surface,
          "--text": tokens.text,
          "--muted": tokens.muted,
          "--primary": tokens.primary,
        } as React.CSSProperties
      }
    >
      <header>
        <button
          type="button"
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Back to ${config.owner.name} collection`}
        >
          ← Collection
        </button>
        <b>
          {config.owner.name}
          <span>/ SUPPLY</span>
        </b>
        <span>{String(product.number).padStart(2, "0")}</span>
      </header>
      <div className="e18-product-layout">
        <ProductGallery product={product} className="e18-product-visual" />
        <section aria-labelledby="e18-product-title">
          <p className="e18-eyebrow">
            {product.category} / {product.variant}
          </p>
          <h1 id="e18-product-title">{product.name}</h1>
          <p className="e18-product-description">{product.description}</p>
          <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
          {product.stockOut ? (
            <p className="e18-product-unavailable">Currently unavailable.</p>
          ) : (
            <a href={contact} target="_blank" rel="noreferrer">
              {config.hero.secondaryAction}
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
