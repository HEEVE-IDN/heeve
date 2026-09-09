import { useMemo, useState } from "react";
import config from "./config.json";
import "./example17.css";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { Product, ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

type ProductCardProps = {
  product: Product;
  index: number;
  navigate: (path: string) => void;
};

function ProductCard({ product, index, navigate }: ProductCardProps) {
  const message = `Halo, saya tertarik dengan ${product.name} (${product.variant}). Harga: Rp ${product.price.toLocaleString("id-ID")} / ${product.unit}.`;
  const contactUrl = `https://wa.me/${data.contactPersonWhatsapp}?text=${encodeURIComponent(message)}`;
  const openProduct = () =>
    navigate(`/showcase/${data.slug}/product/${product.number}`);

  return (
    <article className="e17-product-card">
      <button
        className="e17-product-image"
        onClick={openProduct}
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.photoUrls[0]}
          alt={product.name}
          loading={index > 1 ? "lazy" : undefined}
        />
        <span className="e17-product-number">
          {String(product.number).padStart(2, "0")}
        </span>
      </button>
      <div className="e17-product-info">
        <div className="e17-product-meta">
          <span>{product.category}</span>
          <span>{product.variant}</span>
        </div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="e17-product-footer">
          <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
          {product.stockOut ? (
            <span className="e17-stock">Currently unavailable</span>
          ) : (
            <a href={contactUrl} target="_blank" rel="noreferrer">
              Ask about it <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Example17({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  const [category, setCategory] = useState("All objects");
  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  const categories = useMemo(
    () => [
      "All objects",
      ...new Set(
        data.products
          .filter((product) => !product.hide)
          .map((product) => product.category),
      ),
    ],
    [],
  );
  const products = data.products.filter(
    (product) =>
      !product.hide &&
      (category === "All objects" || product.category === category),
  );

  return (
    <main
      className="store-example17"
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
      <header className="e17-nav">
        <button
          className="e17-brand"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          {data.owner.name}
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => go("collection")}>Collection</button>
          <button onClick={() => go("story")}>Materials</button>
          <button onClick={() => go("contact")}>Contact</button>
        </nav>
        <button className="e17-nav-cta" onClick={() => go("collection")}>
          {data.hero.primaryAction} <span aria-hidden="true">↘</span>
        </button>
      </header>

      <section className="e17-hero" aria-labelledby="hero-title">
        <div className="e17-hero-copy">
          <p className="e17-label">{data.hero.eyebrow}</p>
          <h1 id="hero-title">{data.headline}</h1>
          <p>{data.content}</p>
          <button className="e17-primary" onClick={() => go("collection")}>
            {data.hero.primaryAction} <span aria-hidden="true">↘</span>
          </button>
        </div>
        <figure>
          <img
            src={data.image}
            alt="Oak tray and considered home objects in a warm, light-filled room"
          />
          <figcaption>01 / OBJECTS WITH A POINT OF VIEW</figcaption>
        </figure>
      </section>

      <AnimatedContent>
        <section className="e17-story" id="story" aria-labelledby="story-title">
          <div>
            <p className="e17-label">{data.showcase.description}</p>
            <h2 id="story-title">Useful things can still be beautiful.</h2>
          </div>
          <p>
            We choose natural materials, enduring shapes, and the small details
            that make daily rituals feel intentional. Nothing extra. Nothing
            disposable.
          </p>
        </section>
      </AnimatedContent>

      <section
        className="e17-collection"
        id="collection"
        aria-labelledby="collection-title"
      >
        <header className="e17-collection-header">
          <div>
            <p className="e17-label">THE COLLECTION</p>
            <h2 id="collection-title">Objects to live with.</h2>
          </div>
          <a
            href={`mailto:${data.companyEmail}?subject=Product%20recommendation`}
          >
            Need a recommendation <span aria-hidden="true">↗</span>
          </a>
        </header>
        <div
          className="e17-filter-row"
          role="group"
          aria-label="Filter objects by category"
        >
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "is-active" : ""}
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="e17-result-count">
          {products.length} {products.length === 1 ? "object" : "objects"}
        </p>
        <div className="e17-product-grid">
          {products.map((product, index) => (
            <AnimatedContent key={product.number}>
              <ProductCard
                product={product}
                index={index}
                navigate={navigate}
              />
            </AnimatedContent>
          ))}
        </div>
      </section>

      <footer id="contact">
        <div>
          <p className="e17-label">{data.owner.name}</p>
          <h2>Make room for the everyday.</h2>
        </div>
        <div className="e17-contact">
          <p>{data.companyAddress}</p>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Talk to the studio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
