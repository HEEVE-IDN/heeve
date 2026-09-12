import type { Product, ShowcaseConfig } from "../types/showcase";
import { SpotlightCard } from "./react-bits/SpotlightCard";
export function ShowcaseProductCard({
  product,
  index,
  slug,
  navigate,
  whatsapp,
  purchaseLabel = "Purchase",
  detailLabel = "See more",
  variant = "default",
}: {
  product: Product;
  index: number;
  slug: string;
  navigate: (path: string) => void;
  whatsapp: ShowcaseConfig["contactPersonWhatsapp"];
  purchaseLabel?: string;
  detailLabel?: string;
  variant?: "default" | "editorial" | "masonry" | "circular";
}) {
  const message = `Halo, saya tertarik dengan ${product.name}${product.variant ? ` (${product.variant})` : ""}. Harga: Rp ${product.price.toLocaleString("id-ID")} / ${product.unit}.`;
  const whatsappUrl = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`
    : `/showcase/${slug}/product/${product.number}`;
  const openProduct = () =>
    navigate(`/showcase/${slug}/product/${product.number}`);
  return (
    <SpotlightCard
      className={`showcase-product showcase-product-${variant}`}
      onClick={openProduct}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openProduct();
        }
      }}
      role="link"
      tabIndex={0}
    >
      <div
        className="showcase-product-art"
        style={
          {
            "--accent": `hsl(${(index * 83) % 360} 70% 55%)`,
          } as React.CSSProperties
        }
      >
        {product.photoUrls[0] ? (
          <img
            src={product.photoUrls[0]}
            alt={product.name}

          />
        ) : (
          <>
            <b>{String(product.number).padStart(2, "0")}</b>
            <span>
              {variant === "circular" ? "◌" : variant === "masonry" ? "▧" : "✦"}
            </span>
          </>
        )}
        <em>{product.stockOut ? "×" : "✓"}</em>
      </div>
      <div className="showcase-product-copy">
        <p className="eyebrow">
          {product.category} · {product.unit}
        </p>
        <h3>{product.name}</h3>
        {product.variant && <small>{product.variant}</small>}
        <p>{product.description}</p>
        <div className="showcase-product-footer">
          <strong>Rp {product.price.toLocaleString("id-ID")}</strong>
          <div className="showcase-product-actions">
            <a
              className="whatsapp-cta"
              href={whatsappUrl}
              onClick={(event) => event.stopPropagation()}
              target={whatsapp ? "_blank" : undefined}
              rel={whatsapp ? "noreferrer" : undefined}
              aria-label={`${purchaseLabel} ${product.name}`}
            >
              {purchaseLabel} ↗
            </a>
            <button
              type="button"
              className="product-detail-link"
              onClick={(event) => {
                event.stopPropagation();
                openProduct();
              }}
              aria-label={`${detailLabel} ${product.name}`}
            >
              {detailLabel} ↗
            </button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
