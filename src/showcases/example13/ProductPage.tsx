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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hello ${product.name}, I would like to learn more about this offering.`)}`;
  return (
    <main
      className="e13-product"
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
          aria-label={`Back to ${config.owner.name} products`}
        >
          ← Back to products
        </button>
        <b className="e13-logo">
          {config.owner.name}
          <span>.</span>
        </b>
      </header>
      <div className="e13-product-layout">
        <ProductGallery product={product} />
        <section aria-labelledby="e13-product-title">
          <p className="e13-eyebrow">
            {product.category} · {product.unit}
          </p>
          <h1 id="e13-product-title">{product.name}</h1>
          <p className="e13-variant">{product.variant}</p>
          <p>{product.description}</p>
          <strong>{config.subtitle}</strong>
          <a href={contact} target="_blank" rel="noreferrer">
            {config.hero.secondaryAction}
          </a>
        </section>
      </div>
    </main>
  );
}
