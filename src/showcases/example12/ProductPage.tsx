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
  const contact = `https://wa.me/${config.contactPersonWhatsapp}?text=${encodeURIComponent(`Halo, saya ingin merencanakan ${product.name}.`)}`;
  return (
    <main className="e12-product">
      <header>
        <button onClick={() => navigate(`/showcase/${config.slug}`)}>
          ← All destinations
        </button>
        <b>WanderMap</b>
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
            Plan with a guide →
          </a>
        </section>
      </div>
    </main>
  );
}
