import type { Product, ShowcaseConfig } from "../../types/showcase";
import ProductGallery from "../../components/ProductGallery";
import "../../components/product-gallery.css";
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
    ? `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Halo ${config.title}, saya tertarik dengan ${product.name} (${product.variant}).`)}`
    : "";
  return (
    <main className="store-example8-product">
      <header>
        <button
          onClick={() => navigate(`/showcase/${config.slug}`)}
          aria-label={`Kembali ke ${config.title}`}
        >
          ← Kembali ke koleksi
        </button>
        <span>NO. {String(product.number).padStart(2, "0")}</span>
      </header>
      <div className="e8-product-layout">
        <ProductGallery product={product} className="e8-product-gallery" />
        <section>
          <p className="e8-product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="e8-product-variant">{product.variant}</p>
          <p className="e8-product-description">{product.description}</p>
          <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
          {contact && !product.stockOut ? (
            <a href={contact} target="_blank" rel="noreferrer">
              Tanya produk via WhatsApp
            </a>
          ) : (
            <p className="e8-out">Stok habis</p>
          )}
        </section>
      </div>
    </main>
  );
}
