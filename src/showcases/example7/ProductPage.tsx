import type { Product, ShowcaseConfig } from "../../types/showcase";
import "./product-page.css";

export default function ProductPage({
  config,
  product,
  navigate,
}: {
  config: ShowcaseConfig;
  product: Product;
  navigate: (path: string) => void;
}) {
  const contact = config.contactPersonWhatsapp
    ? `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(
        `Halo ${config.title}, saya tertarik dengan produk ${product.name} (${product.variant})`,
      )}`
    : "";

  return (
    <main className="store-example7-product">
      <nav className="ex7-pdp-nav">
        <button
          className="ex7-back-btn"
          onClick={() => navigate(`/showcase/${config.slug}`)}
        >
          ← Kembali ke {config.title}
        </button>
        <span style={{ fontSize: "12px", color: "#888" }}>
          REF: #{String(product.number).padStart(2, "0")}
        </span>
      </nav>

      <div className="ex7-pdp-layout">
        <div className="ex7-pdp-gallery">
          <div className="ex7-pdp-main-img">
            <img src={product.photoUrls[0]} alt={product.name} loading="lazy" />
          </div>
        </div>

        <div className="ex7-pdp-details">
          <span className="ex7-pdp-category">{product.category}</span>
          <h1 className="ex7-pdp-title">{product.name}</h1>
          <p className="ex7-pdp-variant">{product.variant}</p>
          <div className="ex7-pdp-price">
            Rp {product.price.toLocaleString("id-ID")}
          </div>
          <p className="ex7-pdp-desc">{product.description}</p>

          <div className="ex7-pdp-actions">
            {contact && !product.stockOut ? (
              <a
                href={contact}
                target="_blank"
                rel="noreferrer"
                className="ex7-buy-btn"
              >
                Inquire via WhatsApp ↗
              </a>
            ) : (
              <span style={{ color: "#c0392b", fontWeight: 600 }}>
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
