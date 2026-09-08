import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  "aria-hidden": true,
  ...props,
});

export function BurgerIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M1.5 4h13M1.5 8h13M1.5 12h13" strokeLinecap="square" />
    </svg>
  );
}

export function SearchIcon(props: P) {
  return (
    <svg {...base(props)}>
      <circle cx="7" cy="7" r="4.6" />
      <path d="M10.6 10.6 14.5 14.5" strokeLinecap="square" />
    </svg>
  );
}

export function CompassIcon(props: P) {
  return (
    <svg {...base(props)}>
      <circle cx="8" cy="8" r="6.5" />
      <polygon
        points="10.8,5.2 6.8,7.2 5.2,10.8 9.2,8.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: P) {
  return (
    <svg
      {...base(props)}
      fill="currentColor"
      stroke="none"
      viewBox="0 0 24 24"
      width={16}
      height={16}
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.275-.1-.475-.15-.675.15-.2.301-.776.98-.951 1.18-.175.2-.35.226-.651.075s-1.272-.469-2.423-1.496c-.896-.799-1.5-1.786-1.676-2.086-.175-.3-.019-.462.132-.612.136-.135.301-.35.451-.525.15-.175.2-.3.301-.5.101-.2.05-.375-.025-.525s-.675-1.627-.925-2.228c-.244-.585-.492-.506-.675-.515l-.576-.01c-.2 0-.525.075-.8.375s-1.05 1.026-1.05 2.503 1.076 2.903 1.226 3.104c.15.2 2.118 3.234 5.131 4.536.717.31 1.277.495 1.714.634.72.229 1.375.197 1.893.12.578-.087 1.78-.727 2.03-1.428.251-.701.251-1.302.176-1.428-.075-.125-.276-.2-.577-.35zM12.04 2C6.518 2 2.03 6.485 2.03 12.008c0 1.986.583 3.847 1.597 5.421L2 22l4.73-1.55c1.516.924 3.284 1.458 5.31 1.458 5.522 0 10.01-4.485 10.01-10.008C22.05 6.485 17.562 2 12.04 2zm0 18.238c-1.764 0-3.398-.535-4.757-1.451l-.341-.231-2.815.923.94-2.744-.253-.369A8.19 8.19 0 0 1 3.86 12.01c0-4.512 3.67-8.18 8.18-8.18 4.512 0 8.181 3.668 8.181 8.18 0 4.513-3.669 8.238-8.181 8.238z" />
    </svg>
  );
}

export function PinIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M8 1.5c-2.6 0-4.7 2-4.7 4.6 0 3.4 4.7 8.4 4.7 8.4s4.7-5 4.7-8.4c0-2.6-2.1-4.6-4.7-4.6Z" />
      <circle cx="8" cy="6" r="1.8" />
    </svg>
  );
}

export function BagIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M3 5h10l.8 9.5H2.2L3 5Z" />
      <path d="M5.6 7V4.4a2.4 2.4 0 0 1 4.8 0V7" />
    </svg>
  );
}

export function ArrowBoldLeftIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M14.5 8h-13M6 3.5 1.5 8 6 12.5" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowBoldRightIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M1.5 8h13M10 3.5 14.5 8 10 12.5" strokeLinecap="square" />
    </svg>
  );
}

export function PauseIcon(props: P) {
  return (
    <svg
      {...base(props)}
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="currentColor"
      stroke="none"
    >
      <rect x="3" y="2" width="3" height="10" />
      <rect x="8" y="2" width="3" height="10" />
    </svg>
  );
}

export function PlayIcon(props: P) {
  return (
    <svg
      {...base(props)}
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="currentColor"
      stroke="none"
    >
      <path d="M3 1.5 12 7 3 12.5V1.5Z" />
    </svg>
  );
}

export function CloseIcon(props: P) {
  return (
    <svg {...base(props)}>
      <path d="M3 3l10 10M13 3 3 13" strokeLinecap="square" />
    </svg>
  );
}
