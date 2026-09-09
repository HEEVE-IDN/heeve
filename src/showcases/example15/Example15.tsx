import config from "./config.json";
import "./example15.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { BlurText } from "../../components/react-bits/BlurText";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
import { EditorialStatement } from "./EditorialStatement";

const data = config as ShowcaseConfig;

export default function Example15({
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
      className="store-example15"
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
      <a className="e15-skip" href="#collection">
        Skip to collection
      </a>
      <header className="e15-nav">
        <button
          className="e15-wordmark"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          {data.owner.name}
          <span>®</span>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => go("collection")}>Collection</button>
          <button onClick={() => go("studio")}>Studio</button>
        </nav>
        <button className="e15-contact" onClick={() => go("contact")}>
          Enquire <span aria-hidden="true">↗</span>
        </button>
      </header>

      <section className="e15-hero" aria-labelledby="e15-hero-title">
        <img src={data.image} alt="Lounge chair in a warm, quiet interior" />
        <div className="e15-hero-copy">
          <p className="e15-kicker">{data.hero.eyebrow}</p>
          <h1 id="e15-hero-title">
            <BlurText>{data.headline}</BlurText>
          </h1>
          <p>{data.content}</p>
          <button className="e15-hero-action" onClick={() => go("collection")}>
            {data.hero.primaryAction} <span aria-hidden="true">↓</span>
          </button>
        </div>
        <p
          className="e15-index"
          aria-label="Collection introduction, page 1 of 4"
        >
          01 <span>/</span> 04
        </p>
      </section>

      <EditorialStatement
        label={data.showcase.badge}
        title={data.hero.title}
        body={data.showcase.description}
      />

      <section
        className="e15-collection"
        id="collection"
        aria-labelledby="e15-collection-title"
      >
        <header>
          <div>
            <p className="e15-kicker">THE COLLECTION</p>
            <h2 id="e15-collection-title">Selected forms</h2>
          </div>
          <button onClick={() => go("contact")}>
            Need help choosing? <span aria-hidden="true">↗</span>
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Enquire"
          detailLabel="View object"
          variant="editorial"
          countLabel="objects"
        />
      </section>

      <footer id="contact">
        <div className="e15-footer-intro">
          <b>
            {data.owner.name}
            <span>®</span>
          </b>
          <p>{data.showcase.description}</p>
        </div>
        <div className="e15-footer-contact">
          <p className="e15-kicker">CONTACT</p>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Start an enquiry <span aria-hidden="true">↗</span>
          </a>
        </div>
        <small>© 2025 {data.owner.name}</small>
      </footer>
    </main>
  );
}
