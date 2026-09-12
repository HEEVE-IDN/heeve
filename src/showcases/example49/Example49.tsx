import config from "./config.json";
import "./example49.css";
import { useTheme } from "../../hooks/useTheme";
import type { Product, ShowcaseConfig } from "../../types/showcase";
import type { CSSProperties } from "react";

const data = config as ShowcaseConfig;

function Catalog({ navigate }: { navigate: (path: string) => void }) {
  const products = data.products.filter((product) => !product.hide);
  return <div className="e49-catalog">{products.map((product) => <article className="e49-card" key={product.number}><img src={product.photoUrls[0]} alt={product.name} /><div><p className="eyebrow">{product.category}</p><h3>{product.name}</h3><p>{product.variant}</p><p className="e49-description">{product.description}</p><strong>{product.price.toLocaleString("id-ID")} {product.unit}</strong><div className="e49-card-actions"><button onClick={() => navigate(`/showcase/${data.slug}/product/${product.number}`)} aria-label={product.name}>{data.hero.secondaryAction}</button>{data.contactPersonWhatsapp && !product.stockOut && <a href={`https://wa.me/${data.contactPersonWhatsapp}?text=${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer">{data.hero.primaryAction}</a>}</div></div></article>)}</div>;
}

export default function Example49({ navigate }: { navigate: (path: string) => void }) {
  const { theme } = useTheme(); const tokens = data.theme[theme]; const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return <main className="showcase-page e49" style={{ "--bg": tokens.background, "--surface": tokens.surface, "--text": tokens.text, "--muted": tokens.muted, "--primary": tokens.primary } as CSSProperties}>
    <header className="showcase-nav"><button className="showcase-wordmark" onClick={() => navigate("/")} aria-label={data.title}>{data.title}</button><nav aria-label={data.showcase.category}><button onClick={() => scrollTo("collection")}>{data.showcase.category}</button><button onClick={() => scrollTo("note")}>{data.hero.secondaryAction}</button><button onClick={() => scrollTo("contact")}>{data.companyEmail}</button></nav><button className="showcase-nav-action" onClick={() => scrollTo("collection")}>{data.hero.primaryAction}</button></header>
    <section className="showcase-hero" aria-labelledby="hero-title"><div className="hero-copy"><p className="eyebrow">{data.hero.eyebrow}</p><h1 id="hero-title">{data.hero.title}</h1><p className="hero-description">{data.hero.description}</p><button className="primary-action" onClick={() => scrollTo("collection")}>{data.hero.primaryAction}</button></div><figure className="hero-image"><img src={data.image} alt={data.title} /><figcaption>{data.showcase.description}</figcaption></figure></section>
    <section className="showcase-note" id="note" aria-labelledby="note-title"><p className="eyebrow">{data.showcase.badge}</p><h2 id="note-title">{data.content}</h2><p>{data.subtitle}</p></section>
    <section className="showcase-collection" id="collection" aria-labelledby="collection-title"><header><p className="eyebrow">{data.showcase.category}</p><h2 id="collection-title">{data.hero.secondaryAction}</h2></header><Catalog navigate={navigate} /></section>
    <footer id="contact"><div><strong>{data.title}</strong><p>{data.showcase.description}</p></div><a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a></footer>
  </main>;
}
