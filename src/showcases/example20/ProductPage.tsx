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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hello, I would like to ask about ${product.name}.`)}`;
  return (
    <main
      className="e20-product"
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
          Back to collection
        </button>
        <b aria-label={`${config.owner.name} home`}>
          {config.owner.name}
          <span>•</span>
        </b>
      </header>
      <div className="e20-product-layout">
        <ProductGallery product={product} />
        <section aria-labelledby="e20-product-title">
          <p className="e20-product-kicker">
            {product.category} / {product.variant}
          </p>
          <h1 id="e20-product-title">{product.name}</h1>
          <p>{product.description}</p>
          <strong>
            S$ {product.price.toLocaleString("en-SG")}{" "}
            <small>/ {product.unit}</small>
          </strong>
          <a href={contact} target="_blank" rel="noreferrer">
            Ask about this essential
          </a>
        </section>
      </div>
    </main>
  );
}
