import { useState } from "react";
import type { Product } from "../../types/showcase";

export default function Gallery({ product }: { product: Product }) { const [index, setIndex] = useState(0); const photos = product.photoUrls; const current = photos[index]; return <div className="e38-gallery">{current ? <img className="e38-gallery-stage" src={current} alt={`${product.name} ${index + 1}`} /> : <div className="e38-gallery-stage">{product.name}</div>}{photos.length > 1 && <div className="e38-gallery-thumbs">{photos.map((photo, photoIndex) => <button key={photo} className={photoIndex === index ? "is-active" : ""} onClick={() => setIndex(photoIndex)} aria-label={`${product.name} image ${photoIndex + 1}`}><img src={photo} alt="" /></button>)}</div>}</div>; }
