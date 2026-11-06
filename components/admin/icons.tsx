const PATHS = {
  undo: ["M9 14 4 9l5-5", "M4 9h11a5 5 0 0 1 0 10h-3"],
  redo: ["m15 14 5-5-5-5", "M20 9H9a5 5 0 0 0 0 10h3"],
  link: ["M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5", "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5"],
  image: ["M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M9 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z", "m21 15-5-5L5 21"],
  video: ["M3 7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", "m17 10 4-2.5v9L17 14"],
  audio: ["M9 18V5l12-2v13", "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", "M18 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  mic: ["M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z", "M19 11a7 7 0 0 1-14 0", "M12 18v3"],
  stop: ["M7 7h10v10H7z"],
  bulletList: ["M9 6h11M9 12h11M9 18h11", "M4.5 6h.01M4.5 12h.01M4.5 18h.01"],
  orderedList: ["M10 6h10M10 12h10M10 18h10", "M4 4.5h1.5V9.5", "M6.5 19.5H4l2.3-2.6a1.2 1.2 0 1 0-2.1-1"],
  quote: ["M6 17c2-1 3-3 3-6V7H5v4h4", "M15 17c2-1 3-3 3-6V7h-4v4h4"],
  code: ["m8 8-4 4 4 4", "m16 8 4 4-4 4"],
  rule: ["M4 12h16"],
  alignLeft: ["M4 6h16M4 12h10M4 18h14"],
  alignCenter: ["M4 6h16M7 12h10M5 18h14"],
  alignRight: ["M4 6h16M10 12h10M6 18h14"],
  alignJustify: ["M4 6h16M4 12h16M4 18h16"],
  clear: ["M4 7V5h12v2", "M10 5 7 19", "M5 19h5", "m15 14 5 5m0-5-5 5"],
  highlight: ["m9 11-6 6v3h9l3-3", "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"],
  chevron: ["m6 9 6 6 6-6"],
  plus: ["M12 5v14M5 12h14"],
  external: ["M14 4h6v6", "M20 4 10 14", "M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"],
  trash: ["M4 7h16", "M9 7V4h6v3", "M6 7l1 13h10l1-13"],
  edit: ["M4 20h4L19 9l-4-4L4 16z", "m13 7 4 4"],
  upload: ["M12 15V4", "m7 9 5-5 5 5", "M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"],
  eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"],
  logout: ["M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3", "M10 17l-5-5 5-5", "M5 12h11"],
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className = "size-[18px]" }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {PATHS[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
