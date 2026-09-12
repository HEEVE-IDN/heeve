import { useState } from "react";
import type { Product } from "../../types/showcase";

export default function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.photoUrls.length ? product.photoUrls : [""];
  return <div className="local-gallery"><img src={images[active]} alt={`${product.name}, image ${active + 1}`} />{images.length > 1 && <div className="local-gallery-controls" aria-label={`${product.name} images`}>{images.map((image, index) => <button type="button" key={image} onClick={() => setActive(index)} aria-pressed={index === active} aria-label={`Show image ${index + 1}`}><img src={image} alt="" /></button>)}</div>}</div>;
}
