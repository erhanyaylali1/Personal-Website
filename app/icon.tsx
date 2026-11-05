import { ImageResponse } from "next/og";

// Google Search shows a site's favicon only if it's square and a multiple of 48px;
// 192 and 512 are the sizes browsers use when installing the site.
const sizes = [48, 96, 192, 512] as const;

export function generateImageMetadata() {
  return sizes.map((s) => ({ id: String(s), size: { width: s, height: s }, contentType: "image/png" }));
}

export default async function Icon({ id }: { id: Promise<string | number> }) {
  const s = Number(await id);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#121317",
          color: "#f2f1ee",
          borderRadius: s * 0.22,
          fontSize: s * 0.47,
          fontWeight: 600,
          letterSpacing: "-0.06em",
        }}
      >
        EY
      </div>
    ),
    { width: s, height: s },
  );
}
