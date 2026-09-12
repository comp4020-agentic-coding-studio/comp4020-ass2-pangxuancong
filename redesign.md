# VISUAL_REDESIGN.md

# SLOP8223 — The Hand You're Dealt

## Visual & Motion Redesign Specification

---

## 0. Purpose

This document defines the second-stage visual and motion redesign for:

**SLOP8223 — The Hand You're Dealt**

The existing site is already functionally complete and should **not** be rebuilt
from scratch.

The goal of this redesign is to reduce the current "generic university template"
feeling and introduce a more distinctive visual identity inspired by the
editorial, cinematic, and motion-led presentation of Riot Games.

The redesign should preserve the academic credibility of the course while giving
the site the visual confidence of a game-system publication or premium campaign
site.

The intended result is:

> **Riot-level visual drama + university-level structural clarity**

## 1. Core Visual Position

The final design should be: cinematic; editorial; high contrast; academically
structured; visually aggressive without becoming noisy; game-aware without
becoming a fan site; animated without becoming gimmicky.

The target balance is:

**70% academic editorial structure**
**20% game UI / system visual language**
**10% cinematic motion**

Do not invert this ratio. The site must still read clearly as a university
course.

## 2. Riot Inspiration — What to Borrow

**Use:** oversized typography; full-bleed imagery; image-first sections; strong
section-to-section pacing; clear transitions between visual "scenes"; restrained
motion; cinematic hero sections; editorial composition; asymmetric layouts;
sharp hierarchy; intentional negative space; strong image cropping; subtle
environmental motion; confident typography; layered visual storytelling.

**Do not copy:** Riot page layouts; Riot navigation; Riot typography; Riot
motion timing exactly; Riot component structure; Riot page transitions exactly;
Riot logos as the site identity; Riot's website visual assets unless
specifically required.

The objective is visual reference, not imitation.

## 3. Existing Identity That Must Be Preserved

Course code **SLOP8223**; title **The Hand You're Dealt**; central thesis **You
don't need better rolls. You need better decisions.**; convenor **Spike**;
prerequisite **SLOP6108 — League of Legends: Mechanics and Systems**; the
ARAM: Mayhem subject; the 12-week course structure; the black/yellow primary
visual identity; existing hero artwork; existing card artwork; assessment
structure; information architecture; existing academic content.

Do not change the intellectual structure of the course during this visual
redesign.

## 4. Visual Design Principle

> **Every section should have a visual reason to exist.**

**Avoid:** repeated white/dark cards; generic 3-column layouts; repeated rounded
rectangles; neutral academic template spacing everywhere; pages where every
section looks structurally identical.

**Instead:** scene changes; scale shifts; full-width sections; editorial
asymmetry; dominant visual statements; vertical rhythm; alternating density;
occasional image-led sections; strong visual contrast between argument, data and
evidence.

## 5. Global Colour System

```css
:root {
  --bg-primary: #090909;
  --bg-secondary: #111111;
  --bg-elevated: #191919;
  --bg-soft: #222222;

  --text-primary: #f4f1e8;
  --text-secondary: #a8a8a0;
  --text-muted: #74746f;

  --accent-yellow: #f3b700;
  --accent-yellow-bright: #ffc928;
  --accent-yellow-soft: #d89f00;

  --border-subtle: #2b2b2b;
  --border-strong: #464646;
}
```

Starting points; may be adjusted for accessibility.

## 6. Secondary "Prismatic" Accent System

Black/yellow remains the default. Prismatic colours appear only for: Augments;
randomness; transmutation; high-impact decision changes; Mayhem-specific
mechanics; Prismatic rarity.

```css
--prismatic-violet: #9d5cff;
--prismatic-cyan: #49d7ff;
--prismatic-magenta: #f45de4;
--prismatic-blue: #4f7dff;
--prismatic-gold: #f8d76a;
```

Do not use all of these simultaneously in normal UI.

## 7. Colour Semantics

**Yellow** — course structure, navigation, metadata, week numbering, academic
hierarchy, calls to action, key rules.

**Prismatic** — randomness, Augments, system disruption, changing states,
high-variance moments, Mayhem-specific mechanics.

**Red** — failure state, danger, negative examples, critical warning. Never
decorative.

## 8. Typography — Display

Heavy, condensed or strong grotesk sans-serif, for claims, page titles, section
statements and large week headings. Editorial, authoritative, compressed,
high-impact.

```txt
DEATH CAN BE
THE CORRECT PLAY.
```

## 9. Body Typography

Neutral sans-serif, moderate line-height, readable line length, strong contrast.
`max-width: 68ch`.

## 10. Metadata Typography

