import config from "./config.json";
import "./example18.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
import { StoryHighlights } from "./StoryHighlights";

const data = config as ShowcaseConfig;

export default function Example18({
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
      className="store-example18"
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
      <header className="e18-nav">
        <button
          className="e18-mark"
          onClick={() => navigate("/")}
          aria-label="Back to showcases"
        >
          {data.owner.name}
          <span>/ SUPPLY</span>
        </button>
        <nav aria-label="Main navigation">
          <button type="button" onClick={() => go("collection")}>
            Collection
          </button>
          <button type="button" onClick={() => go("story")}>
            {data.hero.secondaryAction}
          </button>
        </nav>
        <button
          type="button"
          className="e18-nav-cta"
          onClick={() => go("collection")}
        >
          View kit
        </button>
      </header>

      <section className="e18-hero">
        <div className="e18-hero-copy">
          <p className="e18-eyebrow">{data.hero.eyebrow}</p>
          <h1>{data.headline}</h1>
          <p className="e18-lede">{data.content}</p>
          <div className="e18-hero-actions">
            <button
              type="button"
              className="e18-primary"
              onClick={() => go("collection")}
            >
              {data.hero.primaryAction}
            </button>
            <button
              type="button"
              className="e18-secondary"
              onClick={() => go("story")}
            >
              {data.hero.secondaryAction}
            </button>
          </div>
        </div>
        <figure className="e18-hero-art">
          <img src={data.image} alt="Open road through a mountain landscape" />
          <figcaption>
            <span>NO. 018</span>
            <span>THE SCENIC ROUTE</span>
          </figcaption>
        </figure>
      </section>

      <StoryHighlights
        label={data.showcase.title}
        title={data.hero.title}
        description={data.showcase.description}
        highlights={data.products.slice(0, 3).map((product) => product.category)}
      />

      <section
        className="e18-collection"
        id="collection"
        aria-labelledby="e18-collection-title"
      >
        <header>
          <div>
            <p className="e18-eyebrow">THE CURRENT LOADOUT</p>
            <h2 id="e18-collection-title">Take what you need.</h2>
          </div>
          <button type="button" onClick={() => go("contact")}>
            Need a recommendation?
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Ask about it"
          detailLabel="View details"
          variant="editorial"
          countLabel="items"
        />
      </section>

      <footer id="contact">
        <div>
          <b>
            {data.owner.name}
            <span>/ SUPPLY</span>
          </b>
          <p>{data.companyAddress}</p>
        </div>
        <p>{data.subtitle}</p>
        <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
      </footer>
    </main>
  );
}
