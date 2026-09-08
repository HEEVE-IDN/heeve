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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Halo, saya ingin resep ${product.name}.`)}`;
  return (
    <main className="e10-product">
      <header>
        <button onClick={() => navigate(`/showcase/${config.slug}`)}>
          ← Semua resep
        </button>
        <b>rasa kitchen</b>
      </header>
      <div>
        <ProductGallery product={product} />
        <section>
          <p>
            {product.category} · {product.variant}
          </p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
          <a href={contact} target="_blank" rel="noreferrer">
            Tanya resep →
          </a>
        </section>
      </div>
    </main>
  );
}
