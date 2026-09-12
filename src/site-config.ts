import { defineSiteConfig } from "astro-theme-university/types";
import { slopBranding } from "astro-theme-slop";
import { courseMeta } from "./course-config";

// The course teaches through lectures and marks three pieces of work. There
// is no tutorial, studio or lab stream, so the starter's `sessions` collection
// was removed rather than filled with a second kind of page saying the same
// things as the lecture it sits beside.
export const graphCollections = ["assessments", "lectures", "people"];

export const courseApiCollections = [
  ...graphCollections.map((key) => ({ key })),
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
