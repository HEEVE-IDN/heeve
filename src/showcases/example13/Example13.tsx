import config from "./config.json";
import "./example13.css";
import { Example13Catalog } from "./Example13Catalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example13({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <main
      className="store-example13"
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
      <header className="e13-nav">
        <button
          className="e13-logo"
          type="button"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          {data.owner.name}
          <span>.</span>
        </button>
        <nav aria-label="Main navigation">
          <button type="button" onClick={() => go("tools")}>
            Products
          </button>
          <button type="button" onClick={() => go("principles")}>
            Our approach
          </button>
          <button type="button" onClick={() => go("contact")}>
            Help
          </button>
        </nav>
        <button
          className="e13-login"
          type="button"
          onClick={() => go("contact")}
        >
          Contact {data.owner.name}
        </button>
      </header>
      <section className="e13-hero" aria-labelledby="e13-hero-title">
        <div className="e13-hero-copy">
          <p className="e13-eyebrow">{data.hero.eyebrow}</p>
          <h1 id="e13-hero-title">{data.headline}</h1>
          <p>{data.content}</p>
          <button
            className="e13-primary"
            type="button"
            onClick={() => go("tools")}
          >
            {data.hero.primaryAction}
          </button>
        </div>
        <div className="e13-hero-art">
          <img src={data.image} alt={data.hero.description} />
        </div>
      </section>
      <section
        className="e13-principles"
        id="principles"
        aria-labelledby="e13-principles-title"
      >
        <div>
          <span className="e13-mark" aria-hidden="true">
            +
          </span>
          <p className="e13-eyebrow">{data.hero.eyebrow}</p>
          <h2 id="e13-principles-title">{data.showcase.description}</h2>
        </div>
        <p>{data.content}</p>
      </section>
      <section
        className="e13-tools"
        id="tools"
        aria-labelledby="e13-tools-title"
      >
        <header>
          <div>
            <p className="e13-eyebrow">WHAT YOU CAN DO</p>
            <h2 id="e13-tools-title">One place for your money.</h2>
          </div>
          <button type="button" onClick={() => go("contact")}>
            {data.hero.secondaryAction}
          </button>
        </header>
        <Example13Catalog
          products={data.products.filter((product) => !product.hide)}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          description={data.showcase.description}
          secondaryAction={data.hero.secondaryAction}
        />
      </section>
      <footer id="contact">
        <div>
          <b className="e13-logo">
            {data.owner.name}
            <span>.</span>
          </b>
          <p>{data.companyAddress}</p>
        </div>
        <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
        <a
          href={`https://wa.me/${data.contactPersonWhatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          {data.hero.secondaryAction}
        </a>
      </footer>
    </main>
  );
}
