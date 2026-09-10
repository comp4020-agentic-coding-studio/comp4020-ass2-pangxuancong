# SLOP8223 — working rules

The course this repo builds is **SLOP8223 — HEX ARAM: The Hand You're Dealt**,
a Slop University course on decision-making inside a mode that takes your
choices away. These are the rules the work is held to. They are not style
preferences: most of them exist because something went wrong once, or because
`spec/course-promises.test.ts` will fail without them.

## 1. The thesis, and the four constraints

The course argues one thing:

> Removing choice does not remove strategy. It relocates it.

Stated for a student: **you don't need better rolls, you need better
decisions.** Skill here is not memorising the strongest champion, augment or
item. It is recognising when the correct decision has changed.

The mode takes away exactly four things. They are the course's spine and its
fixed vocabulary — **use these slugs, never invent a fifth**:

| slug | what is taken away |
| --- | --- |
| `no-pick` | you do not choose your champion |
| `no-recall` | you cannot retreat and reset at will |
| `one-lane` | there is no map to rotate around |
| `forced-contact` | you cannot decline the fight |

Every teaching week names at least one in its frontmatter. A week that names
none has drifted off the course.

The course consistently separates three different things, and says which it
means: **receiving** a strong option, **recognising** a strong option, and
**recognising when a normally strong option is wrong here**.

Positions the course rejects, and should be seen rejecting: always take the
highest-win-rate augment; always follow the recommended build; good champions
make good compositions; death is always a mistake; playing from behind means
playing the same way more carefully; ARAM is balanced because Riot applies
balance modifiers.

## 2. Curriculum rules

The twelve weeks follow **the sequence of decisions the game forces on a
player**, from the moment the mode removes ordinary choice to the point where
the student can criticise the mode's design.

Never organise by difficulty. No `Augments 101` paired with
`Advanced Augment Synergies`, no `Basic Itemisation` paired with
`Advanced Counter-Building`. Splitting one subject by difficulty is how twelve
weeks turn into six repeated twice.

**The marker reads non-adjacent weeks.** Before accepting any week, ask: if
someone opens week 3 and week 10 back to back, do these teach genuinely
different decisions? If not, the fix is the curriculum, not the prose.

**Course, not guide.** A guide supplies answers. This supplies arguments,
evidence, competing readings, trade-offs, assessment and system critique.
Whenever a page reduces to *pick X, its win rate is higher*, rewrite it as
*under what conditions does X's population-level advantage become the better
decision in this game?*

## 3. What every teaching week must carry

Frontmatter, all enforced by `spec/course-promises.test.ts`:

```yaml
title: "..."        # quote it — see §7
week: 1..12         # one lecture per week, no gaps, dates ascending
date: YYYY-MM-DD    # Tuesdays; see the calendar in §7
claim: "..."        # one disputable sentence, unique across all twelve weeks
constraints:        # one or more slugs from §1, nothing else
  - no-pick
readings:           # optional; no source may appear in more than three weeks
  - "..."
```

`claim` is a proposition a reasonable person could argue with, not a topic
label. *This week covers augments* is not a claim. *A statistically stronger
augment can still be the wrong pick* is.

Body, in whatever editorial shape suits the week:

1. the claim, and why the decision it describes is hard
2. the mechanism — why it works that way
3. at least one concrete game state, with champions named
4. evidence, sourced and patch-labelled where it is patch-dependent
5. a counterargument that complicates the week's own headline
6. a takeaway

Do not reuse one page skeleton twelve times. Build four or five editorial
patterns — argument, decision analysis, system diagram, timeline, comparative
state — and let each week take the one that fits.

## 4. Voice

Spike, the convener, is an academic who studies game systems. Analytical,
concise, occasionally provocative, evidence-aware, uninterested in motivation.

> A win-rate table tells you what happened across thousands of games. It does
> not tell you what to do in this one.

Not a streamer, not a coach selling improvement, not Riot marketing, not an
assistant. Never:

- "Get ready to level up your ARAM skills"
- "In this week, students will learn…"
- "By mastering these concepts…"
- dynamic, immersive, cutting-edge, exciting, revolutionary, unlock, dive into

