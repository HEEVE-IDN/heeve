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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Hello, I would like to enquire about the ${product.name}.`)}`;
  return (
    <main
      className="e15-product"
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
      <a className="e15-product-skip" href="#product-details">
        Skip to product details
      </a>
      <header>
        <button
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Back to ${config.owner.name} collection`}
        >
          ← <span>Collection</span>
        </button>
        <b>
          {config.owner.name}
          <span>®</span>
        </b>
        <span aria-label={`Object ${product.number}`}>
          {String(product.number).padStart(2, "0")}
        </span>
      </header>
      <div className="e15-product-layout">
        <ProductGallery product={product} />
        <section id="product-details" aria-labelledby="product-title">
          <p className="e15-kicker">
            {product.category} / {product.variant}
          </p>
          <h1 id="product-title">{product.name}</h1>
          <p className="e15-description">{product.description}</p>
          <strong>
            Rp {product.price.toLocaleString("id-ID")}{" "}
            <small>/ {product.unit}</small>
          </strong>
          <a
            className="e15-product-cta"
            href={contact}
            target="_blank"
            rel="noreferrer"
          >
            Make an enquiry <span aria-hidden="true">↗</span>
          </a>
          <p className="e15-note">
            Crafted to order. Shipping and lead times confirmed at enquiry.
          </p>
        </section>
      </div>
    </main>
  );
}
