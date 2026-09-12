#!/usr/bin/env node
// Generates the site's two pieces of artwork from one drawing.
//
// Why this exists: the starter shipped an illustrated fantasy battlefield with
// glowing cards and purple gradients, which is the look CLAUDE.md §10 names as
// the one to avoid, and §9 forbids looking like an official Riot page. It also
// disagreed with its own alt text. Rather than swap in another illustration,
// the artwork is drawn here in flat geometry from the course's own palette, so
// the hero and the social card are the same drawing at two sizes and the alt
// text can describe exactly what is on screen.
//
// The drawing is the course in one figure, read left to right: a hand of five
// cards with one already dealt and no say in which (no-pick), a single walled
// corridor with no exit behind the marker (one-lane, no-recall), and a barrier
// across the far end that has to be met (forced-contact).
//
// Run: node scripts/make-artwork.ts

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import sharp from "sharp";

const AMBER = "#f0a417";
const GROUND = "#0c0b09";

/** One hazard band: 45° amber bars, the colour logic borrowed from signage. */
function hazard(y: number, w: number, h: number): string {
  const bars: string[] = [];
  const step = h * 1.35;
  for (let x = -h * 2; x < w + h * 2; x += step) {
    bars.push(
      `<polygon points="${x},${y + h} ${x + h},${y} ${x + h * 1.1},${y} ${x + h * 0.1},${y + h}" fill="${AMBER}" opacity="0.85"/>`,
    );
  }
  return bars.join("");
}

