import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MutableRefObject,
  type RefObject,
} from "react";
import { computeWaveState } from "../lib/scroll";

export interface RevealPanel {
  /** True while the hero (canonical) copy should show, before any reveal zone. */
  canonical: boolean;
  /** Index of the dominant reveal zone. */
  index: number;
}

export interface WaveReveal {
  /** Attach to each reveal zone, in order, via `revealRefs.current[i] = el`. */
  revealRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  /** The copy layer whose opacity is driven imperatively from scroll position. */
  cardsRef: RefObject<HTMLDivElement>;
  /** Which panel is dominant right now. */
  panel: RevealPanel;
}

/**
 * Scroll-driven reveal state shared by the home and reference pages. Every frame
 * it measures each reveal zone's distance from the viewport center, writes the
 * copy layer's opacity straight onto the DOM (no per-frame React render), and
 * reports which panel is dominant — re-rendering only when that choice changes.
 *
 * Lives in a `.tsx` file because it is React/DOM-coupled: like the presentational
 * components, it is exercised by the build, not by the node unit tests (the pure
 * decision logic it leans on, `computeWaveState`, is covered directly).
 *
 * @param count - Number of reveal zones currently mounted.
 * @returns Refs to wire up and the dominant panel.
 */
export function useWaveReveal(count: number): WaveReveal {
  const revealRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState<RevealPanel>({
    canonical: true,
    index: 0,
  });
  const countRef = useRef(count);
  countRef.current = count;

  const update = useCallback(() => {
    const vh = window.innerHeight;
    const centers: number[] = [];
    for (let i = 0; i < countRef.current; i++) {
      const el = revealRefs.current[i];
      if (!el) {
        centers.push(Number.POSITIVE_INFINITY);
        continue;
      }
      const rect = el.getBoundingClientRect();
      centers.push(rect.top + rect.height / 2);
    }
    const state = computeWaveState(window.scrollY, vh, centers);

    if (cardsRef.current)
      cardsRef.current.style.opacity = String(state.opacity);

    setPanel((prev) => {
      if (state.canonical)
        return prev.canonical ? prev : { canonical: true, index: prev.index };
      return !prev.canonical && prev.index === state.index
        ? prev
        : { canonical: false, index: state.index };
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // Re-measure when the reveal-zone count changes (e.g. desktop <-> mobile).
  }, [update, count]);

  return { revealRefs, cardsRef, panel };
}
