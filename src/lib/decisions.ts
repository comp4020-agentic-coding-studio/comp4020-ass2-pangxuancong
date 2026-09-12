// The twelve weeks as one match: the decision each week is about, in the order
// the game forces them. This is the course's own argument made addressable —
// the curriculum is ordered by the decision sequence rather than by difficulty,
// and a reader who sees ROLL → READ → REROLL … → QUESTION has been told that
// before reading a single week.
//
// The verbs are navigation, not new vocabulary: the course's fixed terms stay
// the four constraint slugs in CLAUDE.md §1. Nothing here invents a fifth.
export interface Decision {
  week: number;
  /** The verb, used on the progression rail and in week headers. */
  verb: string;
  /** What the decision is, for a rail tooltip and the accessible name. */
  gloss: string;
}

export const DECISIONS: readonly Decision[] = [
  { week: 1, verb: "Roll", gloss: "the hand you are dealt" },
  { week: 2, verb: "Read", gloss: "what the champion can be made to do" },
  { week: 3, verb: "Reroll", gloss: "whether to trade what you hold" },
  { week: 4, verb: "Augment", gloss: "which offered option fits this game" },
  { week: 5, verb: "Build", gloss: "what to buy before you can buy again" },
  { week: 6, verb: "Compose", gloss: "the win condition nobody drafted" },
  { week: 7, verb: "Position", gloss: "space in a single lane" },
  { week: 8, verb: "Commit", gloss: "the fight you cannot decline" },
  { week: 9, verb: "Die", gloss: "when death buys more than it costs" },
  { week: 10, verb: "Adapt", gloss: "when the plan stops being right" },
  { week: 11, verb: "Survive", gloss: "playing from behind" },
  { week: 12, verb: "Question", gloss: "whether the mode is well designed" },
];

const byWeek = new Map(DECISIONS.map((d) => [d.week, d]));

export const decisionFor = (week: number): Decision | undefined => byWeek.get(week);

/** `DECISION 09` — zero-padded, because the rail reads as a sequence. */
export const decisionNumber = (week: number): string => String(week).padStart(2, "0");
