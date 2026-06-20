import { MODES, type Mode } from "../data/modes";

// The narrow mobile wave shows a curated subset of modes (those flagged
// `mobile` in the data) so each phase label fits on the curve.
export const MOBILE_MODES: Mode[] = MODES.filter((m) => m.mobile);

/** The set of modes to show for the current layout. */
export function selectModes(isMobile: boolean): Mode[] {
  return isMobile ? MOBILE_MODES : MODES;
}
