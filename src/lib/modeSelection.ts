import { MODES, type Mode } from "../data/modes";

// On a narrow phone the wave keeps its shape, so each phase label has to fit in
// a small card on the curve. Modes whose copy is short enough are shown; the
// wordy ones are reserved for desktop.
export const MOBILE_MAX_PHASE_LEN = 22;

/** True when every phase's copy is short enough for the mobile wave. */
export function fitsMobile(mode: Mode, maxLen = MOBILE_MAX_PHASE_LEN): boolean {
  return Object.values(mode.phases).every((s) => s.length <= maxLen);
}

export const MOBILE_MODES: Mode[] = MODES.filter((m) => fitsMobile(m));

/** The set of modes to show for the current layout. */
export function selectModes(isMobile: boolean): Mode[] {
  return isMobile ? MOBILE_MODES : MODES;
}
