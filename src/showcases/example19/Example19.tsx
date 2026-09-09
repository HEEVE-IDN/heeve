import config from "./config.json";
import "./example19.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { ShowcaseInfo } from "../../components/ShowcaseInfo";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example19({
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
      className="store-example19"
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
      <header className="e19-nav">
        <button
          className="e19-brand"
          onClick={() => navigate("/")}
          aria-label="Return to HEEVE home"
        >
          <span aria-hidden="true">{data.owner.name.slice(0, 1)}</span>{" "}
          {data.owner.name}
        </button>
        <nav aria-label="Primary navigation">
          <button onClick={() => go("spaces")}>Spaces</button>
          <button onClick={() => go("story")}>Why {data.owner.name}</button>
        </nav>
        <button className="e19-login" onClick={() => go("contact")}>
          Open {data.owner.name}
        </button>
      </header>

      <section className="e19-hero">
        <div className="e19-hero-copy">
          <p className="e19-eyebrow">{data.hero.eyebrow}</p>
          <h1>{data.headline}</h1>
          <p>{data.content}</p>
          <div className="e19-actions">
            <button onClick={() => go("spaces")}>
              {data.hero.primaryAction} ↓
            </button>
            <button onClick={() => go("story")}>
              {data.hero.secondaryAction}
            </button>
          </div>
        </div>
        <div className="e19-hero-art" aria-hidden="true">
          <img src={data.image} alt="" />
          <span className="e19-bubble e19-bubble-one"># welcome</span>
          <span className="e19-bubble e19-bubble-two">you in?</span>
        </div>
      </section>

      <section
        className="e19-intro"
        id="story"
        aria-labelledby="e19-story-title"
      >
        <p className="e19-eyebrow">ONE PLACE. MANY WORLDS.</p>
        <h2 id="e19-story-title">Make space for what matters.</h2>
        <p>
          Small conversations. Big communities. The best parts happen when
          people have a place to show up as themselves.
        </p>
      </section>

      <section className="e19-spaces" id="spaces">
        <header>
          <div>
            <p className="e19-eyebrow">FIND YOUR PEOPLE</p>
            <h2>There&apos;s a space for that.</h2>
          </div>
          <button onClick={() => go("contact")}>Start a space</button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Join the conversation"
          detailLabel="See the space"
          variant="editorial"
          countLabel="spaces"
        />
      </section>

      <ShowcaseInfo config={data} />
    </main>
  );
}
