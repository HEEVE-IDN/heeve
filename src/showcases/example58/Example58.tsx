import config from "./config.json";
import "./example58.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
import type { CSSProperties } from "react";

const data = config as ShowcaseConfig;

export default function Example58({ navigate }: { navigate: (path: string) => void }) {
  const { theme } = useTheme();
  const tokens = data.theme[theme];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <main className="showcase-page e58" style={{ "--bg": tokens.background, "--surface": tokens.surface, "--text": tokens.text, "--muted": tokens.muted, "--primary": tokens.primary } as CSSProperties}>
      <header className="showcase-nav">
        <button className="showcase-wordmark" onClick={() => navigate("/")} aria-label={data.title}>{data.title}</button>
        <nav aria-label={data.showcase.category}>
          <button onClick={() => scrollTo("collection")}>{data.showcase.category}</button>
          <button onClick={() => scrollTo("note")}>{data.hero.secondaryAction}</button>
          <button onClick={() => scrollTo("contact")}>{data.companyEmail}</button>
        </nav>
        <button className="showcase-nav-action" onClick={() => scrollTo("collection")}>{data.hero.primaryAction}</button>
      </header>
      <section className="showcase-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{data.hero.eyebrow}</p>
          <h1 id="hero-title">{data.hero.title}</h1>
          <p className="hero-description">{data.hero.description}</p>
          <button className="primary-action" onClick={() => scrollTo("collection")}>{data.hero.primaryAction}</button>
        </div>
        <figure className="hero-image">
          <img src={data.image} alt={data.title} />
          <figcaption>{data.showcase.description}</figcaption>
        </figure>
      </section>
      <section className="showcase-note" id="note" aria-labelledby="note-title">
        <p className="eyebrow">{data.showcase.badge}</p>
        <h2 id="note-title">{data.content}</h2>
        <p>{data.subtitle}</p>
      </section>
      <section className="showcase-collection" id="collection" aria-labelledby="collection-title">
        <header><p className="eyebrow">{data.showcase.category}</p><h2 id="collection-title">{data.hero.secondaryAction}</h2></header>
        <ShowcaseCatalog products={data.products} slug={data.slug} navigate={navigate} whatsapp={data.contactPersonWhatsapp} purchaseLabel={data.hero.primaryAction} detailLabel={data.hero.secondaryAction} variant="editorial" countLabel={data.showcase.category} />
      </section>
      <footer id="contact"><div><strong>{data.title}</strong><p>{data.showcase.description}</p></div><a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a></footer>
    </main>
  );
}