Smaller mono or condensed sans for patch labels, source labels, week numbers,
dates and small system annotations: `PATCH 16.17`, `SOURCE: HEXDATA`,
`DECISION 09`.

## 11. Layout Philosophy

Asymmetric split sections; full-width image sections; oversized text blocks;
edge-aligned content; occasional overlapping media; constrained text columns;
data strips; large negative space; deliberate section height variation. The site
should feel authored, not templated.

## 12. Hero Redesign

`min-height: 90vh`; desktop may approach 100vh. The strongest visual moment on
the site.

## 13. Hero Composition

**Left / foreground:** `SLOP8223` / `THE HAND YOU'RE DEALT` / the thesis.
**Background / right:** existing hero artwork, deliberate crop, dark gradient
overlay, depth separation, slight parallax.

## 14. Hero Motion

Background from `scale(1.04)` / `opacity: .9` to `scale(1)` / `opacity: 1` over
900–1400ms.

## 15. Hero Text Entrance

Stagger, 70–120ms apart: label → first title line → second title line → thesis →
metadata / CTA. `translateY(20px)`. No bouncing.

## 16. Hero Parallax

Optional, extremely subtle: 8–16px maximum. Separate layers where possible. The
text does not move independently.

## 17. Hero Ambient Motion

One or two only: slow drifting snow; subtle prismatic dust; extremely slow
shimmer. The hero must remain readable.

## 18. Home Page Scene Structure

Scene-based pacing, not hero → card grid → description → card grid → footer.

1. **Hero** — full visual impact.
2. **Thesis** — full black, very large statement: `THE GAME TAKES CHOICES AWAY.`
3. **Constraints** — four large text blocks (`CHAMPION`, `MAP`, `RECALL`,
   `CONTROL`), staggered, not four identical cards.
4. **Turn** — `SO WHERE DOES SKILL GO?`, then the course thesis.
5. **Decision Sequence** — the twelve weeks as one match progression:
   ROLL → READ → REROLL → AUGMENT → BUILD → COMPOSE → POSITION → COMMIT → DIE →
   ADAPT → SURVIVE → QUESTION. A system pipeline, not a card grid.
6. **Augment Break** — full-width media, `SOMETIMES THE GAME CHANGES THE RULES.`
7. **Assessment** — structured academic layout. Assignment 1 — 25%,
   Assignment 2 — 25%, Final — 50%.
8. **Convenor** — minimal, academic.

## 19. Navigation Redesign

`SLOP8223` / COURSE, WEEKS, ASSESSMENTS, LECTURE, POLICIES / `ENTER COURSE`.

## 20. Navigation Behaviour

At top: transparent or semi-transparent, overlaying the hero. After scroll:
solid near-black, subtle border-bottom, slight backdrop blur allowed.

## 21. Navigation Hover

A horizontal yellow bar via `scaleX(0)` → `scaleX(1)`. Not a generic underline.

## 22. Main CTA

Rectangular, yellow, black text, no pill shape, sharp or minimal radius. Avoid
rounded "startup SaaS" buttons.

## 23. Week Page Redesign

```txt
DECISION 09

DEATH CAN BE
THE CORRECT PLAY.
```

Not `Week 9 / Death Timing`.

## 24. Week Header Structure

`DECISION 09` / `WEEK 9` / the claim / a one-line setup. Optionally a large
background number, cropped artwork, subtle scene texture.

## 25. Week Visual Variants

Four to five page types, not one structure twelve times.

## 26. Type A — Editorial Argument

Weeks 1 and 12. Claim → large statement → evidence → counterargument →
conclusion. Large typography, minimal cards, wide sections.

## 27. Type B — Decision Analysis

Weeks 3, 4, 5, 10. Scenario → available choices → data → trade-offs → decision
principle. Side-by-side comparison, data strips, system annotations.

## 28. Type C — System Map

Weeks 6 and 7. Diagram, role map, spatial composition, annotated lane. Visual
explanation over multiple cards.

## 29. Type D — Timeline

Weeks 8 and 9. BEFORE → TRIGGER → DECISION WINDOW → OUTCOME → RESET, with an
animated progress line on scroll.

## 30. Type E — State Comparison

Week 11. AHEAD / EVEN / BEHIND, showing how one action changes value in each.

## 31. Week Progress Navigation

A persistent course progression element — horizontal on desktop, vertical on
mobile — over the twelve decisions. Current week yellow, previous muted grey,
future dark grey.

## 32. Week-to-Week Footer

`PREVIOUS DECISION` / `NEXT DECISION`, with the decision's number and claim:

```txt
NEXT DECISION
10 — THE CORRECT BUILD SHOULD CHANGE MID-GAME
```

## 33. Card Redesign

