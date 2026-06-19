// The Archetypal Wavelength — data model.
//
// Every mode below is sourced from the "Expanded List" sheet of
// "The Archetypal Wavelength" spreadsheet, filtered to the rows marked "Y"
// in the "Include in wavelength-demo?" column. The `mode` and `phases` values
// are quoted from that sheet; `title` and `gloss` are editorial framing for
// the promo page.

export const PHASES = [
  'Rising',
  'Peaking',
  'Withdrawal',
  'Diminishing',
  'Bottoming Out',
  'Restoration',
] as const

export type Phase = (typeof PHASES)[number]

export type PhaseMap = Record<Phase, string>

// AQAL-style quadrants used in the source sheet.
export type QuadrantId = 'I' | 'IT' | 'WE' | 'ITS'

export interface Quadrant {
  id: QuadrantId
  label: string
  blurb: string
  color: string
}

export const QUADRANTS: Record<QuadrantId, Quadrant> = {
  I: { id: 'I', label: 'Individual · Interior', blurb: 'mind & feeling', color: '#8a6aa0' },
  IT: { id: 'IT', label: 'Individual · Exterior', blurb: 'body & behavior', color: '#3f8e88' },
  WE: { id: 'WE', label: 'Collective · Interior', blurb: 'culture & relationship', color: '#c0567f' },
  ITS: { id: 'ITS', label: 'Collective · Exterior', blurb: 'systems & history', color: '#bf942f' },
}

export interface Mode {
  /** Original "General Vibe" label from the sheet. */
  mode: string
  /** Editorial headline for the passing white bar. */
  title: string
  /** One-line framing shown under the headline. */
  gloss: string
  /** Attribution, when the sheet named an originator. */
  source?: string
  quadrant: QuadrantId
  phases: PhaseMap
}

// The canonical wavelength: the phases naming themselves. Shown on the hero.
export const CANONICAL: PhaseMap = {
  Rising: 'Rising',
  Peaking: 'Peaking',
  Withdrawal: 'Withdrawal',
  Diminishing: 'Diminishing',
  'Bottoming Out': 'Bottoming Out',
  Restoration: 'Restoration',
}

// One-line description of what each phase *is*, used in the hero legend.
export const PHASE_BLURBS: PhaseMap = {
  Rising: 'Energy gathers and lifts. The expansion begins.',
  Peaking: 'The crest. Fullness, intensity, the top of the arc.',
  Withdrawal: 'The turn. What expanded starts to recede.',
  Diminishing: 'The long descent. Momentum drains away.',
  'Bottoming Out': 'The trough. The lowest, most contracted point.',
  Restoration: 'The quiet return. Energy collects for the next rise.',
}

