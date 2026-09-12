# SLOP8223 — implementation plan

The decisions are in `CLAUDE.md`; this is the order of work and the state of
it. Due **noon, Monday 21 September 2026**.

## Where the marks are

Legibility of process 45%, response to the brief 35%, working artefact 20%.
The artefact criterion asks whether the site works, not what it looks like —
a course that keeps the starter's look but reads as one coherent, compelling
course can land in HD on every criterion. **Content before styling**, and if
time runs out, styling is what gets cut.

## Order of work

Content first, non-linearly, because the marker reads non-adjacent weeks.

1. **Harness and skeleton** — done. Course record, twelve dated weeks with
   claims and constraints, three assessments, spec checks green.
2. **Weeks 1, 6, 9, 12** — four deliberately different intellectual modes:
   thesis, systems analysis, counter-intuitive tactical argument, design
   critique. Write them, then read them side by side. **If they already feel
   repetitive, fix the curriculum before writing anything else.**
3. **Weeks 3, 5, 10** — the choice-and-adaptation group, the three most likely
   to collapse into each other. Guard the distinction deliberately.
4. **Weeks 2, 4, 7, 8, 11** — the remainder.
5. **Assessment briefs** — three bodies against frontmatter already in place.
6. **Week 1 deck** — a real argument, not the week 1 page as slides.
7. **Policies, convener, home page, course overview, schedule** — done. The
   starter's empty `sessions` collection was deleted rather than filled; a
   `/schedule/` page carries the twelve weeks and three due dates instead.
8. **Remaining spec checks** — done, in `spec/evidence-discipline.test.ts`.
   Naked statistics, weak week titles, required metadata, assessment shape.
9. **Visual system** — tokens, typography, editorial patterns. Only now.
10. **QA** — marker simulation, responsive, contrast, consistency audit.
11. **Ship** — public, Pages, verify the deployed URL.
12. **PROCESS.md** — last, from the real history.

## Editorial patterns

Four or five shared shapes, so weeks feel like one course without being twelve
clones:

| pattern | shape | weeks |
| --- | --- | --- |
| Argument | claim → argument → evidence → counterargument → conclusion | 1, 12 |
| Decision analysis | scenario → options → variables → analysis → principle | 3, 4, 5, 10 |
| System diagram | overview → roles and zones → annotated example → failure case | 6, 7 |
| Timeline | before → trigger → decision window → outcome → consequences | 8, 9 |
| Comparative state | ahead / even / behind, and how one action changes value | 2, 11 |

## Still to build

**Content** — written. Twelve week bodies, three assessment briefs, the week 1
deck, policies (with the bespoke patch rule), Spike's entry, home page and
schedule are all in place.

**Checks** — written. `pnpm check` is green; `pnpm check:evidence` still fails
on `PROCESS.md`, which is written last and by design.

**Data** — not built, deliberately. No figure was ever retrieved from Hexdata,
so under the harness's own rule no figure may be published, and a `data/`
snapshot with nothing in it would be theatre. The twelve weeks argue about what
statistics can and cannot license instead of quoting any, which is the honest
version of the same lesson. `spec/evidence-discipline.test.ts` now enforces the
condition under which that could change: any statistic added later must carry a
source and a patch, or say it is hypothetical.

**Artwork** — the four constraints as an icon set, reused on every week page so
one visual decision pays out twelve times. Hero and card are in place.

**Not building** — accounts, persistence, a live Riot API, a playable match, a
build calculator, a recommendation engine, a forum, progression, quizzes.

## Priorities if time runs short

- **P0** — deployed site, twelve weeks, assessment totalling 100%, a real deck,
  working navigation, `pnpm check` and `pnpm check:evidence` green.
- **P1** — curriculum coherence, distinct claims, home page, evidence
  discipline, assessment quality, policies, `CLAUDE.md`, the remaining spec
  checks.
- **P2** — diagrams, refined responsive detail, richer source presentation.
- **P3** — animation, filtering, decoration.

Never trade P0 or P1 for P3.

## Ship

The repo stays **private until the cutoff**; both CI jobs are gated on it being
public, so `pnpm check` is the only feedback loop until then and the deployed
URL cannot be verified until the repo is flipped. Ship with hours to spare, not
minutes.

## The ten-minute test

Before submitting, read the deployed site as a stranger. Home, then two
non-adjacent weeks, an assessment, the deck, policies, at both viewports.

Can I say what this course is and what it believes? Are two random weeks
intellectually different? Is there real evidence? Does the assessment test the
curriculum? Is the deck a lecture rather than another web page? Does the whole
thing behave like one credible course?
