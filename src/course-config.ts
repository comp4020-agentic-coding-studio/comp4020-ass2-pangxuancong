import type { CourseMetaInput } from "astro-course-university";
import { z } from "astro/zod";

// The level digits ANU uses: 1000--4000 undergraduate, 6000 and 8000
// postgraduate. Both the code pattern and the level field derive from this.
const LEVELS = [1, 2, 3, 4, 6, 8] as const;
const allowedCode = new RegExp(`^SLOP[${LEVELS.join("")}]\\d{3}$`);

export const slopCourseMetaSchema = z
  .strictObject({
    code: z.string().regex(allowedCode, {
      message: "use SLOP plus a 1000–4000, 6000 or 8000 level code",
    }),
    title: z.string().trim().min(1).max(100),
    session: z.string().trim().min(1).max(40),
    year: z.number().int().min(2026).max(2200),
    level: z.literal(LEVELS),
    startDate: z.iso.date(),
    endDate: z.iso.date(),
    description: z.string().trim().min(80).max(300),
    tags: z.array(z.string().trim().min(2).max(24)).min(1).max(3),
    // The integration defaults this to an empty array. A course that cannot
    // say what a student leaves with is not finished, so here it is required.
    learningOutcomes: z.array(z.string().trim().min(1)).min(1).max(8),
  })
  .superRefine((course, ctx) => {
    const codeLevel = Number(course.code.at(4));
    if (course.level !== codeLevel) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: `must match ${course.code}'s first digit (${codeLevel})`,
      });
    }
    if (course.startDate > course.endDate) {
      ctx.addIssue({
        code: "custom",
        path: ["startDate"],
        message: "must not be after endDate",
      });
    }
  });

// The single source of truth for the course record. The generated homepage,
// navigation label and /api/index.json all read this object.
//
// Dual-coded: the catalogue carries one code, so SLOP8223 is the canonical
// record and the undergraduate offering (SLOP4223) is named in the prose. The
// last three digits were assigned to this repo and are not ours to change;
// only the leading level digit was a choice. `spec/course-promises.test.ts`
// holds us to that, because the regex above would happily accept any three.
//
// The teaching calendar: twelve Tuesday lectures from 21 July, with the
// standard two-week break after week 6. `endDate` runs past the last lecture
// to cover the assessment period, so the final case study can fall inside it.
export const courseMeta = slopCourseMetaSchema.parse({
  code: "SLOP8223",
  title: "HEX ARAM: The Hand You're Dealt",
  session: "Semester 2",
  year: 2026,
  level: 8,
  startDate: "2026-07-21",
  endDate: "2026-11-20",
  description:
    "Playing well with a hand you did not choose. Twelve weeks on decision-making, " +
    "adaptation and design inside HEX ARAM, where you cannot pick your champion, " +
    "cannot retreat, and cannot avoid the fight. Offered as SLOP4223 and SLOP8223.",
  tags: ["decision-making", "game design", "ARAM"],
  learningOutcomes: [
    "Evaluate a decision separately from its outcome, and defend a choice that lost",
    "Read champion, augment and item state as one system of trade-offs under incomplete information",
    "Apply game-theoretic reasoning to commitment, timing and threat under forced contact",
    "Use match and patch data to test a claim about play, and say what the data cannot settle",
    "Critique the mode as a designed object, including its per-champion balance modifiers",
  ],
}) satisfies CourseMetaInput;