// Ordered for narrative flow: intimate & familiar first, widening to the
// cosmic and civilizational.
export const MODES: Mode[] = [
  {
    mode: 'Addiction',
    title: 'The Addiction Wavelength',
    gloss: 'The using, the bliss, the crash, the craving — and around again.',
    quadrant: 'IT',
    phases: {
      Rising: 'Using',
      Peaking: 'Bliss',
      Withdrawal: 'Come down',
      Diminishing: 'Hangover',
      'Bottoming Out': 'Depression',
      Restoration: 'Craving',
    },
  },
  {
    mode: 'Dopamine Reward System',
    title: 'The Dopamine Wavelength',
    gloss: 'The same loop your brain runs every time it chases a reward.',
    quadrant: 'IT',
    phases: {
      Rising: 'Initial trigger for dopamine release',
      Peaking: 'Peak pleasure or reward',
      Withdrawal: 'Dopamine levels begin to decline',
      Diminishing: 'Cravings for more stimulation',
      'Bottoming Out': 'Dopamine crash or low',
      Restoration: 'New trigger, dopamine release cycle restarts',
    },
  },
  {
    mode: 'External Validation Loop',
    title: 'The Validation Wavelength',
    gloss: 'Making something, basking in it, then refreshing for the next hit.',
    quadrant: 'I',
    phases: {
      Rising: 'Increasing creativity, productivity, inspiration, downloads and resonance',
      Peaking: 'Basking in the glory of the thing created',
      Withdrawal:
        'Beginning to feel unsure whether your creation is as good as you thought it was immediately after creating it',
      Diminishing:
        'Feeling totally down on yourself, refreshing Likes and Views looking for a hit of validation',
      'Bottoming Out':
        'Attempting to get validation from a specific person you have a genuine relationship with',
      Restoration:
        "Feeling the vibe again, like bass from a subwoofer you're sitting on — whether from that person or within you",
    },
  },
  {
    mode: 'Flow State',
    title: 'The Flow Wavelength',
    gloss: 'Focus rising, full immersion, the interruption, the return.',
    source: 'Mihaly Csikszentmihalyi',
    quadrant: 'I',
    phases: {
      Rising: 'Rising focus and engagement',
      Peaking: 'Full immersion in the flow state',
      Withdrawal: 'Distraction or external interruption',
      Diminishing: 'Loss of focus or energy',
      'Bottoming Out': 'Complete break from flow',
      Restoration: 'Return to focus or new creative flow',
    },
  },
  {
    mode: 'Mindful Breathing',
    title: 'The Breath Wavelength',
    gloss: 'The whole cycle is right here, once every few seconds.',
    quadrant: 'IT',
    phases: {
      Rising: 'Inhale end',
      Peaking: 'Hold in',
      Withdrawal: 'Exhale begin',
      Diminishing: 'Exhale end',
      'Bottoming Out': 'Hold out',
      Restoration: 'Inhale begin',
    },
  },
  {
    mode: 'Hormonal Cycle (Menstrual Cycle)',
    title: 'The Hormonal Wavelength',
    gloss: 'A month-long wave of rising, peaking, and renewal.',
    quadrant: 'IT',
    phases: {
      Rising: 'Follicular phase (increasing estrogen)',
      Peaking: 'Ovulation (peak fertility and hormone levels)',
      Withdrawal: 'Luteal phase (declining hormones)',
      Diminishing: 'PMS symptoms (energy and mood dip)',
      'Bottoming Out': 'Menstruation (low hormones, fatigue)',
      Restoration: 'Follicular phase begins again',
    },
  },
  {
    mode: 'Season',
    title: 'The Wavelength of the Seasons',
    gloss: 'The oldest wave we know: summer to winter and back to spring.',
    quadrant: 'IT',
    phases: {
      Rising: 'Summer',
      Peaking: 'Solstice',
      Withdrawal: 'Fall',
      Diminishing: 'Winter',
      'Bottoming Out': 'Solstice',
      Restoration: 'Spring',
    },
  },
  {
    mode: 'Distraction Cycle',
    title: 'The Distraction Wavelength',
    gloss: 'How attention wanders away from the breath — and finds its way back.',
    quadrant: 'IT',
    phases: {
      Rising: 'Redirecting attention to the breath at the nose',
      Peaking: 'Meditative absorption',
      Withdrawal: 'Distraction',
      Diminishing: 'Forgetting',
      'Bottoming Out': 'Mind wandering',
      Restoration: '"Waking up"',
    },
  },
  {
    mode: 'Likeliest of the Buddhist Five Hindrances',
    title: 'The Wavelength of the Five Hindrances',
    gloss: 'The classic obstacles to practice, each waiting at its place on the wave.',
    quadrant: 'IT',
    phases: {
      Rising: 'Worldly desire',
      Peaking: '',
      Withdrawal: 'Agitation due to worry or remorse',
      Diminishing: 'Doubt',
      'Bottoming Out': 'Aversion',
      Restoration: 'Laziness or lethargy',
    },
  },
  {
    mode: 'Buddhist Realms',
    title: 'The Wavelength of the Six Realms',
    gloss: 'From the human to the gods to the hells — a turn of the wheel.',
    quadrant: 'ITS',
    phases: {
      Rising: 'Human',
      Peaking: 'Deva (Gods)',
      Withdrawal: 'Asura (Demigods)',
      Diminishing: 'Preta (Hungry Ghosts)',
      'Bottoming Out': 'Naraka (Hell Realm)',
      Restoration: 'Animal',
    },
  },
  {
    mode: 'Hindu Yugas',
    title: 'The Wavelength of the Yugas',
    gloss: 'A golden age decaying to iron, then dissolving back to creation.',
    quadrant: 'ITS',
    phases: {
      Rising: 'Srishti (Creation)',
      Peaking: 'Satya Yuga (Golden Age)',
      Withdrawal: 'Treta Yuga (Silver Age)',
      Diminishing: 'Dvapara Yuga (Bronze Age)',
      'Bottoming Out': 'Kali Yuga (Iron Age)',
      Restoration: 'Mahapralaya (Dissolution)',
    },
  },
  {
    mode: 'Narrative',
    title: 'The Narrative Wavelength',
    gloss: 'Abundance breeds indulgence breeds scarcity breeds resilience.',
    quadrant: 'ITS',
    phases: {
      Rising: 'Abundance begins to create Indulgence',
      Peaking: 'Abundance peaks',
      Withdrawal: 'Indulgence creates Scarcity',
      Diminishing: 'Scarcity begins to create Resilience',
      'Bottoming Out': 'Scarcity peaks',
      Restoration: 'Resilience creates Abundance',
    },
  },
  {
    mode: 'Discord Server Dynamics',
    title: 'The Community Wavelength',
    gloss: 'Every group you have ever loved has ridden this exact arc.',
    quadrant: 'WE',
    phases: {
      Rising: 'Excitement and enthusiasm about a new group or community',
      Peaking: 'A sense of belonging or alignment, where things seem to be working',
      Withdrawal: 'Tensions or conflicts arise, triggering discomfort or alienation',
      Diminishing: 'Attempts to avoid conflict or disengage',
      'Bottoming Out': 'Crisis or breakdown in the group dynamic',
      Restoration:
        'Reconciliation, understanding, and healing through open communication or shared vulnerability',
    },
  },
  {
    mode: 'Subcultural Movements',
    title: 'The Subculture Wavelength',
    gloss: 'A scene forms, peaks, gets mainstreamed, fades — and seeds the next.',
    quadrant: 'WE',
    phases: {
      Rising: 'Formation of subculture with shared meaning',
      Peaking: 'Heightened cultural relevance and unity',
      Withdrawal: 'Mainstreaming or dilution of identity',
      Diminishing: 'Fragmentation or commercialization',
      'Bottoming Out': 'Subculture fades into obscurity',
      Restoration: 'Birth of new subcultural movement',
    },
  },
  {
    mode: 'Enshittification',
    title: 'The Enshittification Wavelength',
    gloss: 'Why every platform you love eventually turns on you.',
    source: 'Cory Doctorow',
    quadrant: 'IT',
    phases: {
      Rising: '"First, platforms are good to their users',
      Peaking: 'a golden age for users that is empowering and enjoyable',
      Withdrawal: 'then they abuse their users to make things better for their business customers',
      Diminishing:
        'finally, they abuse those business customers to claw back all the value for themselves',
      'Bottoming Out': 'Then, they die."',
      Restoration: 'A new platform arises and everyone migrates to it',
    },
  },
  {
    mode: 'Malthusian Growth',
    title: 'The Malthusian Wavelength',
    gloss: 'Growth outruns its resources, collapses, and slowly recovers.',
    quadrant: 'ITS',
    phases: {
      Rising: 'Rapid Growth',
      Peaking: 'Peak Resource Utilization',
      Withdrawal: 'Overpopulation',
      Diminishing: 'Resource Depletion',
      'Bottoming Out': 'Collapse',
      Restoration: 'Recovery',
    },
  },
  {
    mode: 'Asabiyyah Theory',
    title: 'The Asabiyyah Wavelength',
    gloss: 'Social cohesion builds an empire, comfort dissolves it, a new group rises.',
    source: 'Ibn Khaldun',
    quadrant: 'ITS',
    phases: {
      Rising: 'Strong Social Cohesion (Asabiyyah)',
      Peaking: 'Dominance',
      Withdrawal: 'Luxury and Comfort',
      Diminishing: 'Loss of Cohesion',
      'Bottoming Out': 'Collapse',
      Restoration: 'New Group with Asabiyyah',
    },
  },
  {
    mode: 'Cliodynamics',
    title: 'The Cliodynamics Wavelength',
    gloss: 'Cooperation, peak power, inequality, crisis — the math of history.',
    source: 'Peter Turchin',
    quadrant: 'ITS',
    phases: {
      Rising: 'Social Cooperation',
      Peaking: 'Peak Power and Expansion',
      Withdrawal: 'Inequality and Resource Strain',
      Diminishing: 'Internal Conflict',
      'Bottoming Out': 'Crisis / Collapse',
      Restoration: 'New Social / Political Configuration',
    },
  },
  {
    mode: 'Krebs Cycle',
    title: 'The Krebs Wavelength',
    gloss: 'Even your cells turn the wheel — energy made one revolution at a time.',
    quadrant: 'ITS',
    phases: {
      Rising: 'Citrate → Isocitrate (isomerization)',
      Peaking: 'Isocitrate → α-Ketoglutarate + CO₂',
      Withdrawal: 'α-Ketoglutarate → Succinyl-CoA + CO₂',
      Diminishing: 'Succinyl-CoA → Succinate + ATP',
      'Bottoming Out': 'Succinate → Fumarate → Malate → Oxaloacetate',
      Restoration: 'Acetyl-CoA + Oxaloacetate → Citrate',
    },
  },
]
