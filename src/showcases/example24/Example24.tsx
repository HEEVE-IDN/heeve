import { useState } from "react";
import config from "./config.json";
import "./example24.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
import { WorkflowPreview } from "./WorkflowPreview";

const data = config as ShowcaseConfig;

export default function Example24({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const tokens = data.theme[theme];
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const go = (id: string) =>
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <main
      className="store-example24"
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
      <header className="e24-nav">
        <button
          className="e24-brand"
          onClick={() => navigate("/")}
          aria-label={`${data.owner.name} home`}
        >
          <span aria-hidden="true">●</span> {data.owner.name}
        </button>
        <nav aria-label="Main navigation">
          <button onClick={() => go("workflows")}>Workflows</button>
          <button onClick={() => go("principles")}>Why async</button>
          <button onClick={() => go("contact")}>Contact</button>
        </nav>
        <button className="e24-nav-cta" onClick={() => go("contact")}>
          Get started
        </button>
      </header>

      <section className="e24-hero" aria-labelledby="e24-hero-title">
        <div className="e24-hero-copy">
          <p className="e24-kicker">{data.hero.eyebrow}</p>
          <h1 id="e24-hero-title">{data.hero.title}</h1>
          <p>{data.hero.description}</p>
          <div className="e24-actions">
            <button className="e24-primary" onClick={() => go("workflows")}>
              {data.hero.primaryAction}
            </button>
            <button
              className="e24-text-button"
              onClick={() => go("principles")}
            >
              {data.hero.secondaryAction}
            </button>
          </div>
        </div>
        <WorkflowPreview
          isPlaying={isPreviewPlaying}
          image={data.image ?? ""}
          onToggle={() => setIsPreviewPlaying((playing) => !playing)}
          title={data.hero.title}
          description={data.hero.description}
          playingTitle={data.hero.primaryAction}
          playingDescription={data.hero.secondaryAction}
          playLabel={data.hero.primaryAction}
          pauseLabel={data.hero.secondaryAction}
        />
      </section>

      <AnimatedContent>
        <section
          className="e24-principles"
          id="principles"
          aria-labelledby="e24-principles-title"
        >
          <p className="e24-kicker">{data.owner.name.toUpperCase()} METHOD</p>
          <div>
            <h2 id="e24-principles-title">
              Less noise.
              <br />
              <em>More signal.</em>
            </h2>
            <p>
              Good work does not need more meetings. It needs the right story,
              shared at the right moment, with room for people to think.
            </p>
          </div>
          <div className="e24-rule">
            <div>
              <span>01</span>
              <p>
                Record once.
                <br />
                <b>Give context a home.</b>
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                Respond when ready.
                <br />
                <b>Keep momentum human.</b>
              </p>
            </div>
          </div>
        </section>
      </AnimatedContent>

      <section
        className="e24-workflows"
        id="workflows"
        aria-labelledby="e24-workflows-title"
      >
        <header>
          <div>
            <p className="e24-kicker">BUILT FOR THE IN-BETWEEN</p>
            <h2 id="e24-workflows-title">
              One idea.
              <br />
              <em>Many ways forward.</em>
            </h2>
          </div>
          <button className="e24-text-button" onClick={() => go("contact")}>
            Find your flow
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Start a conversation"
          detailLabel="View workflow"
          variant="editorial"
          countLabel="workflows"
        />
      </section>

      <footer id="contact">
        <div>
          <b>
            <span aria-hidden="true">●</span> {data.owner.name}
          </b>
          <p>{data.showcase.description}</p>
        </div>
        <div>
          <p className="e24-kicker">LET'S MAKE SPACE</p>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
        </div>
        <small>© 2024 {data.owner.name}. For work that moves.</small>
      </footer>
    </main>
  );
}
