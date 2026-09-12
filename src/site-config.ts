import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";

// The course teaches through lectures and marks three pieces of work: there is
// no tutorial, studio or lab stream, so `sessions` carries no entries and the
// site gives it no pages rather than filling it with a second page per week
// restating the lecture beside it.
//
// It is still declared in src/content.config.ts and still named to the API
// below, because README.md's platform contract keeps all four collection keys
// for the programs-and-courses page. It is left out of `graphCollections`
// only because that list is what RelatedContent reads at render time, and
// reading an empty collection warns on every page of every build.
export const graphCollections = ["assessments", "lectures", "people"];

export const courseApiCollections = [
  ...["sessions", ...graphCollections].map((key) => ({ key })),
  { key: "policies", dir: "pages/policies" },
];

export const siteConfig = defineSiteConfig({
  ...slopBranding,
  name: "Slop University",

  links: [
    { text: "Lectures", href: "/lectures/" },
    { text: "Schedule", href: "/schedule/" },
    { text: "Assessment", href: "/assessments/" },
    { text: "People", href: "/people/" },
    { text: "Policies", href: "/policies/" },
  ],

  // Not a preference: the accent is amber, amber on white is unreadable at
  // every weight the site uses it at, and a palette that inverted would have
  // to give the accent up. See src/styles/course.css.
  colorScheme: "dark",

  licence: "CC-BY-NC-SA-4.0",
  socialImage: "/src/assets/images/card.png",
  socialImageAlt:
    "Two inks on near-black: five card outlines with only the third one filled, beside a walled single corridor where a marker's earlier positions fade out behind it and a hazard-striped barrier closes the far end",
});
