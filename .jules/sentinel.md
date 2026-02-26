## 2024-05-23 - Next.js Static Export Security Headers
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) in a Next.js Static Export.
**Learning:** `next.config.js` headers configuration is ignored when using `output: "export"`. Security headers must be configured on the web server (e.g., via `.htaccess` for Apache, `vercel.json` for Vercel, or Nginx config).
**Prevention:** Always verify how the application is served (Static vs. Server) and apply security headers at the appropriate infrastructure layer. In this case, `.htaccess` was used.

## 2026-02-07 - Input Length Limits (Defense in Depth)
**Vulnerability:** Missing `maxLength` attributes on user input fields (Login, Articles, Tags). While server-side validation exists via Zod, lack of client-side limits allows sending excessively large payloads, potentially causing DoS or buffer issues, and misalignment with backend constraints.
**Learning:** Even with Zod schemas defining limits (e.g., `max(255)`), HTML inputs default to unlimited length unless explicitly constrained.
**Prevention:** Always mirror backend/schema length constraints to the frontend HTML `maxLength` attribute to provide immediate feedback and reduce server load.

## 2026-02-08 - Target Attribute Case Sensitivity (Defense in Depth)
**Vulnerability:** The HTML sanitizer hook for `rel="noopener noreferrer"` enforcement was case-sensitive, only checking for `target="_blank"`. This allowed links with `target="_BLANK"` (or other case variations) to bypass the protection, potentially exposing users to reverse tabnabbing attacks.
**Learning:** HTML attribute values are case-sensitive for frame names, but reserved keywords like `_blank` are case-insensitive in browser behavior. Security checks must account for this.
**Prevention:** Always normalize attribute values (e.g., `.toLowerCase()`) before checking against reserved keywords like `_blank`, `_self`, etc.

## 2026-02-08 - Missing Schema Length Validation for Email
**Vulnerability:** Missing `.max(255)` constraint on the email field in the `LoginSchema`. This could allow excessively large email strings to be processed, potentially leading to DoS or memory issues.
**Learning:** Zod `email()` validation does not implicitly limit the length of the string to standard email limits (254/255 characters).
**Prevention:** Always include a `.max()` constraint on all string fields in Zod schemas, especially those that accept user input, to enforce defense-in-depth and prevent DoS.

## 2026-02-09 - PII Exposure in Console Logs
**Vulnerability:** The `useContactForm` hook was logging the full error object to the console upon submission failure (`console.error(error)`). In Axios-based requests, this error object often contains the request configuration and data payload (including PII like name, email, phone), exposing sensitive user information in the browser console.
**Learning:** Standard error logging practices (`console.error(err)`) can inadvertently leak sensitive data when error objects contain request context.
**Prevention:** Always sanitize error logs. Log generic messages or specific error codes instead of raw error objects, especially in client-side code handling user input.

## 2026-02-12 - Zod URL Validation Gaps
**Vulnerability:** Zod's `.url()` validation allows schemes like `javascript:`, `data:`, and `vbscript:`, which can lead to XSS if the URL is used in a context that executes scripts (e.g., `href`, `src` with specific exploits).
**Learning:** `z.string().url()` only validates compliance with the URL standard, not safety. It does not enforce specific protocols like `http` or `https`.
**Prevention:** Always use `.refine()` or regex to strictly enforce allowed protocols (e.g., `^https?://`) when validating URLs that will be rendered or stored.

## 2026-02-14 - Inconsistent Security Headers Configuration
**Vulnerability:** Security headers (CSP, HSTS, X-Frame-Options) were defined in both `next.config.mjs` and `.htaccess`, but with inconsistencies (e.g., missing `upgrade-insecure-requests`, conflicting frame options). This creates potential security gaps depending on the deployment environment (Vercel vs. Apache).
**Learning:** When a project supports multiple deployment targets (e.g., Static Export via Apache and Vercel Edge), security configurations must be manually synchronized across all configuration files (`next.config.mjs`, `vercel.json`, `.htaccess`).
**Prevention:** Regularly audit all configuration files for consistency. Ideally, generate environment-specific configs from a single source of truth during the build process.

## 2026-02-20 - Reverse Tabnabbing via Named Targets
**Vulnerability:** The HTML sanitizer's `afterSanitizeAttributes` hook only enforced `rel="noopener noreferrer"` for `target="_blank"`. Links with named targets (e.g., `target="my_window"`) bypassed this check, allowing a newly opened page to access `window.opener` and potentially redirect the original page.
**Learning:** `target="_blank"` is not the only way to open a new browsing context. Any target name that isn't `_self`, `_parent`, or `_top` can trigger a new window/tab if the frame doesn't exist.
**Prevention:** Enforce `rel="noopener noreferrer"` for *all* links with a `target` attribute, unless the target is explicitly known to be safe (`_self`, `_parent`, `_top`).
