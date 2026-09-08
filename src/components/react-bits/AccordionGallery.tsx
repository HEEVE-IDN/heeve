import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./AccordionGallery.css";

type GalleryItem = { image: string; label?: string; alt?: string };
type Props = {
  items: GalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  duration?: number;
  parallax?: number;
  tilt?: number;
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  onImageClick?: (index: number) => void;
};

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#635bff",
  overlayColor = "#0a1828",
  textColor = "#ffffff",
  height = 460,
  gap = 10,
  radius = 8,
  expandRatio = 0.52,
  duration = 0.9,
  parallax = 0.35,
  tilt = 4,
  showLabels = true,
  grayscale = false,
  className = "",
  onImageClick,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const labelRefs = useRef<(HTMLElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const mediaSizeRef = useRef(320);
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0)),
  );

  const applyLayout = useCallback(
    (animate: boolean) => {
      if (!items.length) return;
      const panels = panelRefs.current;
      const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = (ratio * (items.length - 1)) / (1 - ratio);
      timelineRef.current?.kill();
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      const durationValue = animate ? duration : 0;

      panels.forEach((panel, index) => {
        if (!panel) return;
        const selected = index === active;
        const media = mediaRefs.current[index];
        const label = labelRefs.current[index];
        const shift =
          Math.max(-1.5, Math.min(1.5, active - index)) *
          parallax *
          mediaSizeRef.current *
          0.06;
        timeline.to(
          panel,
          {
            flexGrow: selected ? grow : 1,
            rotateY: selected ? 0 : index < active ? tilt : -tilt,
            duration: durationValue,
            ease: "power2.inOut",
            overwrite: "auto",
          },
          0,
        );
        if (media) {
          timeline.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: selected ? 0 : shift,
              filter: `grayscale(${grayscale && !selected ? 1 : 0})`,
              opacity: selected ? 1 : 0.65,
              duration: durationValue,
              ease: "power2.inOut",
              overwrite: "auto",
            },
            0,
          );
        }
        if (label) {
          timeline.to(
            label,
            {
              opacity: selected && showLabels ? 1 : 0,
              x: selected ? 0 : -12,
              duration: durationValue,
              ease: "power2.inOut",
              overwrite: "auto",
            },
            0,
          );
        }
      });
      timelineRef.current = timeline;
    },
    [
      active,
      duration,
      expandRatio,
      grayscale,
      items.length,
      parallax,
      showLabels,
      tilt,
    ],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const width = Math.max(root.clientWidth - gap * (items.length - 1), 120);
      mediaSizeRef.current = Math.max(
        140,
        width * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22,
      );
      root.style.setProperty("--ag-media-size", `${mediaSizeRef.current}px`);
      applyLayout(false);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => {
      observer.disconnect();
      timelineRef.current?.kill();
    };
  }, [applyLayout, expandRatio, gap, items.length]);

  if (!items.length) return null;

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${className ? ` ${className}` : ""}`}
      style={
        {
          "--ag-accent": accentColor,
          "--ag-overlay": overlayColor,
          "--ag-text": textColor,
          "--ag-gap": `${gap}px`,
          "--ag-radius": `${radius}px`,
          height: `${height}px`,
        } as React.CSSProperties
      }
      role="list"
      aria-label="Product image gallery"
    >
      {items.map((item, index) => (
        <div
          key={`${item.image}-${index}`}
          ref={(element) => {
            panelRefs.current[index] = element;
          }}
          className={`ag-panel${active === index ? " ag-panel--active" : ""}`}
          onMouseEnter={() => setActive(index)}
          onPointerEnter={() => setActive(index)}
          onPointerMove={() => setActive(index)}
          onFocus={() => setActive(index)}
          onClick={() => setActive(index)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown")
              setActive((index + 1) % items.length);
            if (event.key === "ArrowLeft" || event.key === "ArrowUp")
              setActive((index - 1 + items.length) % items.length);
          }}
          role="listitem"
          tabIndex={0}
          aria-label={item.label}
        >
          <span className="ag-panel__frame">
            <span
              className="ag-panel__media"
              ref={(element) => {
                mediaRefs.current[index] = element;
              }}
            >
              <img
                src={item.image}
                alt={item.alt ?? item.label ?? ""}
                draggable={false}
                onClick={(event) => {
                  event.stopPropagation();
                  onImageClick?.(index);
                }}
              />
            </span>
            <span className="ag-panel__overlay" aria-hidden="true" />
          </span>
          {showLabels && (
            <span
              className="ag-panel__label"
              ref={(element) => {
                labelRefs.current[index] = element;
              }}
              aria-hidden="true"
            >
              <span className="ag-panel__bar" />
              <span className="ag-panel__text">{item.label}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
