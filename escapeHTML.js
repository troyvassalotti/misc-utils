/**
 * Escapes HTML content.
 *
 * @param {string} unsafe HTML content that needs escaping.
 * @returns {string} Escaped HTML.
 */
export function escapeHTML(unsafe) {
  return unsafe.replace(/[&<"']/g, function (m) {
    switch (m) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case '"':
        return "&quot;";
      default:
        return "&#039;";
    }
  });
}
