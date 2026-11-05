// Terminal prompt mark (`>_`): teal chevron + off-white cursor on the site's dark surface.
// Drawn as vector strokes rather than text so it stays crisp at 16px and needs no font.
const c = { bg: "#121317", fg: "#f2f1ee", accent: "#5fd3c4" };

export function BrandMark({ size, rounded = true, scale = 1 }: { size: number; rounded?: boolean; scale?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx={rounded ? 7 : 0} fill={c.bg} />
      <g transform={`translate(16 16) scale(${scale}) translate(-16 -16)`} fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 10.5 14 16l-5.5 5.5" stroke={c.accent} />
        <path d="M17 21.5h6.5" stroke={c.fg} />
      </g>
    </svg>
  );
}
