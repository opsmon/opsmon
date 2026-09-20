import { chromium } from "@playwright/test";
import { mkdir, readdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("docs/screenshots", { recursive: true });
if (process.argv[2] === "social") {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto("http://127.0.0.1:4173/opsmon/");
  const font = (await readdir("dist/assets")).find((file) =>
    file.startsWith("inter-latin"),
  );
  await page.setContent(
    `<style>@font-face{font-family:Inter;src:url('/opsmon/assets/${font}');font-weight:100 900}*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#08060f;color:#f5f1ff;font-family:Inter,sans-serif;padding:64px 76px;position:relative}.brand{font-size:36px;font-weight:600;letter-spacing:-2px;display:flex;align-items:center;gap:16px}.brand img{width:44px}h1{font-size:86px;line-height:1.05;letter-spacing:-5px;font-weight:550;margin:54px 0 24px}h1 span{color:#a78bfa}p{color:#b6abc9;font-size:20px}footer{position:absolute;bottom:50px;left:76px;right:76px;border-top:1px solid #352747;padding-top:24px;display:flex;justify-content:space-between;color:#b6abc9;font-size:15px}.signal{position:absolute;right:70px;top:170px;width:240px;height:270px;opacity:.8}</style><div class="brand"><img src="/opsmon/assets/favicon.svg">opsmon<span style="color:#a78bfa;margin-left:-15px">.</span></div><h1>Reliable systems.<br><span>Clear thinking.</span></h1><p>Sergey Frolov / DevOps Engineer</p><svg class="signal" viewBox="0 0 240 270" fill="none" stroke="#a78bfa"><path d="M20 20h100v110h100M20 240h100V130"/><circle cx="20" cy="20" r="6"/><circle cx="20" cy="240" r="6"/><circle cx="220" cy="130" r="6" fill="#a78bfa"/></svg><footer><span>Infrastructure · Delivery · Observability</span><span>opsmon.github.io/opsmon ↗</span></footer>`,
  );
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/assets/social-preview.png" });
  await browser.close();
  process.exit(0);
}
for (const [name, width, height] of [
  ["desktop", 1440, 1000],
  ["mobile", 390, 844],
])
  for (const [lang, theme] of [
    ["en", "dark"],
    ["ru", "light"],
  ]) {
    const page = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    await page.goto(
      `http://127.0.0.1:4173/opsmon/?theme=${theme}&lang=${lang}`,
    );
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(550);
    const prefix = `docs/screenshots/${process.argv[2] || "final"}-${name}${lang === "en" ? "" : `-${lang}-${theme}`}`;
    await page.screenshot({ path: `${prefix}-viewport.png` });
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += height
    ) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(550);
    await page.screenshot({ path: `${prefix}.png`, fullPage: true });
    await page.close();
  }
await browser.close();
