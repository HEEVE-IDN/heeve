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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hello, I would like to learn about ${product.name}.`)}`;
  return (
    <main
      className="e14-product"
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
          aria-label={`Back to ${config.owner.name} solutions`}
        >
          ← All solutions
        </button>
        <b className="e14-brand">
          {config.owner.name}
          <span aria-hidden="true">✦</span>
        </b>
      </header>
      <div className="e14-product-body">
        <ProductGallery product={product} />
        <section aria-labelledby="e14-product-title">
          <p className="e14-eyebrow">
            {product.category} · {product.variant}
          </p>
          <h1 id="e14-product-title">{product.name}</h1>
          <p>{product.description}</p>
          <strong>{config.showcase.description}</strong>
          <a href={contact} target="_blank" rel="noreferrer">
            {config.hero.secondaryAction}
          </a>
        </section>
      </div>
    </main>
  );
}