// The hero sits under the theme's dark scrim, which exists so a title stays
// legible over a photograph. Fine outlines disappear under it, so the hero
// takes a reduced cut of the drawing — the corridor alone, at full width and
// heavier weight — and the social card, which is never overlaid, takes the
// whole figure.
function drawing(w: number, h: number, variant: "full" | "corridor" | "transmute"): string {
  const u = w / 24; // one grid unit; every measurement below is in units
  const mid = h / 2;

  // The hand: five cards, the third one dealt (filled) and the rest outlines.
  const cardW = variant === "transmute" ? u * 1.5 : u * 1.25;
  const cardH = variant === "transmute" ? u * 5 : u * 4;
  const cardX0 = variant === "transmute" ? u * 12.4 : u * 1.3;
  const cards: string[] = [];
  for (let i = 0; i < 5; i += 1) {
    const x = cardX0 + i * (cardW + u * 0.45);
    const dealt = i === 2;
    const fill = dealt && variant === "transmute" ? 'url(#prismatic)' : AMBER;
    cards.push(
      `<rect x="${x}" y="${mid - cardH / 2}" width="${cardW}" height="${cardH}" ` +
        (dealt
          ? `fill="${fill}"/>`
          : `fill="none" stroke="${AMBER}" stroke-width="${u * 0.07}" opacity="0.45"/>`),
    );
  }

  // The corridor: two heavy rules, closed at the far end, with no opening
  // behind the marker. The marker's trail fades backwards — the positions it
  // has already left and cannot return to.
  const lane =
    variant === "corridor"
      ? { x0: u * 1.3, x1: u * 22.7, half: u * 2.1 }
      : { x0: u * 11.4, x1: u * 22.7, half: u * 1.4 };
  const marker = lane.x0 + (lane.x1 - lane.x0) * 0.33;
  const trail: string[] = [];
  for (let i = 1; i <= 3; i += 1) {
    trail.push(
      `<rect x="${marker - i * u * 1.15 - u * 0.4}" y="${mid - u * 0.4}" width="${u * 0.8}" height="${u * 0.8}" fill="${AMBER}" opacity="${0.42 - i * 0.11}"/>`,
    );
  }

  // The corridor: two heavy rules, closed at the far end, with no opening
  // behind the marker. The augment cut leaves it out — that scene is about the
  // rules changing, not about the route.
  const corridor =
    variant === "transmute"
      ? ""
      : `
    <line x1="${lane.x0}" y1="${mid - lane.half}" x2="${lane.x1}" y2="${mid - lane.half}" stroke="${AMBER}" stroke-width="${u * 0.14}"/>
    <line x1="${lane.x0}" y1="${mid + lane.half}" x2="${lane.x1}" y2="${mid + lane.half}" stroke="${AMBER}" stroke-width="${u * 0.14}"/>
    <line x1="${lane.x0}" y1="${mid - lane.half}" x2="${lane.x0}" y2="${mid + lane.half}" stroke="${AMBER}" stroke-width="${u * 0.14}"/>
    ${trail.join("")}
    <rect x="${marker - u * 0.5}" y="${mid - u * 0.5}" width="${u}" height="${u}" fill="${AMBER}"/>
    <polygon points="${marker + u * 1.5},${mid - u * 0.55} ${marker + u * 2.6},${mid} ${marker + u * 1.5},${mid + u * 0.55}" fill="${AMBER}"/>
    <g clip-path="url(#endwall)">
      ${[0, 1, 2, 3, 4, 5, 6]
        .map(
          (i) =>
            `<line x1="${lane.x1 - u * 2.5 - lane.half * 2 + i * u * 0.85}" y1="${mid + lane.half}" x2="${lane.x1 - u * 2.5 - lane.half * 2 + i * u * 0.85 + lane.half * 2}" y2="${mid - lane.half}" stroke="${AMBER}" stroke-width="${u * 0.22}" opacity="0.9"/>`,
        )
        .join("")}
    </g>
    <rect x="${lane.x1 - u * 0.55}" y="${mid - lane.half}" width="${u * 0.55}" height="${lane.half * 2}" fill="${AMBER}"/>`;

  // Prismatic fragments, thrown by the card that changed. Only the augment cut
  // has them: prismatic marks variance, and nothing else on this drawing is.
  const fragments =
    variant === "transmute"
      ? [0, 1, 2, 3, 4, 5]
          .map((i) => {
            const fx = cardX0 - u * 1.6 + i * u * 1.9;
            const fy = mid + (i % 2 === 0 ? -1 : 1) * u * (3.1 + (i % 3) * 0.5);
            const s = u * (0.18 + (i % 3) * 0.09);
            return `<rect x="${fx}" y="${fy}" width="${s}" height="${s}" fill="url(#prismatic)" opacity="${0.8 - i * 0.08}" transform="rotate(45 ${fx + s / 2} ${fy + s / 2})"/>`;
          })
          .join("")
      : "";

  return `
    <defs>
      <clipPath id="endwall">
        <rect x="${lane.x1 - u * 2.5}" y="${mid - lane.half}" width="${u * 2.5}" height="${lane.half * 2}"/>
      </clipPath>
      <linearGradient id="prismatic" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#49d7ff"/>
        <stop offset="0.38" stop-color="#9d5cff"/>
        <stop offset="0.72" stop-color="#f45de4"/>
        <stop offset="1" stop-color="#f8d76a"/>
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${GROUND}"/>
    ${hazard(0, w, u * 0.5)}
    ${hazard(h - u * 0.5, w, u * 0.5)}
    ${variant === "corridor" ? "" : cards.join("")}
    ${fragments}
    ${corridor}
  `;
}

function svg(w: number, h: number, variant: "full" | "corridor" | "transmute"): Buffer {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${drawing(w, h, variant)}</svg>`,
  );
}

const targets = [
  { file: "hero-home.png", width: 2400, height: 780, variant: "corridor" as const },
  { file: "card.png", width: 1200, height: 630, variant: "full" as const },
  // The augment scene: the same hand, with the dealt card transmuted. Prismatic
  // is the course's colour for variance, so it appears here and nowhere the
  // subject is not variance.
  { file: "transmute.png", width: 2000, height: 760, variant: "transmute" as const },
];

for (const { file, width, height, variant } of targets) {
  const out = resolve("src/assets/images", file);
  const png = await sharp(svg(width, height, variant)).png().toBuffer();
  writeFileSync(out, png);
  console.log(`✓ ${file} — ${width}×${height}`);
}
