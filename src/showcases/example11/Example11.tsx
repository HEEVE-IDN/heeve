import config from "./config.json";
import "./example11.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import FoldText from "../../components/react-bits/FoldText";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
const data = config as ShowcaseConfig;
export default function Example11({
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
      className="store-example11"
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
      <header className="e11-nav">
        <button onClick={() => navigate("/")}>
          UNIVERSITAS
          <br />
          <b>ARUNIKA</b>
        </button>
        <nav>
          <button onClick={() => go("programs")}>Programs</button>
          <button onClick={() => go("legacy")}>Legacy</button>
          <button onClick={() => go("contact")}>Contact</button>
        </nav>
        <button className="e11-apply" onClick={() => go("contact")}>
          Apply now
        </button>
      </header>
      <section className="e11-hero">
        <div className="e11-block" />
        <img src={data.image} alt="Kampus Universitas Arunika" />
        <div>
          <span>THE DIGITAL CURATOR / EST. 1968</span>
          <i />
          <h1>
            <FoldText
              text={data.headline}
              splitBy="word"
              trigger="mount"
              fontSize="inherit"
              fontWeight={500}
              color="currentColor"
            />
          </h1>
          <p>{data.content}</p>
          <button onClick={() => go("programs")}>
            {data.hero.primaryAction} →
          </button>
        </div>
      </section>
      <AnimatedContent>
        <section className="e11-legacy" id="legacy">
          <span>OUR ACADEMIC LEGACY</span>
          <h2>Knowledge becomes permanent when it is shared.</h2>
          <p>
            We bring research, cultural inquiry, and a public imagination into
            conversation.
          </p>
        </section>
      </AnimatedContent>
      <section className="e11-catalog" id="programs">
        <header>
          <span>PROGRAMS & INQUIRY</span>
          <h2>Make work that matters.</h2>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Request info"
          detailLabel="Explore"
          variant="editorial"
          countLabel="programs"
        />
      </section>
      <footer id="contact">
        <b>UNIVERSITAS ARUNIKA</b>
        <p>{data.companyAddress}</p>
        <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
        <a
          href={`https://wa.me/${data.contactPersonWhatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          Admissions →
        </a>
      </footer>
    </main>
  );
}
