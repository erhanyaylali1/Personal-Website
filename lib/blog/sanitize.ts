import "server-only";
import sanitizeHtml from "sanitize-html";

// The editor only produces this subset; anything else is dropped on save so a pasted <script>,
// onerror= or javascript: URL can never reach a public page.

const COLOR = [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i];
/** Family names only: no parentheses or semicolons, so no url() and nothing that can load a resource. */
const FONT_FAMILY = [/^[\w\s,"'-]{1,120}$/];
const FONT_SIZE = [/^\d{1,2}(\.\d{1,2})?(px|rem|em)$/];
/** Media width as % of the text column (set by the resize handles). */
const WIDTH = [/^(1[5-9]|[2-9]\d|100)%$/];
const widthValues = Array.from({ length: 86 }, (_, i) => String(i + 15));
const mediaAttrs = [
  "src",
  "style",
  { name: "data-width", multiple: false, values: widthValues },
  { name: "data-align", multiple: false, values: ["left", "right"] },
];

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
      "a", "ul", "ol", "li", "blockquote", "code", "pre", "hr",
      "mark", "span", "img", "div", "iframe", "video", "audio",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: [...mediaAttrs, "alt", "title", "loading", "decoding"],
      video: [...mediaAttrs, "controls", "preload", "playsinline", "poster"],
      audio: [...mediaAttrs, "controls", "preload", "title"],
      mark: ["data-color", "style"],
      span: ["style"],
      p: ["style"],
      h2: ["style"],
      h3: ["style"],
      h4: ["style"],
      div: ["data-youtube-video"],
      iframe: ["src", "width", "height", "allowfullscreen", "allow", "title", "frameborder"],
    },
    allowedStyles: {
      img: { width: WIDTH },
      video: { width: WIDTH },
      audio: { width: WIDTH },
      "*": {
        color: COLOR,
        "background-color": COLOR,
        "font-family": FONT_FAMILY,
        "font-size": FONT_SIZE,
        "text-align": [/^(left|right|center|justify)$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["https", "http"], video: ["https", "http"], audio: ["https", "http"] },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href ?? "";
        const out: Record<string, string> = { href };
        if (/^https?:\/\//.test(href)) {
          out.target = "_blank";
          out.rel = "noopener noreferrer nofollow";
        }
        return { tagName, attribs: out };
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy", decoding: "async" } }),
      // Always playable, never autoplaying; only metadata is fetched until the reader presses play.
      video: (tagName, attribs) => ({ tagName, attribs: { ...attribs, controls: "", playsinline: "", preload: "metadata" } }),
      audio: (tagName, attribs) => ({ tagName, attribs: { ...attribs, controls: "", preload: "metadata" } }),
    },
  });
}
