import { chromium } from "@playwright/test";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage();
for (const lang of ["en", "ru"])
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`http://127.0.0.1:4173/opsmon/?lang=${lang}&theme=dark`);
    await page.evaluate(() => document.fonts.ready);
    console.log(
      lang,
      width,
      await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        overflow: [...document.querySelectorAll("body *")]
          .filter((el) => el.getBoundingClientRect().right > innerWidth + 1)
          .map((el) => [
            el.tagName,
            el.className,
            Math.round(el.getBoundingClientRect().right),
          ])
          .slice(0, 15),
      })),
    );
    await page.screenshot({ path: `/private/tmp/opsmon-${lang}-${width}.png` });
  }
await browser.close();
