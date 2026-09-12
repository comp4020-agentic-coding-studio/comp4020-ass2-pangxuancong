import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The second half of what only this course can check. `course-promises` reads
// the built API and holds the curriculum's shape; this file reads the source
// and holds the way the course is allowed to talk about evidence and about
// itself. The build cannot see either: a fabricated win rate and a real one are
// the same string to Astro, and `Augments 101` compiles perfectly.

const CONTENT = resolve("src/content");

// §5 of CLAUDE.md. Anything patch-dependent must carry both a source and the
// patch it was true on, because a number without a patch is not reproducible
// and a number without a source is not checkable.
const APPROVED_SOURCES = /hexdata|data ?dragon|communitydragon|riot/i;
const PATCH_LABEL = /patch\s+\d+\.\d+/i;

// Teaching with an invented number is allowed and often clearer than waiting
// for a real one; dressing an invented number as a measurement is not. A
// paragraph that says so in these words is exempt from the citation rule.
const DECLARED_HYPOTHETICAL = /hypothetical|illustrative|invented|made up|for the sake of argument/i;

// A statistic in the sense this course cares about: a rate, a percentage, or a
// modifier presented as a measured quantity.
const STATISTIC = /(?<![\w-])\d+(?:\.\d+)?\s?%|(?:win|pick|ban|play)[- ]rate[^.\n]{0,40}?\d/i;

// §2. Splitting one subject by difficulty is how twelve weeks become six taught
// twice, and these are the words it happens under.
const WEAK_TITLE = /\b(101|introduction to|advanced|basics of|review|overview of|fundamentals of)\b/i;

interface Doc {
  id: string;
  frontmatter: string;
  body: string;
}

function load(dir: string): Doc[] {
  const base = resolve(CONTENT, dir);
  return readdirSync(base)
    .filter((name) => /\.mdx?$/.test(name) && name !== "CLAUDE.md")
    .sort()
    .map((name) => {
      const raw = readFileSync(resolve(base, name), "utf8");
      const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
      return {
        id: `${dir}/${name}`,
        frontmatter: match?.[1] ?? "",
        body: match ? raw.slice(match[0].length) : raw,
      };
    });
}

const lectures = load("lectures");
const assessments = load("assessments");

/** Paragraphs, minus fenced code and tables, where a statistic would be prose. */
function paragraphs(body: string): string[] {
  return body
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

function frontmatterValue(frontmatter: string, key: string): string | undefined {
  const line = new RegExp(`^${key}:\\s*(.*)$`, "m").exec(frontmatter);
  if (!line) return undefined;
  return line[1].trim().replace(/^["']|["']$/g, "");
}

describe("no naked statistics", () => {
  it("gives every statistic a source and a patch, or declares it hypothetical", () => {
    for (const doc of [...lectures, ...assessments]) {
      for (const block of paragraphs(doc.body)) {
        if (!STATISTIC.test(block)) continue;
        if (DECLARED_HYPOTHETICAL.test(block)) continue;
        const first = block.split("\n")[0].slice(0, 80);
        expect(
          APPROVED_SOURCES.test(block),
          `${doc.id} states a statistic with no source: "${first}…"`,
        ).toBe(true);
        expect(
          PATCH_LABEL.test(block),
          `${doc.id} states a statistic with no patch: "${first}…"`,
        ).toBe(true);
      }
    }
  });
});

describe("weeks are titled by what they argue", () => {
  it("refuses titles that split a subject by difficulty", () => {
    for (const doc of lectures) {
      const title = frontmatterValue(doc.frontmatter, "title") ?? "";
      expect(title, `${doc.id} has no title`).not.toBe("");
      const weak = WEAK_TITLE.exec(title);
      expect(weak?.[0], `${doc.id} is titled "${title}" — a level, not an argument`).toBe(
        undefined,
      );
    }
  });

  it("carries the metadata a week is read by", () => {
    for (const doc of lectures) {
      for (const key of ["description", "week", "date", "claim"]) {
        const value = frontmatterValue(doc.frontmatter, key);
        expect(value, `${doc.id} is missing ${key}`).toBeTruthy();
      }
      expect(
        /^teachers:\s*\n\s*-\s+\S/m.test(doc.frontmatter),
        `${doc.id} names nobody who teaches it`,
      ).toBe(true);
      // A claim is a sentence someone could disagree with, which in practice
      // means it is long enough to have a subject and a verb.
      const claim = frontmatterValue(doc.frontmatter, "claim") ?? "";
      expect(claim.split(/\s+/).length, `${doc.id}'s claim is a label, not a claim`).toBeGreaterThan(
        5,
      );
    }
  });
});

describe("the assessment is the one described in the course rules", () => {
  it("is two assignments and one final, at 25, 25 and 50", () => {
    const weights = assessments
      .map((doc) => Number(frontmatterValue(doc.frontmatter, "weight")))
      .sort((a, b) => a - b);
    expect(
      weights,
      `assessment weights are ${weights.join(", ")}, not 25, 25 and 50`,
    ).toEqual([25, 25, 50]);

    const finals = assessments.filter((doc) => /final/i.test(doc.id));
    expect(finals.length, "there is not exactly one final").toBe(1);
    expect(
      Number(frontmatterValue(finals[0].frontmatter, "weight")),
      "the final is not worth half the course",
    ).toBe(50);
  });

  it("marks all three on the same four criteria", () => {
    const criteria = assessments.map((doc) =>
      [...doc.frontmatter.matchAll(/^\s*- name:\s*(.+)$/gm)].map((match) =>
        match[1].trim().replace(/^["']|["']$/g, "").toLowerCase(),
      ),
    );
    for (const [i, names] of criteria.entries()) {
      expect(names.length, `${assessments[i].id} does not list four criteria`).toBe(4);
      expect(
        names.map((name) => name.split(/[ (]/)[0]),
        `${assessments[i].id} is marked on different criteria to the others`,
      ).toEqual(criteria[0].map((name) => name.split(/[ (]/)[0]));
    }
  });

  it("tells a student what a submission has to contain", () => {
    for (const doc of assessments) {
      expect(
        /^spec:\s*\n\s*-\s+\S/m.test(doc.frontmatter),
        `${doc.id} states no checkable requirements`,
      ).toBe(true);
    }
  });
});