Reduce generic rounded cards to a small set of deliberate styles.

## 34. Editorial Card

Dark background, oversized number or word, strong yellow accent, minimal border.

## 35. Image Card

Image fills most of the card, text overlays the bottom, strong gradient, square
or near-square corners.

## 36. Data Card

Typography dominates: the figure, what it measures, then `PATCH` and `SOURCE`.

## 37. Quote / Counterargument Block

Inverted: yellow background, black text. Its purpose is to challenge the page's
own argument.

## 38. Scenario Panel

A game-state analysis board — champion, health, gold, items, Augments, team
state — with modular labels, not a generic card.

## 39. Data Visualisation

Horizontal bars, rank strips, percentile bars, win-rate indicators, change
arrows, patch badges. No charts for decoration.

## 40. Augment Presentation

Prismatic border, subtle chromatic edge, gentle shimmer, richer hover state.
Non-Augment content stays black/yellow.

## 41. Prismatic Border Effect

```css
background:
  linear-gradient(#111, #111) padding-box,
  linear-gradient(120deg, #49d7ff, #9d5cff, #f45de4, #f8d76a) border-box;
border: 1px solid transparent;
```

Do not animate constantly.

## 42. Prismatic Hover

Gradient shifts slightly, tiny scale, slight glow, 250–350ms. No rainbow
cycling.

## 43. Background Atmosphere

Low-opacity layers: lane geometry (2–5%); snow (cinematic sections only);
prismatic fragments (Augment sections only); large faded numbers.

## 44. Section Dividers

Oversized number transition; yellow block; image crop; short label; large
negative space; directional arrow; one-line statement. Not a horizontal rule
everywhere.

## 45. Motion System

```css
:root {
  --motion-fast: 160ms;
  --motion-medium: 320ms;
  --motion-slow: 700ms;
  --ease-standard: cubic-bezier(.22, 1, .36, 1);
}
```

## 46. Scroll Reveal

`opacity: 0; transform: translateY(24px)` → `opacity: 1; transform: none`, over
600–750ms.

## 47. Stagger Reveal

Hero text, constraint labels, week progression, data items. 60–120ms delay.
Avoid long sequences.

## 48. Card Hover

`translateY(-4px)`, optionally `scale(1.01)`. No larger motion.

## 49. Image Hover

`scale(1.03)` over 500–700ms; the container stays fixed.

## 50. Data Animation

Bar growth, count-up, progress reveal — on entering the viewport, never looping.

## 51. Timeline Animation

Weeks 8 and 9: line growth, node activation, label reveal on scroll. No
elaborate choreography.

## 52. Ambient Motion

Hero and selected cinematic sections only. Never global.

## 53. Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables or minimises parallax, scroll
reveals, count-up, hover transforms and ambient particles. The site stays fully
usable.

## 54. Animation Performance

Prefer `transform` and `opacity`. Avoid animating width/height, heavy blur,
large box-shadows, or complex canvas without justification.

## 55. Homepage Typography Moments

`THE GAME TAKES CHOICES AWAY.` / `SO WHERE DOES SKILL GO?` / `YOU DON'T NEED
BETTER ROLLS.` / `YOU NEED BETTER DECISIONS.` / `SOMETIMES THE GAME CHANGES THE
RULES.` Use as scene anchors, never consecutively.

## 56. Week 9 Special Redesign

Title `DEATH CAN BE THE CORRECT PLAY.` Opening scenario as large system data,
then a split comparison: `STAY ALIVE?` / `DIE NOW?`

## 57. Week 9 Timeline

Current state → safe exit window → death → respawn → purchase complete → next
fight, animated on scroll. This should visually demonstrate the concept.

## 58. Week 12 Special Redesign

`IS ARAM BALANCED, OR MERELY CORRECTED?` Patch-style labels, modifier tables,
before/after comparisons, system diagrams. More analytical than tactical.

## 59. Lecture Deck Visual Integration

Black background, yellow labels, large typography, one visual idea per slide,
strong scenario framing. Never website sections shrunk into slides.

## 60. Assessment Pages

More structured than weekly pages: title, subtitle, weight, then brief,
deliverables, criteria, rubric, submission. Yellow for weight, due date and
section headers. Do not over-animate.

## 61. Course Overview

Clear and academic, with one stronger visual block: `THIS COURSE IS NOT A TIER
LIST.`

## 62. Source Presentation

Compact evidence style — `SOURCE` / `PATCH` as labelled pairs. No bare URLs in
the body.

## 63. Patch Labels

A dedicated component: small, yellow border, black background, mono.

## 64. Buttons

Rectangular, bold, minimally rounded, high contrast. Primary yellow on black
text; secondary transparent with yellow border. No pills, gradients or gloss.

