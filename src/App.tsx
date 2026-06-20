import { useEffect, useState } from "react";
import { parseRoute } from "./lib/route";
import { HomePage } from "./pages/HomePage";
import { ReferencePage } from "./pages/ReferencePage";

export default function App() {
  const [route, setRoute] = useState(() =>
    parseRoute(typeof window !== "undefined" ? window.location.hash : ""),
  );

  useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return route === "reference" ? <ReferencePage /> : <HomePage />;
}
