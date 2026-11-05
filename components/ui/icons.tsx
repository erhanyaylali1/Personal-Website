import type { SVGProps } from "react";

const Svg = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  />
);

export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M7 17 17 7M8 7h9v9" /></Svg>
);
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></Svg>
);
export const Download = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></Svg>
);
export const Copy = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 0 1 2-2h8" /></Svg>
);
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="m5 12 5 5 9-10" /></Svg>
);
export const Sun = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Svg>
);
export const Moon = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></Svg>
);
export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
);
export const Close = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
);
export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="m15 6-6 6 6 6" /></Svg>
);
export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="m9 6 6 6-6 6" /></Svg>
);
export const MapPin = (p: SVGProps<SVGSVGElement>) => (
  <Svg {...p}><path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></Svg>
);
