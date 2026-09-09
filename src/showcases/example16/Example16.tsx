import config from "./config.json";
import "./example16.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example16({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const style = {
    "--bg": t.background,
    "--surface": t.surface,
    "--text": t.text,
    "--muted": t.muted,
    "--primary": t.primary,
  } as React.CSSProperties;

  return (
    <main className="store-example16" style={style}>
      <header className="e16-nav">
        <button
          className="e16-logo"
          type="button"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          {data.owner.name}
          {data.owner.name}
          <span aria-hidden="true">●</span>
        </button>
        <nav aria-label="Primary navigation">
          <button type="button" onClick={() => go("platform")}>
            Platform
          </button>
          <button type="button" onClick={() => go("solutions")}>
            Solutions
          </button>
          <button type="button" onClick={() => go("contact")}>
            Contact
          </button>
        </nav>
        <button
          className="e16-demo"
          type="button"
          onClick={() => go("contact")}
        >
          Book a demo <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="e16-hero" aria-labelledby="e16-hero-title">
        <div className="e16-hero-copy">
          <p className="e16-eyebrow">{data.hero.eyebrow}</p>
          <h1 id="e16-hero-title">{data.headline}</h1>
          <p>{data.content}</p>
          <div className="e16-actions">
            <button
              className="e16-primary"
              type="button"
              onClick={() => go("contact")}
            >
              {data.hero.primaryAction} <span aria-hidden="true">↗</span>
            </button>
            <button
              className="e16-link"
              type="button"
              onClick={() => go("platform")}
            >
              {data.hero.secondaryAction} <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
        <div className="e16-hero-art">
          <img
            src={data.image}
            alt="Finance team reviewing spending together"
          />
          <div
            className="e16-float-card"
            aria-label={data.showcase.description}
          >
            <span>{data.hero.eyebrow}</span>
            <strong>{data.headline}</strong>
            <small>{data.content}</small>
          </div>
        </div>
      </section>

      <section className="e16-proof" aria-label="Platform capabilities">
        <p>{data.showcase.description}</p>
        <div>
          {data.products.slice(0, 4).map((product) => (
            <b key={product.number}>{product.category}</b>
          ))}
        </div>
      </section>

      <section
        className="e16-platform"
        id="platform"
        aria-labelledby="e16-platform-title"
      >
        <div>
          <p className="e16-eyebrow">{data.showcase.category}</p>
          <h2 id="e16-platform-title">{data.hero.secondaryAction}</h2>
        </div>
        <p>{data.content}</p>
      </section>

      <section
        className="e16-solutions"
        id="solutions"
        aria-labelledby="e16-solutions-title"
      >
        <header>
          <div>
            <p className="e16-eyebrow">{data.showcase.badge}</p>
            <h2 id="e16-solutions-title">{data.showcase.title}</h2>
          </div>
          <button
            className="e16-link"
            type="button"
            onClick={() => go("contact")}
          >
            Talk to sales <span aria-hidden="true">↗</span>
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Talk to sales"
          detailLabel="Learn more"
          variant="editorial"
          countLabel="solutions"
        />
      </section>

      <footer id="contact">
        <div>
          <b className="e16-logo">
            {data.owner.name}
            <span aria-hidden="true">●</span>
          </b>
          <p>{data.subtitle}</p>
        </div>
        <div>
          <p className="e16-eyebrow">{data.hero.eyebrow}</p>
          <h2>{data.hero.title}</h2>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Book a demo <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </main>
  );
}
