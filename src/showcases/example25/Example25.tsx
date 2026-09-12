import config from "./config.json";
import "./example25.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
type PageConfig = ShowcaseConfig & { sections: { nav: string[]; methodTitle: string; methodBody: string; methodItems: string[]; catalogTitle: string; footerNote: string } };
const data = config as PageConfig;
export default function Example25({ navigate }: { navigate: (path: string) => void }) {
 const { theme } = useTheme(); const tokens = data.theme[theme];
 const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
 return <main className="store-example25" style={{ "--bg":tokens.background,"--surface":tokens.surface,"--text":tokens.text,"--muted":tokens.muted,"--primary":tokens.primary } as React.CSSProperties}>
  <header className="e25-nav"><button className="e25-brand" onClick={() => navigate("/")} aria-label={data.owner.name}>{data.owner.name}</button><nav aria-label={data.sections.nav[0]}>{data.sections.nav.map((item,index)=><button key={item} onClick={()=>go(["method","catalog","contact"][index])}>{item}</button>)}</nav><button className="e25-nav-action" onClick={()=>go("catalog")}>{data.hero.primaryAction}</button></header>
  <section className="e25-hero" aria-labelledby="hero-title"><div><p className="e25-eyebrow">{data.hero.eyebrow}</p><h1 id="hero-title">{data.hero.title}</h1><p className="e25-lead">{data.hero.description}</p><div className="e25-actions"><button className="e25-primary" onClick={()=>go("catalog")}>{data.hero.primaryAction}</button><button className="e25-secondary" onClick={()=>go("method")}>{data.hero.secondaryAction}</button></div></div><figure><img src={data.image} alt={data.content}/><figcaption>{data.showcase.category}</figcaption></figure></section>
  <section id="method" className="e25-method" aria-labelledby="method-title"><div><p className="e25-eyebrow">{data.showcase.badge}</p><h2 id="method-title">{data.sections.methodTitle}</h2><p>{data.sections.methodBody}</p></div><ol>{data.sections.methodItems.map((item,index)=><li key={item}><span>{String(index+1).padStart(2,"0")}</span><b>{item}</b></li>)}</ol></section>
  <section id="catalog" className="e25-catalog" aria-labelledby="catalog-title"><header><p className="e25-eyebrow">{data.showcase.category}</p><h2 id="catalog-title">{data.sections.catalogTitle}</h2></header><ShowcaseCatalog products={data.products} slug={data.slug} navigate={navigate} whatsapp={data.contactPersonWhatsapp} purchaseLabel={data.hero.primaryAction} detailLabel={data.hero.secondaryAction} variant="editorial" countLabel={data.showcase.category}/></section>
  <footer id="contact"><div><b>{data.owner.name}</b><p>{data.showcase.description}</p></div><a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a><small>{data.sections.footerNote}</small></footer>
 </main>;
}
