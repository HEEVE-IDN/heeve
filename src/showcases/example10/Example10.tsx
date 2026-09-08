import config from "./config.json";
import "./example10.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import FoldText from "../../components/react-bits/FoldText";
import { AnimatedContent } from "../../components/react-bits/AnimatedContent";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";
const data = config as ShowcaseConfig;
export default function Example10({
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
      className="store-example10"
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
      <header className="e10-nav">
        <button onClick={() => navigate("/")}>
          <b>rasa</b>
          <span> kitchen</span>
        </button>
        <nav>
          <button onClick={() => go("recipes")}>Resep</button>
          <button onClick={() => go("about")}>Tentang</button>
        </nav>
        <button className="e10-cta" onClick={() => go("recipes")}>
          Mulai masak
        </button>
      </header>
      <section className="e10-hero">
        <div>
          <p>MASAK HARI INI</p>
          <h1>
            <FoldText
              text={data.headline}
              splitBy="word"
              trigger="mount"
              fontSize="inherit"
              fontWeight={700}
              color="currentColor"
            />
          </h1>
          <p>{data.content}</p>
          <button className="e10-cta" onClick={() => go("recipes")}>
            {data.hero.primaryAction} →
          </button>
        </div>
        <img src={data.image} alt="Bahan segar untuk memasak" />
      </section>
      <AnimatedContent>
        <section className="e10-picks" id="about">
          <p>IDE CEPAT</p>
          <h2>Makanan baik, tanpa rumit.</h2>
          <div>
            <span>🥬 Bahan segar</span>
            <span>⏱ Resep jelas</span>
            <span>♥ Dibuat untuk dibagi</span>
          </div>
        </section>
      </AnimatedContent>
      <section className="e10-catalog" id="recipes">
        <header>
          <div>
            <p>RESEP PILIHAN</p>
            <h2>Apa yang ingin dimasak?</h2>
          </div>
          <button onClick={() => go("contact")}>Butuh bantuan?</button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Simpan resep"
          detailLabel="Lihat resep"
          variant="editorial"
          countLabel="resep"
        />
      </section>
      <footer id="contact">
        <div>
          <b>rasa kitchen</b>
          <p>{data.companyAddress}</p>
        </div>
        <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
        <a
          href={`https://wa.me/${data.contactPersonWhatsapp}`}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp →
        </a>
      </footer>
    </main>
  );
}
