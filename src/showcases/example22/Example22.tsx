import config from "./config.json";
import "./example22.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
import { ResearchPrinciples } from "./ResearchPrinciples";

const data = config as ShowcaseConfig;

export default function Example22({
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
      className="store-example22"
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
      <header className="e22-nav">
        <button
          className="e22-wordmark"
          onClick={() => navigate("/")}
          aria-label="Back to showcases"
        >
          {data.owner.name}
          <span aria-hidden="true">•</span>
        </button>
        <nav aria-label="Primary navigation">
          <button onClick={() => go("discover")}>Discover</button>
          <button onClick={() => go("about")}>Why {data.owner.name}</button>
        </nav>
        <button className="e22-nav-cta" onClick={() => go("discover")}>
          Ask a question
        </button>
      </header>

      <section className="e22-hero" aria-labelledby="hero-title">
        <div className="e22-hero-copy">
          <p className="e22-eyebrow">{data.hero.eyebrow}</p>
          <h1 id="hero-title">{data.hero.title}</h1>
          <p className="e22-lede">{data.hero.description}</p>
          <div className="e22-actions">
            <button className="e22-primary" onClick={() => go("discover")}>
              {data.hero.primaryAction}
            </button>
            <button className="e22-secondary" onClick={() => go("about")}>
              {data.hero.secondaryAction}
            </button>
          </div>
        </div>
        <figure className="e22-research-card">
          <img src={data.image} alt="Open book and notes on a research desk" />
          <figcaption>
            <span className="e22-source-mark" aria-hidden="true">
              P
            </span>
            <span>
              <b>Research, made readable.</b>
              <small>Start with a question. Follow the sources.</small>
            </span>
          </figcaption>
        </figure>
      </section>

      <AnimatedContent>
        <ResearchPrinciples
          label={data.showcase.badge}
          title={data.hero.title}
          principles={data.products.slice(0, 3).map((product) => ({
            name: product.category,
            description: product.description,
          }))}
        />
      </AnimatedContent>

      <section
        className="e22-discover"
        id="discover"
        aria-labelledby="discover-title"
      >
        <header>
          <div>
            <p className="e22-eyebrow">TODAY'S EXPLORATIONS</p>
            <h2 id="discover-title">Go a little deeper.</h2>
          </div>
          <button onClick={() => go("discover-list")}>View all topics</button>
        </header>
        <div id="discover-list">
          <ShowcaseCatalog
            products={data.products}
            slug={data.slug}
            navigate={navigate}
            whatsapp={data.contactPersonWhatsapp}
            purchaseLabel="Explore"
            detailLabel="Read brief"
            variant="editorial"
            countLabel="briefs"
          />
        </div>
      </section>

      <footer id="contact">
        <div>
          <b>
            {data.owner.name}
            <span aria-hidden="true">•</span>
          </b>
          <p>{data.subtitle}</p>
        </div>
        <div>
          <a href={data.twitterX} target="_blank" rel="noreferrer">
            Follow along
          </a>
          <a href={`mailto:${data.companyEmail}`}>Contact</a>
        </div>
      </footer>
    </main>
  );
}
