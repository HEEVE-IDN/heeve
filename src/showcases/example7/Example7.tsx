import { useState, useEffect, useRef } from "react";
import config from "./config.json";
import "./example7.css";
import {
  BurgerIcon,
  CompassIcon,
  WhatsAppIcon,
  BagIcon,
  ArrowBoldLeftIcon,
  ArrowBoldRightIcon,
  PauseIcon,
  PlayIcon,
} from "./icons";
import type { ShowcaseConfig } from "../../types/showcase";

const data = config as ShowcaseConfig;

export default function Example7({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const [heroIndex, setHeroIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  // Group products by category
  const categories = Array.from(new Set(data.products.map((p) => p.category)));

  const currentProducts = data.products.filter(
    (p) => p.category === categories[activeTab],
  );

  // Hero carousel slides (watch-31, watch-32, watch-33 khusus hero section)
  const heroSlides = [
    {
      img: "https://i.imgur.com/67KIUVt.jpeg", // watch-31
      subtitle: "Arlojihobi Curated Selection",
      title: "Vintage Chronographs",
      productNum: data.products[0]?.number,
    },
    {
      img: "https://i.imgur.com/IcZmx0N.jpeg", // watch-32
      subtitle: "Heritage Collection",
      title: "Classic Automatics",
      productNum: data.products[2]?.number,
    },
    {
      img: "https://i.imgur.com/KUcIad2.jpeg", // watch-33
      subtitle: "Collector Curated",
      title: "Prestige Timepieces",
      productNum: data.products[9]?.number,
    },
  ];

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [playing, heroSlides.length]);

  const scrollTrack = (direction: number) => {
    if (carouselTrackRef.current) {
      carouselTrackRef.current.scrollBy({
        left: direction * 320,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="store-example7">
      {/* 1. Site Header */}
      <header className="ex7-header">
        <div className="ex7-header-left">
          <button
            type="button"
            className="ex7-icon-btn"
            onClick={() => navigate("/")}
            title="Menu"
          >
            <BurgerIcon />
            <span>HEEVE</span>
          </button>
          <button
            type="button"
            className="ex7-icon-btn"
            onClick={() => {
              document
                .getElementById("ex7-catalog")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            title="Explore"
          >
            <CompassIcon />
            <span>Explore</span>
          </button>
        </div>

        <button
          type="button"
          className="ex7-brand-logo"
          onClick={() => navigate(`/showcase/${data.slug}`)}
        >
          <img
            src="https://i.imgur.com/m3gJlI9.jpeg"
            alt="ARLOJIHOBI"
            className="ex7-logo-img"
          />
          <span className="ex7-brand-text">ARLOJIHOBI</span>
        </button>

        <div className="ex7-header-right">
          <button
            type="button"
            className="ex7-icon-btn"
            onClick={() => {
              if (data.contactPersonWhatsapp) {
                window.open(
                  `https://wa.me/${data.contactPersonWhatsapp}`,
                  "_blank",
                );
              }
            }}
            title="WhatsApp Contact"
          >
            <WhatsAppIcon />
            <span>Contact</span>
          </button>
          <button
            type="button"
            className="ex7-icon-btn"
            onClick={() => {
              document
                .getElementById("ex7-catalog")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <BagIcon />
            <span>Catalog</span>
          </button>
        </div>
      </header>

      {/* 2. Hero Carousel */}
      <section className="ex7-hero">
        <div
          className="ex7-hero-track"
          style={{ transform: `translateX(-${heroIndex * 100}%)` }}
        >
          {heroSlides.map((slide, idx) => (
            <div key={idx} className="ex7-hero-slide">
              <img src={slide.img} alt={slide.title} className="ex7-hero-img" />
              <div className="ex7-hero-overlay" />
              <div className="ex7-hero-content">
                <span className="ex7-hero-eyebrow">{slide.subtitle}</span>
                <h1 className="ex7-hero-title">{slide.title}</h1>
                {slide.productNum && (
                  <button
                    type="button"
                    className="ex7-hero-cta"
                    onClick={() =>
                      navigate(
                        `/showcase/${data.slug}/product/${slide.productNum}`,
                      )
                    }
                  >
                    View Timepiece ↗
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ex7-hero-controls">
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="ex7-icon-btn"
            style={{ color: "#fff", padding: "4px" }}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`ex7-dot ${idx === heroIndex ? "active" : ""}`}
              onClick={() => setHeroIndex(idx)}
            />
          ))}
        </div>
      </section>

      {/* 3 & 4. Title / Paragraph: Curators */}
      <section className="ex7-title-section">
        <h2 className="ex7-heading">Curators of Exceptional Timepieces.</h2>
        <p className="ex7-paragraph">
          For decades, ARLOJIHOBI has been dedicated to the art of fine
          horology. Over 1,000 authenticated vintage watches. Trusted by
          collectors across 30+ countries. Every piece meticulously verified,
          serviced, and preserved.
        </p>
      </section>

      {/* 5. Product Carousel (Tabbed Catalog) */}
      <section id="ex7-catalog" className="ex7-product-section">
        <div className="ex7-tab-list">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              type="button"
              className={`ex7-tab-btn ${idx === activeTab ? "active" : ""}`}
              onClick={() => {
                setActiveTab(idx);
                if (carouselTrackRef.current) {
                  carouselTrackRef.current.scrollLeft = 0;
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div
          style={{ position: "relative", maxWidth: "1400px", margin: "0 auto" }}
        >
          <div ref={carouselTrackRef} className="ex7-product-track">
            {currentProducts.map((p) => (
              <div
                key={p.number}
                className="ex7-product-card"
                onClick={() =>
                  navigate(`/showcase/${data.slug}/product/${p.number}`)
                }
              >
                <div className="ex7-product-img-wrap">
                  <img
                    src={p.photoUrls[0]}
                    alt={p.name}
                    className="ex7-product-img"
                    loading="lazy"
                  />
                </div>
                <span className="ex7-card-badge">{p.category}</span>
                <h3 className="ex7-card-name">{p.name}</h3>
                <span className="ex7-card-variant">{p.variant}</span>
                <span className="ex7-card-price">
                  Rp {p.price.toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            <button
              type="button"
              className="ex7-tab-btn"
              onClick={() => scrollTrack(-1)}
            >
              <ArrowBoldLeftIcon />
            </button>
            <button
              type="button"
              className="ex7-tab-btn"
              onClick={() => scrollTrack(1)}
            >
              <ArrowBoldRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* 6. Title / Paragraph: Watch is our DNA */}
      <section className="ex7-title-section">
        <span className="ex7-subheading">PHILOSOPHY</span>
        <h2 className="ex7-heading">Watch is our DNA</h2>
        <p className="ex7-paragraph">
          Mechanical integrity, historical resonance, and timeless aesthetics.
        </p>
      </section>

      {/* 7. Full-Width Banner Media Slide */}
      <section className="ex7-media-banner">
        <img
          src={data.products[10]?.photoUrls[0] || data.image}
          alt="Curated Horology"
        />
        <div className="ex7-media-content">
          <span className="ex7-hero-eyebrow">ARLOJIHOBI SELECTION</span>
          <h2 className="ex7-heading" style={{ fontSize: "36px" }}>
            Heritage & Precision
          </h2>
          <p
            className="ex7-paragraph"
            style={{ color: "#eee", maxWidth: "600px" }}
          >
            Preserving timeless vintage watches with complete authentication and
            mechanical inspection.
          </p>
        </div>
      </section>

      {/* 8. Collections Grid */}
      <section className="ex7-grid-section">
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <span className="ex7-subheading">CURATED ARCHIVE</span>
          <h2 className="ex7-heading">Featured Categories</h2>
        </div>
        <div className="ex7-collections-grid">
          {categories.slice(0, 3).map((cat, idx) => {
            const sample = data.products.find((p) => p.category === cat);
            return (
              <div
                key={cat}
                className="ex7-collection-card"
                onClick={() => {
                  setActiveTab(idx);
                  document
                    .getElementById("ex7-catalog")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <img
                  src={sample?.photoUrls[0] || data.image}
                  alt={cat}
                  loading="lazy"
                />
                <div className="ex7-collection-overlay">
                  <span className="ex7-col-sub">Collection</span>
                  <h3 className="ex7-col-title">{cat}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Quote Section */}
      <section className="ex7-quote-section">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <img
            src="https://i.imgur.com/m3gJlI9.jpeg"
            alt="Arlojihobi"
            style={{ width: "48px", height: "48px", borderRadius: "50%" }}
          />
        </div>
        <blockquote className="ex7-quote-text">
          “Vintage, modern, and everything in between.”
        </blockquote>
        <div className="ex7-quote-author">ARLOJIHOBI INDONESIA</div>
      </section>

      {/* 11. Footer */}
      <footer className="ex7-footer">
        <div className="ex7-footer-inner">
          <div className="ex7-footer-col">
            <h4>ARLOJIHOBI</h4>
            <p style={{ fontSize: "13px", lineHeight: "1.6" }}>
              Fine horology boutique & vintage watch gallery.
              <br />
              {data.companyAddress}
            </p>
          </div>
          <div className="ex7-footer-col">
            <h4>Categories</h4>
            <ul>
              {categories.map((c, i) => (
                <li key={c}>
                  <a
                    href="#ex7-catalog"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(i);
                      document
                        .getElementById("ex7-catalog")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="ex7-footer-col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a
                  href={`https://wa.me/${data.contactPersonWhatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp: +{data.contactPersonWhatsapp}
                </a>
              </li>
              <li>
                <a href={data.instagram} target="_blank" rel="noreferrer">
                  Instagram: {data.owner.handle}
                </a>
              </li>
              <li>
                <a href={`mailto:${data.companyEmail}`}>{data.companyEmail}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="ex7-footer-bottom">
          &copy; {new Date().getFullYear()} ARLOJIHOBI · All rights reserved ·
          Part of HEEVE Showcase
        </div>
      </footer>
    </div>
  );
}
