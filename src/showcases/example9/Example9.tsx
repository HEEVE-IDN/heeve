import config from "./config.json";
import "./example9.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import FoldText from "../../components/react-bits/FoldText";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example9({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const { theme } = useTheme();
  const t = data.theme[theme];
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <main
      className="store-example9"
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
      <header className="e9-nav">
        <button
          className="e9-logo"
          onClick={() => navigate(`/showcase/${data.slug}`)}
        >
          AETHER<sup>™</sup>
        </button>
        <nav aria-label="Navigasi utama">
          <button onClick={() => scrollTo("catalog")}>Archive</button>
          <button onClick={() => scrollTo("vision")}>Vision</button>
          <button onClick={() => scrollTo("contact")}>Contact</button>
        </nav>
        <button className="e9-menu" onClick={() => navigate("/")}>
          HEEVE / 00
        </button>
      </header>
      <section className="e9-hero">
        <div className="e9-hero-meta">
          <span>01-A. EST. 2025</span>
          <span>JKT / IDN</span>
        </div>
        <h1>
          <FoldText
            text="AETHER™"
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize="clamp(72px, 16vw, 240px)"
            fontWeight={500}
            color="#FFFFFF"
          />
        </h1>
        <div className="e9-hero-bottom">
          <p>Crafting experiences that elevate, engage, and resonate.</p>
          <button onClick={() => scrollTo("catalog")}>
            Explore archive <i>↘</i>
          </button>
        </div>
        <img src={data.image} alt="Aether apparel editorial" />
      </section>
      <section className="e9-manifesto" id="vision">
        <span>02-B.</span>
        <p>
          Bridging space between bold concepts and <em>digital reality.</em>
        </p>
        <span>VISION / 2025</span>
      </section>
      <section className="e9-bento">
        <article className="e9-bento-copy">
          <span>03-C.</span>
          <h2>
            PIXEL
            <br />
            PERFECT
          </h2>
          <p>Built with precision. Worn without limits.</p>
        </article>
        <article className="e9-bento-image">
          <img
            src={data.products[0].photoUrls[0]}
            alt={data.products[0].name}
          />
          <span>5K+ / NEW ROUTINES</span>
        </article>
        <article className="e9-bento-stat">
          <b>∞</b>
          <p>
            Possibilities
            <br />
            in motion
          </p>
        </article>
      </section>
      <section className="e9-catalog" id="catalog">
        <header>
          <div>
            <span>04-D. COLLECTION</span>
            <h2>Future essentials.</h2>
          </div>
          <button onClick={() => scrollTo("contact")}>
            {data.hero.secondaryAction} ↗
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Add inquiry"
          detailLabel="View piece"
          variant="masonry"
          countLabel="pieces"
        />
      </section>
      <footer className="e9-footer" id="contact">
        <div>
          <strong>
            AETHER<sup>™</sup>
          </strong>
          <p>
            New frontier apparel.
            <br />
            {data.companyAddress}
          </p>
        </div>
        <div>
          <span>STUDIO</span>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp ↗
          </a>
        </div>
        <div>
          <span>FOLLOW</span>
          <a href={data.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <button onClick={() => navigate("/")}>HEEVE / 2025</button>
        </div>
      </footer>
    </main>
  );
}