## 65. Icons

Sparingly: arrows, source indicators, patch tag, assessment status, deck link.

## 66. Borders

1px subtle grey by default; yellow for emphasis; prismatic for Augments only.
Not every box needs one.

## 67. Spacing

Large sections spacious, data blocks compact, body text readable. Not equal
padding everywhere.

## 68. Section Height Variation

100vh hero, medium argument sections, compact data strips, tall artwork breaks,
dense assessment sections. Variation creates pacing.

## 69. Image Treatment

Intentional crop, edge bleed, gradient mask, partial overlap. Images integrated
into the layout, not placed in it.

## 70. Hero Artwork Treatment

Full bleed, dark gradient from left or bottom, slight zoom, intentional focal
point. Title text stays legible.

## 71. Augment Artwork

A major section break: full-width media block, `SOMETIMES THE GAME CHANGES THE
RULES.` Not a generic background everywhere.

## 72. Card Artwork Treatment

Course identity, catalogue section, selected promotional card. Do not repeat
excessively.

## 73. Mobile Design

The cinematic style must survive mobile. Do not simply shrink the desktop
layout.

## 74. Mobile Hero

Crop aggressively, move text to lower-left, reduce title size, preserve line
breaks, disable parallax.

## 75. Mobile Week Pages

Horizontal progression → vertical rail; split layouts → stacked; large data
blocks → one or two columns; oversized numbers → background watermark.

## 76. Mobile Typography

`font-size: clamp(3rem, 10vw, 8rem)`. No horizontal overflow.

## 77. Mobile Cards

One column. Horizontal scroll only when semantically justified.

## 78. Accessibility

Strong contrast; focus visibility; semantic heading order; keyboard navigation;
descriptive alt text; reduced motion; readable body size. Cinematic design must
not reduce usability.

## 79. Anti-Template Rules

Remove: repeated 3-card grids; default rounded cards; excessive centred text;
generic hero + paragraph layout; identical section padding; generic "Learn more"
buttons; repeated icons; unnecessary shadow cards; university blue/grey
remnants.

## 80. Anti-Gaming-Site Rules

Avoid: constant neon glow; futuristic HUD everywhere; RGB gradients everywhere;
fake stat meters on every page; excessive fantasy fonts; animated backgrounds in
all sections; glowing borders on every component; esports scoreboard styling.

## 81. Page Rhythm Rule

Each major page contains at least three different visual modes — cinematic,
editorial, analytical — not four cards in a row.

## 82. Visual Priority Order

**Highest:** homepage hero; homepage thesis sections; week page headers; week 9;
week 12; navigation; course progression; augment sections.
**Medium:** assessments; course overview; sources; footer.
**Lowest:** small decorative elements; hover polish; additional animations.

## 83. Recommended Implementation Order

1. Global tokens
2. Typography
3. Navigation
4. Homepage hero
5. Homepage scene structure
6. Week header system
7. Course progression
8. Card redesign
9. Week 9 timeline
10. Week 12 analysis layout
11. Augment styling
12. Assessment pages
13. Background atmosphere
14. Scroll reveal system
15. Hover motion
16. Mobile adaptation
17. Accessibility pass
18. Performance pass

## 84. Visual QA Checklist

**Identity** — does the site immediately feel like SLOP8223? Is black/yellow
dominant? Is prismatic colour reserved for relevant content?
**Riot influence** — cinematic and editorial, without copying Riot literally?
**Academic clarity** — is course information still easy to find? Are assessments
and policies readable?
**Motion** — does motion reinforce hierarchy? Any distracting loops?
**Pages** — does week 3 feel different from week 10? Does week 9 communicate
time? Does week 12 communicate systems analysis?
**Template reduction** — are generic card grids reduced? Are layouts varied?
**Performance** — is scrolling smooth? Do images load efficiently?
**Mobile** — does the site remain intentional on small screens?

## 85. Marker Simulation

Visit in order: Home, Week 3, Week 9, Week 12, Assignment 2, Lecture Deck,
Policies. Ask:

1. Does this feel like one coherent visual system?
2. Does each page have a distinct visual role?
3. Is the site still clearly a university course?

**If the answer to the third question becomes "no", the redesign has gone too
far.**

## 86. Final Visual Standard

> a serious game-systems course published with the visual confidence of a
> premium game studio

Not a university template with League colours, and not a League fan site with
fake university labels. Cinematic on first impression, analytical while reading,
structured when navigating, restrained when interacting.

## 87. Final Design Motto

> **Make the argument feel visible.**

Every visual choice should help communicate constraint, choice, risk, adaptation
or system change. If a visual element does not support one of those, question
whether it belongs.
