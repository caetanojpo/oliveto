import DOMPurify from "isomorphic-dompurify";

// Add a hook to enforce rel="noopener noreferrer" for links opening in a new context
// This prevents reverse tabnabbing attacks (including named windows).
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.hasAttribute("target")) {
    const target = node.getAttribute("target")?.toLowerCase() || "";
    // These targets do NOT open a new browsing context that requires protection
    const safeTargets = ["_self", "_parent", "_top"];

    if (!safeTargets.includes(target)) {
      const rel = node.getAttribute("rel") || "";
      const parts = rel.split(/\s+/).filter(Boolean);

      let changed = false;
      if (!parts.includes("noopener")) {
        parts.push("noopener");
        changed = true;
      }
      if (!parts.includes("noreferrer")) {
        parts.push("noreferrer");
        changed = true;
      }

      if (changed) {
        node.setAttribute("rel", parts.join(" "));
      }
    }
  }

  // Enforce strict URI schemes
  // This prevents XSS via exotic protocols and restricts data: URIs
  if (node.tagName === "A" || node.tagName === "IMG") {
    ["href", "src"].forEach((attr) => {
      if (node.hasAttribute(attr)) {
        const value = node.getAttribute(attr);
        if (!value) return;

        // Check for scheme (starts with scheme:)
        const schemeMatch = value.match(/^\s*([a-zA-Z0-9+.-]+):/);
        if (schemeMatch) {
          const scheme = schemeMatch[1].toLowerCase();
          // Allow only specific safe schemes
          // Block ftp, javascript, vbscript, etc.
          const allowedSchemes = ["http", "https", "mailto", "tel"];

          // Allow data: URI only for images (src attribute)
          if (node.tagName === "IMG" && attr === "src") {
            allowedSchemes.push("data");
          }

          if (!allowedSchemes.includes(scheme)) {
            node.removeAttribute(attr);
          }
        }
      }
    });
  }
});

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Uses isomorphic-dompurify to work on both client and server.
 *
 * Configuration allows:
 * - Standard rich text tags (headings, paragraphs, lists, formatting)
 * - Images (with src, alt, title, width, height)
 * - Links (with href, target, rel)
 * - Inline styles (for text alignment, colors) - filtered by DOMPurify
 * - Tables
 */
export function sanitizeHtml(content: string | undefined | null): string {
  if (!content) return "";

  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "p", "br", "b", "i", "em", "strong", "u", "s", "strike", "del",
      "h1", "h2", "h3", "h4", "h5", "h6",
      "ul", "ol", "li", "dl", "dt", "dd",
      "blockquote", "pre", "code",
      "a", "img", "figure", "figcaption",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "div", "span", "hr"
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel",
      "src", "alt", "title", "width", "height",
      "align", "valign", "colspan", "rowspan"
    ],
    // ADD_ATTR: ["target"] is redundant as it's in ALLOWED_ATTR

    // Explicitly forbid potentially dangerous tags and attributes
    // Stripping style attribute to prevent CSS-based XSS (e.g. background-image: javascript:...)
    FORBID_TAGS: [
      "script", "iframe", "object", "embed", "form", "style",
      "base", "head", "link", "meta", "title"
    ],
    FORBID_ATTR: [
      "onmouseover", "onload", "onclick", "onerror",
      "action", "formaction"
    ],
  });
}
