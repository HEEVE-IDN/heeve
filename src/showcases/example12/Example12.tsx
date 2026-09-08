import config from "./config.json";
import "./example12.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { BlurText } from "../../components/react-bits/BlurText";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
const data = config as ShowcaseConfig;
export default function Example12({
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
      className="store-example12"
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
      <header className="e12-nav">
        <button onClick={() => navigate("/")}>
          Wander<span>Map</span>
        </button>
        <nav>
          <button onClick={() => go("trips")}>Destinations</button>
          <button onClick={() => go("map")}>Map</button>
        </nav>
        <button onClick={() => go("contact")}>Plan a trip</button>
      </header>
      <section className="e12-hero">
        <img src={data.image} alt="Pemandangan perjalanan pegunungan" />
        <div>
          <p>DESTINATION DISCOVERY</p>
          <h1>
            <BlurText>{data.headline}</BlurText>
          </h1>
          <p>{data.content}</p>
          <button onClick={() => go("trips")}>
            {data.hero.primaryAction} →
          </button>
        </div>
      </section>
      <AnimatedContent>
        <section className="e12-map" id="map">
          <div>
            <span>●</span>
            <span>●</span>
            <span>●</span>
            <i>Indonesia</i>
          </div>
          <article>
            <p>WANDER MAP</p>
            <h2>Every route starts with a pin.</h2>
            <p>
              Use local notes, routes, and saved places to find your next good
              story.
            </p>
          </article>
        </section>
      </AnimatedContent>
      <section className="e12-catalog" id="trips">
        <header>
          <div>
            <p>CURATED ROUTES</p>
            <h2>Go beyond the guidebook.</h2>
          </div>
          <button onClick={() => go("contact")}>Ask a guide →</button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Plan this trip"
          detailLabel="View route"
          variant="masonry"
          countLabel="trips"
        />
      </section>
      <footer id="contact">
        <b>WanderMap</b>
        <p>{data.companyAddress}</p>
        <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
        <a
          href={`https://wa.me/${data.contactPersonWhatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          Talk to a guide →
        </a>
      </footer>
    </main>
  );
}
