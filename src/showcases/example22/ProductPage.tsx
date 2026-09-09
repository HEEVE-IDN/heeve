import config from "./config.json";
import type { Product, ShowcaseConfig } from "../../types/showcase";
import ProductGallery from "../../components/ProductGallery";
import { useTheme } from "../../hooks/useTheme";
import "../../components/product-gallery.css";
import "./product-page.css";

const data = config as ShowcaseConfig;

export default function ProductPage({
  config: pageConfig,
  product,
  navigate,
}: {
  config: ShowcaseConfig;
  product: Product;
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  return (
    <main
      className="e22-product"
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
          className="e22-product-back"
          onClick={() => navigate(`/showcase/${pageConfig.slug}`)}
          aria-label="Back to discoveries"
        >
          Back to discoveries
        </button>
        <b>
          {pageConfig.owner.name}
          <span aria-hidden="true">•</span>
        </b>
      </header>
      <div className="e22-product-layout">
        <ProductGallery product={product} />
        <section aria-labelledby="product-title">
          <p className="e22-product-kicker">
            {product.category} · {product.variant}
          </p>
          <h1 id="product-title">{product.name}</h1>
          <p>{product.description}</p>
          <strong>Free to explore</strong>
          <button
            className="e22-product-cta"
            onClick={() => navigate(`/showcase/${pageConfig.slug}`)}
          >
            Explore more briefs
          </button>
        </section>
      </div>
    </main>
  );
}
