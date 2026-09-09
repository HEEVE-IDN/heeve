import config from "./config.json";
import "./example14.css";
import { useTheme } from "../../hooks/useTheme";
import type { Product, ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

type Props = { navigate: (path: string) => void };

function SolutionCard({
  product,
  slug,
  navigate,
  whatsapp,
}: {
  product: Product;
  slug: string;
  navigate: Props["navigate"];
  whatsapp?: string;
}) {
  const details = () => navigate(`/showcase/${slug}/product/${product.number}`);
  const contact = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hello, I would like to learn about ${product.name}.`)}`
    : undefined;

  return (
    <article className="e14-solution-card">
      <button
        className="e14-solution-image"
        type="button"
        onClick={details}
        aria-label={`View ${product.name}`}
      >
        <img src={product.photoUrls[0]} alt="" />
        <span>{product.category}</span>
      </button>
      <div className="e14-solution-copy">
        <p className="e14-card-kicker">{product.variant}</p>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="e14-card-actions">
          <button type="button" onClick={details}>
            See details
          </button>
          {contact && (
            <a href={contact} target="_blank" rel="noreferrer">
              Talk to us
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Example14({ navigate }: Props) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main
      className="store-example14"
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
      <header className="e14-nav">
        <button
          className="e14-brand"
          type="button"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          {data.owner.name}
          <span aria-hidden="true">✦</span>
        </button>
        <nav aria-label="Main navigation">
          <button type="button" onClick={() => go("solutions")}>
            Solutions
          </button>
          <button type="button" onClick={() => go("company")}>
            Why {data.owner.name}
          </button>
        </nav>
        <button
          className="e14-nav-cta"
          type="button"
          onClick={() => go("contact")}
        >
          Get started
        </button>
      </header>

      <section className="e14-hero" aria-labelledby="e14-title">
        <div className="e14-hero-copy">
          <p className="e14-eyebrow">{data.hero.eyebrow}</p>
          <h1 id="e14-title">{data.headline}</h1>
          <p className="e14-lede">{data.content}</p>
          <div className="e14-actions">
            <button
              className="e14-primary"
              type="button"
              onClick={() => go("solutions")}
            >
              {data.hero.primaryAction}
              <span aria-hidden="true">↗</span>
            </button>
            <button
              className="e14-secondary"
              type="button"
              onClick={() => go("contact")}
            >
              {data.hero.secondaryAction}
            </button>
          </div>
        </div>
        <div className="e14-hero-art" aria-label="{data.showcase.description}">
          <div className="e14-art-panel">
            <div className="e14-panel-top">
              <span>{data.showcase.category}</span>
              <span className="e14-status">{data.showcase.badge}</span>
            </div>
            <strong>{data.hero.title}</strong>
            <div className="e14-approval-row">
              <span className="e14-avatar">AM</span>
              <span>
                <b>{data.products[0].name}</b>
                <small>{data.products[0].variant}</small>
              </span>
              <button
                type="button"
                aria-label="Review campaign production request"
              >
                Review
              </button>
            </div>
            <div className="e14-approval-row">
              <span className="e14-avatar e14-avatar-alt">JL</span>
              <span>
                <b>{data.products[1].name}</b>
                <small>{data.products[1].variant}</small>
              </span>
              <span className="e14-check" aria-label="Policy matched">
                ✓
              </span>
            </div>
          </div>
          <span className="e14-art-note">
            Controls that scale with the team.
          </span>
        </div>
      </section>

      <section
        className="e14-proof"
        id="company"
        aria-labelledby="e14-proof-title"
      >
        <span>BUILT FOR FINANCE TEAMS</span>
        <p id="e14-proof-title">
          One operating view for cards, bills, and the decisions behind them.
        </p>
        <div>
          <b>Cards</b>
          <b>Controls</b>
          <b>Insights</b>
        </div>
      </section>

      <section
        className="e14-solutions"
        id="solutions"
        aria-labelledby="e14-solutions-title"
      >
        <header>
          <p className="e14-eyebrow">A clearer operating layer</p>
          <h2 id="e14-solutions-title">
            Less busywork.
            <br />
            <em>More momentum.</em>
          </h2>
        </header>
        <div className="e14-solutions-grid">
          {data.products
            .filter((product) => !product.hide)
            .map((product) => (
              <SolutionCard
                key={product.number}
                product={product}
                slug={data.slug}
                navigate={navigate}
                whatsapp={data.contactPersonWhatsapp}
              />
            ))}
        </div>
      </section>

      <footer id="contact">
        <div>
          <b className="e14-brand">
            northstar<span aria-hidden="true">✦</span>
          </b>
          <p>Financial clarity for ambitious teams.</p>
        </div>
        <div className="e14-contact">
          <span>Have a question?</span>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
        </div>
      </footer>
    </main>
  );
}
