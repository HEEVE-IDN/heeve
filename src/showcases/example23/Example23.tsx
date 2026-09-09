import config from "./config.json";
import "./example23.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { ShowcaseInfo } from "../../components/ShowcaseInfo";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
import { CommunityFeature } from "./CommunityFeature";

const data = config as ShowcaseConfig;

export default function Example23({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const tokens = data.theme[theme];
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <main
      className="store-example23"
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
      <header className="e23-nav">
        <button
          className="e23-brand"
          onClick={() => navigate("/")}
          aria-label="Return to the HEEVE home page"
        >
          <span className="e23-brand-mark" aria-hidden="true">
            HF
          </span>
          <span>{data.owner.name}</span>
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => scrollTo("hub")}>Explore</button>
          <button onClick={() => scrollTo("about")}>Our community</button>
        </nav>
        <button className="e23-nav-cta" onClick={() => scrollTo("hub")}>
          Explore the hub
        </button>
      </header>

      <section
        className="e23-hero"
        id="overview"
        aria-labelledby="e23-hero-title"
      >
        <div className="e23-hero-copy">
          <p className="e23-eyebrow">{data.hero.eyebrow}</p>
          <h1 id="e23-hero-title">{data.hero.title}</h1>
          <p>{data.hero.description}</p>
          <div className="e23-actions">
            <button className="e23-primary" onClick={() => scrollTo("hub")}>
              {data.hero.primaryAction}
            </button>
            <button className="e23-secondary" onClick={() => scrollTo("about")}>
              {data.hero.secondaryAction}
            </button>
          </div>
          <p className="e23-note">
            Models, datasets, and demos shared in the open.
          </p>
        </div>
        <figure className="e23-hero-art">
          <img
            src={data.image}
            alt="People collaborating around a laptop in an open workspace"
          />
          <figcaption>
            <strong>Built together</strong>
            <span>Open source AI starts with people.</span>
          </figcaption>
        </figure>
      </section>

      <section className="e23-hub" id="hub" aria-labelledby="e23-hub-title">
        <CommunityFeature
          label={data.showcase.category}
          title={data.showcase.title}
          description={data.showcase.description}
          action={data.hero.secondaryAction}
          onAction={() => scrollTo("about")}
        />
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Explore"
          detailLabel="Open"
          variant="editorial"
          countLabel="resources"
        />
      </section>
      <ShowcaseInfo config={data} />
    </main>
  );
}
