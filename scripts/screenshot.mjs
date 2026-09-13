// Full-page screenshots at a chosen viewport, over the DevTools protocol.
//
// This exists because the obvious way is wrong. `chrome --headless
// --window-size=390,844 --screenshot` does not render at 390 on Linux: the
// browser enforces a minimum window width, lays the page out at that width, and
// then writes a 390-wide image out of it. The result looks like a broken mobile
// layout --- headings clipped at the left, text running off the right --- and
// the layout is fine. Emulation.setDeviceMetricsOverride sets the viewport the
// page actually sees, which is the thing being tested.
//
// Usage:
//   node scripts/screenshot.mjs <out-dir> <base-url> <width> <path> [path...]
//
// Example:
//   node scripts/screenshot.mjs shots http://localhost:4321/base/ 390 / lectures/week-09/

import { mkdir, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { join } from "node:path";

const [outDir, baseUrl, widthArg, ...paths] = process.argv.slice(2);
if (!outDir || !baseUrl || !widthArg || paths.length === 0) {
  console.error("usage: node scripts/screenshot.mjs <out-dir> <base-url> <width> <path...>");
  process.exit(1);
}
const width = Number(widthArg);
const PORT = 9333;

// Playwright's bundled chromium is already a dependency of the accessibility
// check, so there is no second browser to install.
const chromePath = process.env.CHROME_PATH ?? (await findChromium());

async function findChromium() {
  const { globSync } = await import("node:fs");
  const home = process.env.HOME ?? "";
  const hits = globSync(`${home}/.cache/ms-playwright/chromium-*/chrome-linux*/chrome`);
  if (hits.length === 0) throw new Error("no chromium found; set CHROME_PATH");
  return hits.sort().at(-1);
}

const browser = spawn(chromePath, [
  "--headless",
  "--disable-gpu",
  "--no-sandbox",
  "--hide-scrollbars",
  `--remote-debugging-port=${PORT}`,
  "about:blank",
], { stdio: "ignore" });

const version = await retry(() => fetch(`http://localhost:${PORT}/json/version`).then((r) => r.json()));
const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve) => (socket.onopen = resolve));

let nextId = 0;
const pending = new Map();
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });

await mkdir(outDir, { recursive: true });

for (const path of paths) {
  const url = new URL(path.replace(/^\//, ""), baseUrl).href;
  const { result: target } = await send("Target.createTarget", { url: "about:blank" });
  const { result: attached } = await send(
    "Target.attachToTarget",
    { targetId: target.targetId, flatten: true },
  );
  const session = attached.sessionId;

  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height: 844,
    deviceScaleFactor: 1,
    mobile: false,
  }, session);
  await send("Page.enable", {}, session);
  await send("Page.navigate", { url }, session);
  // Scroll reveal is driven by an IntersectionObserver, so a full-page capture
  // of an unscrolled page would photograph everything below the fold in its
  // pre-reveal state. Walk the page first, then wait out the transition.
  //
  // The walk has to be unhurried. At 0.8 of a viewport every 120ms the observer
  // misses elements --- a whole diagram came out as a black rectangle in an
  // otherwise correct page, and the page was fine. Half a viewport every 250ms
  // is reliable, and anything still unrevealed at the end is scrolled to
  // directly rather than hoped over.
  await pause(1200);
  await send("Runtime.evaluate", {
    expression: `(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const step = innerHeight * 0.5;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        scrollTo(0, y);
        await wait(250);
      }
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const left = [...document.querySelectorAll("[data-reveal]")]
          .filter((el) => !el.classList.contains("is-revealed"));
        if (left.length === 0) break;
        for (const el of left) {
          el.scrollIntoView({ block: "center" });
          await wait(250);
        }
      }
      scrollTo(0, 0);
    })()`,
    awaitPromise: true,
  }, session);
  await pause(1400);

  const { result: shot } = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  }, session);
  const name = `${(path.replace(/^\/|\/$/g, "") || "home").replace(/\//g, "-")}-${width}.png`;
  await writeFile(join(outDir, name), Buffer.from(shot.data, "base64"));
  console.log(`${name}  ${url}`);
  await send("Target.closeTarget", { targetId: target.targetId });
}

socket.close();
browser.kill();

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry(fn, attempts = 30) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      return await fn();
    } catch {
      await pause(200);
    }
  }
  throw new Error("chrome did not expose a debugging endpoint");
}
