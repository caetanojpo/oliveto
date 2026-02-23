/**
 * Generates the Content Security Policy (CSP) string based on the environment.
 * @param {boolean} isDev - Whether the environment is development.
 * @param {string} [apiUrl] - The API URL to allow connections to.
 * @returns {string} The CSP string.
 */
export function getCsp(isDev, apiUrl) {
  const connectSrc = `connect-src 'self' ${apiUrl ? apiUrl : ""} https://*.vercel-analytics.com https://*.vercel-insights.com${
    isDev ? " http://localhost:8080 ws://localhost:*" : ""
  }`;
  return `default-src 'self'; script-src 'self' 'unsafe-inline'${
    isDev ? " 'unsafe-eval'" : ""
  } https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; ${connectSrc}; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;`;
}
