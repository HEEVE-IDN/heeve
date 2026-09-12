import config from "./config.json";
import "./example67.css";
import "./local-components.css";
import { LocalCatalog } from "./LocalCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

type PageConfig = ShowcaseConfig & { ui: Record<string, string> };
const data = config as PageConfig;

export default function Example67({ navigate }: { navigate: (path: string) => void }) {
  const { theme } = useTheme();
  const tokens = data.theme[theme];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <main className="store-example67" style={{ "--bg": tokens.background, "--surface": tokens.surface, "--text": tokens.text, "--muted": tokens.muted, "--primary": tokens.primary } as React.CSSProperties}>
      <header className="showcase-nav">
        <button className="showcase-brand" onClick={() => navigate("/")} aria-label={data.ui.homeLabel}><span aria-hidden="true">{data.ui.brandMark}</span>{data.owner.name}</button>
        <nav aria-label={data.ui.navLabel}><button onClick={() => scrollTo("collection")}>{data.ui.catalogLabel}</button><button onClick={() => scrollTo("contact")}>{data.ui.contactLabel}</button></nav>
        <button className="showcase-nav-cta" onClick={() => scrollTo("collection")}>{data.ui.catalogAction}</button>
      </header>
      <section className="showcase-hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">{data.hero.eyebrow}</p><h1 id="hero-title">{data.hero.title}</h1><p>{data.hero.description}</p><div className="actions"><button className="primary-action" onClick={() => scrollTo("collection")}>{data.hero.primaryAction}</button><button className="secondary-action" onClick={() => scrollTo("contact")}>{data.hero.secondaryAction}</button></div></div>
        <figure className="hero-image"><img src={data.image} alt={data.ui.heroAlt} /><figcaption><strong>{data.showcase.category}</strong><span>{data.showcase.description}</span></figcaption></figure>
      </section>
      <section className="collection" id="collection" aria-labelledby="collection-title"><div className="collection-intro"><p className="eyebrow">{data.showcase.badge}</p><h2 id="collection-title">{data.showcase.title}</h2><p>{data.showcase.description}</p></div><LocalCatalog products={data.products} slug={data.slug} navigate={navigate} whatsapp={data.contactPersonWhatsapp} purchaseLabel={data.ui.contactAction} detailLabel={data.ui.catalogAction} variant="editorial" countLabel={data.ui.productCount} /></section>
      <footer id="contact"><div><strong>{data.owner.name}</strong><p>{data.ui.footerLabel}</p></div><a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a><small>{data.ui.copyright}</small></footer>
    </main>
  );
}
