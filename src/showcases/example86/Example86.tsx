import config from "./config.json";
import "./example86.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig & Record<string, any>;
export default function Example86({ navigate }: { navigate: (path: string) => void }) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return <main className="store-showcase" style={{ "--bg": t.background, "--surface": t.surface, "--text": t.text, "--muted": t.muted, "--primary": t.primary } as React.CSSProperties}>
    <a className="skip" href="#collection">{data.navigation.skip}</a>
    <header className="showcase-nav"><button className="brand" type="button" onClick={() => navigate("/")} aria-label={data.navigation.homeLabel}>{data.owner.name}</button><nav aria-label={data.navigation.ariaLabel}>{data.navigation.items.map((item: { label: string; target: string }) => <button key={item.label} type="button" onClick={() => go(item.target)}>{item.label}</button>)}</nav><button className="nav-action" type="button" onClick={() => go("collection")}>{data.hero.primaryAction}</button></header>
    <section className="showcase-hero" aria-labelledby="showcase-title"><div className="hero-copy"><p className="eyebrow">{data.hero.eyebrow}</p><h1 id="showcase-title">{data.hero.title}</h1><p className="lede">{data.hero.description}</p><div className="actions"><button className="primary" type="button" onClick={() => go("collection")}>{data.hero.primaryAction}</button><button className="secondary" type="button" onClick={() => go("contact")}>{data.hero.secondaryAction}</button></div></div><figure><img src={data.image} alt={data.imageAlt} fetchPriority="high" /><figcaption>{(data.hero as ShowcaseConfig["hero"] & { caption: string }).caption}</figcaption></figure></section>
    <section className="showcase-note" id="approach" aria-labelledby="approach-title"><p className="eyebrow">{data.approach.eyebrow}</p><h2 id="approach-title">{data.approach.title}</h2><p>{data.approach.description}</p></section>
    <section className="showcase-collection" id="collection" aria-labelledby="collection-title"><header><div><p className="eyebrow">{data.collection.eyebrow}</p><h2 id="collection-title">{data.collection.title}</h2></div><p>{data.collection.description}</p></header><ShowcaseCatalog products={data.products} slug={data.slug} navigate={navigate} whatsapp={data.contactPersonWhatsapp} purchaseLabel={data.collection.purchaseLabel} detailLabel={data.collection.detailLabel} variant="editorial" countLabel={data.collection.countLabel} /></section>
    <footer id="contact"><div><p className="eyebrow">{data.owner.name}</p><h2>{data.contact.title}</h2></div><div><p>{data.companyAddress}</p><a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a><a href={`https://wa.me/${data.contactPersonWhatsapp}`} target="_blank" rel="noreferrer">{data.contact.action}</a></div></footer>
  </main>;
}
