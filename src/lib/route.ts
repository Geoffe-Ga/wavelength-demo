export type Route = "home" | "reference";

/** Map a URL hash (e.g. "#reference" or "#/reference") to a route. */
export function parseRoute(hash: string): Route {
  return hash.replace(/^#\/?/, "").toLowerCase() === "reference"
    ? "reference"
    : "home";
}
