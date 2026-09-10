import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// What this course promises, held to by tests because the platform cannot hold
// us to any of it. The build already checks internal links, base paths,
// accessibility and `people` references; `check:evidence` already catches
// leftover starter content. None of that is repeated here --- every check below
// is a decision about SLOP8223 that only we can enforce.

// The last three digits arrived with the repo and are unique in the cohort;
// only the leading level digit was ours to pick. `src/course-config.ts` accepts
// any three digits, so this is what stops a stray edit renumbering the course.
const COURSE_CODE = "SLOP8223";

// The four things the mode takes away from the player. They are the spine of
// the course, so a teaching week that touches none of them has drifted off it.
const CONSTRAINTS = ["no-pick", "no-recall", "one-lane", "forced-contact"] as const;

const TEACHING_WEEKS = 12;

// A reading may anchor a few weeks. Past that it is filler standing in for a
// week that has nothing of its own to read.
const MAX_READING_REUSE = 3;

interface ApiNode {
  id: string;
  type: string;
  title: string;
  related?: string[];
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string; startDate: string; endDate: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

const byType = (type: string): ApiNode[] => api.nodes.filter((node) => node.type === type);
const dateOnly = (value: unknown): string => String(value).slice(0, 10);
const weekOf = (node: ApiNode): number => Number(node.meta?.week);
const asList = (value: unknown): string[] => (Array.isArray(value) ? value.map(String) : []);

const lectures = byType("lectures").sort((a, b) => weekOf(a) - weekOf(b));
const assessments = byType("assessments");
const ids = new Set(api.nodes.map((node) => node.id));

describe("course identity", () => {
  it("keeps the code this repo was provisioned with", () => {
    expect(api.course.code).toBe(COURSE_CODE);
  });
});

describe("the twelve teaching weeks", () => {
  it("runs weeks 1 to 12 with no gaps and no repeats", () => {
    const weeks = lectures.map(weekOf);
    const expected = Array.from({ length: TEACHING_WEEKS }, (_, i) => i + 1);
    expect(weeks, "one lecture per teaching week, numbered 1 to 12").toEqual(expected);
  });

  it("dates the weeks in the order it teaches them", () => {
    for (let i = 1; i < lectures.length; i += 1) {
      const previous = lectures[i - 1];
      const current = lectures[i];
      expect(
        dateOnly(current.meta?.date) > dateOnly(previous.meta?.date),
        `${current.id} is dated on or before ${previous.id}`,
      ).toBe(true);
    }
  });

  it("carries a real deck on at least one lecture", () => {
    const withSlides = lectures.filter((lecture) => typeof lecture.meta?.slides === "string");
    expect(withSlides.length, "no lecture links a deck").toBeGreaterThan(0);
    for (const lecture of withSlides) {
      const slides = String(lecture.meta?.slides);
      const page = resolve(`dist${slides}index.html`);
      expect(existsSync(page), `${lecture.id} links ${slides}, which does not build`).toBe(true);
    }
  });
});

describe("assessment", () => {
  it("adds up to 100%", () => {
    const total = assessments.reduce((sum, node) => sum + Number(node.meta?.weight ?? 0), 0);
    expect(total, `weights sum to ${total}`).toBe(100);
  });

  it("cites the teaching weeks it rests on", () => {
    for (const node of assessments) {
      const cited = (node.related ?? []).filter((id) => id.startsWith("lectures/"));
      expect(cited.length, `${node.id} cites no lecture`).toBeGreaterThan(0);
      for (const id of cited) {
        expect(ids.has(id), `${node.id} cites ${id}, which does not exist`).toBe(true);
      }
    }
  });

  it("is never due before the last week it cites has been taught", () => {
    for (const node of assessments) {
      const cited = (node.related ?? [])
        .filter((id) => id.startsWith("lectures/"))
        .map((id) => lectures.find((lecture) => lecture.id === id))
        .filter((lecture): lecture is ApiNode => lecture !== undefined);
      if (cited.length === 0) continue;
      const taught = cited
        .map((lecture) => dateOnly(lecture.meta?.date))
        .reduce((latest, date) => (date > latest ? date : latest));
      const due = dateOnly(node.meta?.due);
      expect(
        due >= taught,
        `${node.id} is due ${due} but cites a week taught on ${taught}`,
      ).toBe(true);
    }
  });
});

describe("the course holds its thesis", () => {
  it("ties every week to at least one of the four constraints", () => {
    for (const lecture of lectures) {
      const named = asList(lecture.meta?.constraints);
      const unknown = named.filter((name) => !CONSTRAINTS.includes(name as never));
      expect(unknown, `${lecture.id} names a constraint the course does not have`).toEqual([]);
      expect(
        named.length,
        `${lecture.id} names no constraint --- it has drifted off the course's spine`,
      ).toBeGreaterThan(0);
    }
  });

  it("gives every week a claim of its own", () => {
    const seen = new Map<string, string>();
    for (const lecture of lectures) {
      const claim = String(lecture.meta?.claim ?? "").trim();
      expect(claim, `${lecture.id} states no claim`).not.toBe("");
      const key = claim.toLowerCase();
      expect(seen.has(key), `${lecture.id} repeats the claim in ${seen.get(key)}`).toBe(false);
      seen.set(key, lecture.id);
    }
  });

  it("does not lean on the same reading week after week", () => {
    const uses = new Map<string, string[]>();
    for (const lecture of lectures) {
      for (const reading of asList(lecture.meta?.readings)) {
        uses.set(reading, [...(uses.get(reading) ?? []), lecture.id]);
      }
    }
    for (const [reading, weeks] of uses) {
      expect(
        weeks.length,
        `"${reading}" is set in ${weeks.length} weeks: ${weeks.join(", ")}`,
      ).toBeLessThanOrEqual(MAX_READING_REUSE);
    }
  });
});
