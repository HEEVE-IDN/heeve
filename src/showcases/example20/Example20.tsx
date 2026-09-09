import config from "./config.json";
import "./example20.css";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { Product, ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

function GatherlyCollection({
  products,
  slug,
  navigate,
  whatsapp,
}: {
  products: Product[];
  slug: string;
  navigate: (path: string) => void;
  whatsapp?: string;
}) {
  const visible = products.filter((product) => !product.hide);
  const contactUrl = (product: Product) =>
    whatsapp
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello, I would like to ask about ${product.name}.`)}`
      : `/showcase/${slug}/product/${product.number}`;

  return (
    <div className="e20-collection">
      <div className="e20-collection-meta">
        <span>{visible.length} essentials</span>
        <span>For rooms, calls, and decisions</span>
      </div>
      <div className="e20-product-list">
        {visible.map((product, index) => (
          <article className="e20-product-card" key={product.number}>
            <button
              className="e20-product-image"
              type="button"
              onClick={() =>
                navigate(`/showcase/${slug}/product/${product.number}`)
              }
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.photoUrls[0]}
                alt={`${product.name}, ${product.variant}`}
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
            <div className="e20-product-info">
              <p className="e20-product-category">
                {product.category} · {product.variant}
              </p>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="e20-product-actions">
                <strong>
                  S$ {product.price.toLocaleString("en-SG")}{" "}
                  <small>/ {product.unit}</small>
                </strong>
                <div>
                  <a
                    href={contactUrl(product)}
                    target={whatsapp ? "_blank" : undefined}
                    rel={whatsapp ? "noreferrer" : undefined}
                  >
                    Ask about it
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/showcase/${slug}/product/${product.number}`)
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Example20({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const tokens = data.theme[theme];
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main
      className="store-example20"
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
      <header className="e20-nav">
        <button
          className="e20-logo"
          type="button"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          {data.owner.name}
          <span>•</span>
        </button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={() => go("essentials")}>
            Essentials
          </button>
          <button type="button" onClick={() => go("principles")}>
            Our approach
          </button>
          <button type="button" onClick={() => go("contact")}>
            Contact
          </button>
        </nav>
        <button
          className="e20-nav-cta"
          type="button"
          onClick={() => go("essentials")}
        >
          Find your flow
        </button>
      </header>

      <section className="e20-hero" aria-labelledby="e20-title">
        <div className="e20-hero-copy">
          <p className="e20-kicker">{data.hero.eyebrow}</p>
          <h1 id="e20-title">{data.headline}</h1>
          <p className="e20-lede">{data.content}</p>
          <div className="e20-actions">
            <button
              className="e20-primary"
              type="button"
              onClick={() => go("essentials")}
            >
              {data.hero.primaryAction}
            </button>
            <button
              className="e20-text-button"
              type="button"
              onClick={() => go("contact")}
            >
              {data.hero.secondaryAction}
            </button>
          </div>
        </div>
        <figure className="e20-hero-art">
          <img
            src={data.image}
            alt="A team gathered around a table during a collaborative meeting"
          />
          <figcaption className="e20-art-note">
            Good work
            <br />
            <strong>needs room.</strong>
          </figcaption>
          <span className="e20-art-index" aria-hidden="true">
            20 / 20
          </span>
        </figure>
      </section>

      <AnimatedContent>
        <section
          className="e20-principles"
          id="principles"
          aria-labelledby="e20-principles-title"
        >
          <p className="e20-kicker">The {data.owner.name} method</p>
          <h2 id="e20-principles-title">
            Less noise.
            <br />
            <em>More presence.</em>
          </h2>
          <p>
            We design the small things around a conversation so people can stay
            with the big things: listening, thinking, and making something
            together.
          </p>
        </section>
      </AnimatedContent>

      <section
        className="e20-catalog"
        id="essentials"
        aria-labelledby="e20-collection-title"
      >
        <header className="e20-section-heading">
          <div>
            <p className="e20-kicker">The collection</p>
            <h2 id="e20-collection-title">Make room for good work.</h2>
          </div>
          <p>
            Selected tools for better meetings.
            <br />
            Clear, calm, considered.
          </p>
        </header>
        <GatherlyCollection
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
        />
      </section>

      <footer id="contact" className="e20-footer">
        <div>
          <p className="e20-kicker">{data.owner.name} studio</p>
          <h2>See you in the room.</h2>
        </div>
        <div>
          <p>{data.companyAddress}</p>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Start a conversation
          </a>
        </div>
      </footer>
    </main>
  );
}