Roughly nine parts sincere analysis to one part dry humour, and the humour
comes from treating an absurd subject with total seriousness — never from
memes, Twitch slang or winking at the reader. Policies stay straight-faced
throughout.

Every substantial paragraph does at least one of: make a claim, explain a
mechanism, give evidence, qualify a claim, compare alternatives, analyse a
scenario. If it does none of those, cut it.

## 5. Evidence

Approved sources: **Hexdata** (`hexdata.com.cn`) for augment win rates and
rankings, **Riot Developer Portal / Data Dragon** for structured champion and
item data, **CommunityDragon** for assets and ARAM-specific data missing from
Data Dragon, and Riot first-party patch notes and developer writing for design
claims. Where a statistical dataset and Riot first-party material disagree,
Riot wins on rules and configuration; the dataset stays observational.

Classify every factual statement and treat it accordingly:

- **stable game concept** — armour mitigates physical damage. Light citation.
- **patch-dependent value** — a win rate, a modifier. Must carry source *and*
  patch.
- **Riot design claim** — cite Riot first-party material.
- **course interpretation** — Spike's argument. Mark it as argument.

Never present a win rate as causal strength. Whenever statistics carry weight,
account for patch, sample size, pick-rate and selection effects, player skill,
survivorship, and conditional versus global rates. A population-strong augment
can still be a bad pick here — that gap is most of the course.

**Never fabricate** win rates, pick rates, augment descriptions, champion
modifiers, item statistics, patch numbers or Riot statements. If a number
cannot be verified, write conceptually or use a clearly labelled hypothetical.
Hypotheticals are fine for teaching; they must never be dressed as measurements.

Data used by the site is a dated snapshot committed to the repo, not a live
dependency, and it records `source`, `patch` and `retrieved`.

## 6. Assessment

Exactly three graded components and nothing else — no quizzes, participation,
attendance or hidden components:

| | weight | rests on |
| --- | --- | --- |
| Assignment 1 | 25% | weeks 2–5 |
| Assignment 2 | 25% | weeks 6–10 |
| Final | 50% | weeks 1–12 |

Each names the weeks it rests on through `related:`, and is never due before
the last of them has been taught. All three are marked on the same four
criteria, and the weighting is the argument: **Quality of reasoning under
uncertainty 40, Identification of the real trade-off 30, Use of evidence 20,
Clarity of the account 10.**

The course grades the argument for a decision, never whether the decision won.
A well-argued defence of a losing choice earns full marks. Never grade on
matching Spike's answer.

## 7. Facts about this repo that are easy to get wrong

- **Quote any YAML title containing a colon.** `title: Augments: the second
  draft` fails the build with `bad indentation of a mapping entry` and a line
  number pointing at the wrong place. This has already cost time once.
- **The teaching calendar** is twelve Tuesdays: weeks 1–6 on 21 Jul, 28 Jul,
  4 Aug, 11 Aug, 18 Aug, 25 Aug; a two-week break; weeks 7–12 on 15 Sep,
  22 Sep, 29 Sep, 6 Oct, 13 Oct, 20 Oct. `endDate` is 20 November so the final
  falls inside the assessment period.
- **`related:` is how a page cites another.** It is the graph edge, it renders
  on both pages, and it is what the assessment checks read.
- **The `course` record is a strict schema.** Unknown keys are rejected at
  config load — that is why `coursePrerequisite` sits beside `courseMeta`
  rather than inside it.
- **`learningOutcomes` is required** in this repo's schema, though the
  integration defaults it to empty. A course that cannot say what a student
  leaves with is not finished.
- **Deleting content needs the cache cleared.** Removing a collection entry
  leaves it in `node_modules/.astro/data-store.json`, and the build then fails
  on references to files that no longer exist. `rm -rf .astro dist
  node_modules/.astro/data-store.json` and rebuild.
- **Astro's `base`** makes every asset path absolute under `/<repo>/`. It looks
  fine locally and 404s on the deployed URL if it is wrong.

