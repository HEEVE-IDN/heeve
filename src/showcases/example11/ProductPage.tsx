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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Halo, saya ingin informasi ${product.name}.`)}`;
  return (
    <main className="e11-product">
      <header>
        <button onClick={() => navigate(`/showcase/${config.slug}`)}>
          ← Back to programs
        </button>
        <span>UNIVERSITAS ARUNIKA</span>
      </header>
      <div>
        <ProductGallery product={product} />
        <section>
          <span>{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.variant}</p>
          <p>{product.description}</p>
          <a href={contact} target="_blank" rel="noreferrer">
            Request information →
          </a>
        </section>
      </div>
    </main>
  );
}
