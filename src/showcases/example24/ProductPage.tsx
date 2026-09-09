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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hi, I want to learn about ${product.name}.`)}`;

  return (
    <main
      className="e24-product"
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
          className="e24-product-back"
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Back to ${config.owner.name} workflows`}
        >
          ← <span>Back to workflows</span>
        </button>
        <b>
          <span aria-hidden="true">●</span> {config.owner.name}
        </b>
      </header>
      <div className="e24-product-layout">
        <ProductGallery product={product} />
        <section aria-labelledby="e24-product-title">
          <p className="e24-kicker">
            {product.category} / {product.variant}
          </p>
          <h1 id="e24-product-title">{product.name}</h1>
          <p>{product.description}</p>
          <strong>Made for {product.unit}</strong>
          <a href={contact} target="_blank" rel="noreferrer">
            Talk to our team
          </a>
        </section>
      </div>
    </main>
  );
}