## 8. Do not re-check what the platform already checks

`spec/` is for promises **this course** makes that the build cannot see.
Already covered, and not to be duplicated:

- internal links and base-path correctness (`astro-broken-links-checker`, the
  theme's base check)
- accessibility (the theme runs axe over every page at build)
- cross-collection references (`reference("people")` fails the build)
- leftover starter content and unresolvable commit citations
  (`pnpm check:evidence` greps `STARTER_CONTENT` and verifies every SHA)
- per-assessment marking criteria summing to 100 (the content schema)

What `spec/` owns instead: the provisioned course code, twelve ungapped weeks
in date order, a lecture carrying a real deck, assessment totalling 100% and
never due before the weeks it cites, every week tied to a constraint with a
claim of its own, no reading leaned on more than three times — and, still to
come, no naked statistic without source and patch, and no week titled with
`101`, `Introduction to`, `Advanced`, `Basics of` or `Review`.

## 9. Restraint

The sophistication of this project comes from course design and argument, not
feature count. Do not build a combat simulator, a playable match, a build
calculator, a recommendation engine, drag-and-drop composition tools, accounts,
persistence, a forum, progression, or quizzes on every page. Reading,
navigating, comparing and following sources is the whole interaction budget;
small affordances like tabs or filters are fine when they genuinely clarify.

Riot assets may appear where they aid comprehension — a champion, item or
augment icon in a case study. The site must never look like an official Riot
page, must not reproduce the client interface, and must carry a short notice
that League of Legends is Riot's. SLOP8223 and Slop University stay the primary
identity.

## 10. Visual direction

High-contrast black and amber editorial. The lineage to draw on is **industrial
hazard signage** for the colour logic, **Swiss editorial poster typography**
for the scale jumps and grid, and **brutalist web** for flat blocking and the
absence of decoration. Roughly seven parts university course to three parts
game subject; never the reverse.

Near-black grounds, warm off-white body text, restrained grey secondary text,
one saturated amber accent used for metadata, labels, emphasis, callouts,
links and rules — not poured over every component. Heavy display sans for
claims and week numbers, a neutral readable sans for prose, optional
monospace for patch labels and statistics. Claims behave like editorial
headlines: `DEATH CAN BE THE CORRECT PLAY.`

Avoid the default gaming look: cyberpunk purple, RGB gradients, glowing
borders, particles behind text, glassmorphism, esports tournament styling,
Discord-grey dark UI, fantasy display faces in body copy.

Amber on white is unreadable; the palette is dark-ground only. Contrast,
focus states, heading order and alt text still get checked by hand even though
axe runs in the build.

## 11. Process evidence

The commit history is read as evidence, so commit at the point a decision is
made, with a message that says what was decided and why. Small and frequent
beats a nightly dump.

`PROCESS.md` is written at the end, from what actually happened. **Never
fabricate development history, reasoning history or evaluation evidence**, and
never write a retrospective claim the commits do not support. The point of
committing decisions as they are made is that the account can be true.

## 12. Locked

Do not change without being asked: course code **SLOP8223** (the last three
digits were provisioned and are not ours), dual-coded with SLOP4223 at
undergraduate level; title **HEX ARAM: The Hand You're Dealt**; convener
**Spike**, `spike@slop.edu.au`, Game Systems & Decision-Making Lecturer;
prerequisite **SLOP6108 — League of Legends: Mechanics and Systems**; twelve
teaching weeks organised by the game's decision sequence; two assignments and
one final at **25 / 25 / 50**; the four constraint slugs; the deck on **week
1**; Hexdata, Data Dragon and CommunityDragon as the approved sources.

## 13. Before calling a page done

Does it unmistakably belong to SLOP8223? Is there a claim rather than a topic?
Could it be confused with another week? Are the factual claims traceable to a
source and a patch? Does it read as a university course rather than a build
guide? Does it sound like Spike? Does it hold the black-and-amber editorial
system without becoming gamer UI? Has decoration and interaction been kept
out? Can a student tell what they are expected to learn or do?

If several answers are no, fix it before moving on.
