import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FoldText.css";

gsap.registerPlugin(ScrollTrigger);

type SplitBy = "char" | "word" | "line";
type Hinge = "top" | "bottom" | "left" | "right";
type Trigger = "mount" | "hover" | "scroll" | "loop";

export interface FoldTextProps {
  text?: string;
  splitBy?: SplitBy;
  hinge?: Hinge;
  duration?: number;
  stagger?: number;
  ease?: string;
  perspective?: number;
  creaseShading?: number;
  trigger?: Trigger;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const hinges = {
  top: { origin: "50% 0%", rotateX: -92, rotateY: 0 },
  bottom: { origin: "50% 100%", rotateX: 92, rotateY: 0 },
  left: { origin: "0% 50%", rotateX: 0, rotateY: 92 },
  right: { origin: "100% 50%", rotateX: 0, rotateY: -92 },
} satisfies Record<Hinge, { origin: string; rotateX: number; rotateY: number }>;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
const whitespace = (value: string, key: string): ReactNode[] =>
  value.split(/(\n)/).map((part, index) =>
    part === "\n" ? (
      <br key={`${key}-br-${index}`} />
    ) : part ? (
      <span className="fold-text-whitespace" key={`${key}-space-${index}`}>
        {part.replace(/ /g, "\u00a0")}
      </span>
    ) : null,
  );

export default function FoldText({
  text = "Design unfolds",
  splitBy = "char",
  hinge = "top",
  duration = 0.65,
  stagger = 0.045,
  ease = "power3.out",
  perspective = 700,
  creaseShading = 0.55,
  trigger = "mount",
  fontSize = 80,
  fontWeight = 800,
  color = "#f7f2e8",
  className = "",
  style = {},
}: FoldTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const config = hinges[hinge];
  const crease = clamp(creaseShading, 0, 1);
  const safePerspective = Math.max(120, perspective);
  const segments = useMemo(() => {
    let count = 0;
    const segment = (
      content: string,
      key: string,
      split: SplitBy = splitBy,
    ) => (
      <span
        className="fold-text-segment"
        data-fold-split={split}
        key={key}
        style={
          { "--fold-perspective": `${safePerspective}px` } as CSSProperties
        }
      >
        <span
          className="fold-text-piece"
          data-fold-hinge={hinge}
          style={
            {
              transformOrigin: config.origin,
              "--fold-crease": 0,
            } as CSSProperties
          }
        >
          {content || "\u00a0"}
        </span>
      </span>
    );
    if (splitBy === "line")
      return text.split("\n").map((line, index) => (
        <span className="fold-text-line" key={`line-${index}`}>
          {segment(line || "\u00a0", `line-${index}`, "line")}
        </span>
      ));
    if (splitBy === "word")
      return text
        .split(/(\s+)/)
        .flatMap((part, index) =>
          !part
            ? []
            : /^\s+$/.test(part)
              ? whitespace(part, `ws-${index}`)
              : segment(part, `word-${count++}`),
        );
    return Array.from(text).map((char, index) =>
      char === "\n" ? (
        <br key={`br-${index}`} />
      ) : (
        segment(char === " " ? "\u00a0" : char, `char-${index}`)
      ),
    );
  }, [text, splitBy, hinge, config.origin, safePerspective]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const pieces = Array.from(
      root.querySelectorAll<HTMLElement>(".fold-text-piece"),
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const from = {
      opacity: 0,
      rotateX: reduced ? 0 : config.rotateX,
      rotateY: reduced ? 0 : config.rotateY,
      "--fold-crease": reduced ? 0 : crease,
      transformOrigin: config.origin,
      force3D: true,
    };
    const to = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      "--fold-crease": 0,
      duration: reduced ? Math.min(duration, 0.22) : duration,
      ease: reduced ? "power1.out" : ease,
      stagger: reduced ? Math.min(stagger, 0.02) : stagger,
      clearProps: "willChange",
    };
    const kill = () => {
      timelineRef.current?.kill();
      gsap.killTweensOf(pieces);
    };
    const play = (loop = false) => {
      kill();
      timelineRef.current = gsap
        .timeline({ repeat: loop ? -1 : 0, repeatDelay: loop ? 0.75 : 0 })
        .fromTo(pieces, from, to);
    };
    if (trigger === "hover") {
      const onHover = () => play();
      gsap.set(pieces, { ...to, duration: 0 });
      root.addEventListener("mouseenter", onHover);
      return () => {
        root.removeEventListener("mouseenter", onHover);
        kill();
      };
    }
    if (trigger === "scroll") {
      gsap.set(pieces, from);
      const scroll = ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        once: true,
        onEnter: () => play(),
      });
      return () => {
        scroll.kill();
        kill();
      };
    }
    play(trigger === "loop");
    return kill;
  }, [
    config,
    crease,
    duration,
    ease,
    hinge,
    perspective,
    stagger,
    text,
    trigger,
  ]);

  return (
    <span
      ref={rootRef}
      className={`fold-text ${className}`.trim()}
      style={
        {
          "--fold-text-font-size":
            typeof fontSize === "number" ? `${fontSize}px` : fontSize,
          "--fold-text-font-weight": fontWeight,
          "--fold-text-color": color,
          ...style,
        } as CSSProperties
      }
    >
      <span className="fold-text-sr-only">{text}</span>
      <span className="fold-text-visual" aria-hidden="true">
        {segments}
      </span>
    </span>
  );
}
