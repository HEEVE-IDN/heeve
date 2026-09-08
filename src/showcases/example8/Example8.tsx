import config from "./config.json";
import "./example8.css";
import { ShowcaseCatalog } from "../../components/ShowcaseCatalog";
import { useTheme } from "../../hooks/useTheme";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example8({
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
      className="store-example8"
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
      <header className="e8-nav">
        <button onClick={() => navigate("/")} className="e8-logo">
          {data.title}
        </button>
        <nav aria-label="Navigasi utama">
          <button onClick={() => scrollTo("catalog")}>Koleksi</button>
          <button onClick={() => scrollTo("about")}>Tentang</button>
        </nav>
        <button className="e8-contact" onClick={() => scrollTo("contact")}>
          Hubungi kami
        </button>
      </header>
      <section className="e8-hero">
        <div className="e8-hero-copy">
          <p className="e8-overline">{data.hero.eyebrow}</p>
          <h1>{data.headline}</h1>
          <p>{data.content}</p>
          <button className="e8-primary" onClick={() => scrollTo("catalog")}>
            {data.hero.primaryAction}
          </button>
        </div>
        <img src={data.image} alt="Interior ruang duduk Ruang Hening" />
      </section>
      <section className="e8-intro" id="about">
        <p className="e8-overline">{data.showcase.badge}</p>
        <h2>Rumah bukan untuk dipenuhi. Rumah untuk dihuni.</h2>
        <p>
          Kami memilih material jujur, bentuk yang tidak terburu-buru, serta
          detail yang tetap terasa baik setelah bertahun-tahun.
        </p>
      </section>
      <section className="e8-catalog" id="catalog">
        <header>
          <div>
            <p className="e8-overline">Pilihan untuk rumah</p>
            <h2>Koleksi yang menetap.</h2>
          </div>
          <button onClick={() => scrollTo("contact")}>
            {data.hero.secondaryAction}
          </button>
        </header>
        <ShowcaseCatalog
          products={data.products}
          slug={data.slug}
          navigate={navigate}
          whatsapp={data.contactPersonWhatsapp}
          purchaseLabel="Tanya produk"
          detailLabel="Lihat detail"
          variant="editorial"
          countLabel="objek"
        />
      </section>
      <section className="e8-note">
        <p>
          “Benda yang baik tidak meminta perhatian. Ia membuat keseharian terasa
          lebih utuh.”
        </p>
        <span>RUANG HENING STUDIO</span>
      </section>
      <footer className="e8-footer" id="contact">
        <div>
          <strong>{data.title}</strong>
          <p>{data.companyAddress}</p>
        </div>
        <div>
          <span>Untuk ruang Anda</span>
          <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
          <a
            href={`https://wa.me/${data.contactPersonWhatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </div>
        <div>
          <span>Ikuti</span>
          <a href={data.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <button onClick={() => navigate("/")}>HEEVE</button>
        </div>
      </footer>
    </main>
  );
}
