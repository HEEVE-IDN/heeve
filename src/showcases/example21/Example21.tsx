import config from "./config.json";
import "./example21.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example21({
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
      className="store-example21"
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
      <a className="e21-skip-link" href="#studies">
        Skip to studies
      </a>
      <header className="e21-nav">
        <button
          className="e21-brand"
          type="button"
          onClick={() => navigate("/")}
          aria-label="Return to showcases"
        >
          <span>FIELD</span>
          <b>NOTES</b>
        </button>
        <nav aria-label="Main navigation">
          <button type="button" onClick={() => go("studies")}>
            Studies
          </button>
          <button type="button" onClick={() => go("approach")}>
            Approach
          </button>
          <button type="button" onClick={() => go("contact")}>
            Contact
          </button>
        </nav>
        <button
          className="e21-nav-cta"
          type="button"
          onClick={() => go("contact")}
        >
          Work with us
        </button>
      </header>
      <section className="e21-hero" aria-labelledby="e21-title">
        <div className="e21-hero-copy">
          <p className="e21-label">{data.hero.eyebrow}</p>
          <h1 id="e21-title">{data.hero.title}</h1>
          <p className="e21-intro">{data.hero.description}</p>
          <button
            className="e21-primary"
            type="button"
            onClick={() => go("studies")}
          >
            {data.hero.primaryAction}
          </button>
        </div>
        <figure>
          <img
            src={data.image}
            alt="Researchers sharing notes around a table"
            fetchPriority="high"
          />
          <figcaption>01 / OBSERVATION IS A PRACTICE</figcaption>
        </figure>
      </section>
      <AnimatedContent>
        <section
          className="e21-approach"
          id="approach"
          aria-labelledby="e21-approach-title"
        >
          <p className="e21-label">OUR APPROACH</p>
          <h2 id="e21-approach-title">
            Good questions make room for better answers.
          </h2>
          <p>
            We work between the measurable and the felt — finding patterns
            without sanding away the nuance.
          </p>
          <span className="e21-mark" aria-hidden="true">
            ✳
          </span>
        </section>
      </AnimatedContent>
      <section
        className="e21-studies"
        id="studies"
        aria-labelledby="e21-studies-title"
      >
        <header>
          <div>
            <p className="e21-label">SELECTED WORK</p>
            <h2 id="e21-studies-title">{data.hero.title}</h2>
          </div>
          <button type="button" onClick={() => go("contact")}>
            Request a briefing
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Ask about it"
          detailLabel="Read note"
          variant="editorial"
          countLabel="notes"
        />
      </section>
      <footer id="contact" aria-labelledby="e21-contact-title">
        <div>
          <p className="e21-label">{data.owner.name}</p>
          <h2 id="e21-contact-title">Have a question worth following?</h2>
        </div>
        <div>
          <p>{data.companyAddress}</p>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            Start a conversation ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
