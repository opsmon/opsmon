import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const url = "/opsmon/?lang=en&theme=dark";
test("map selection, complete stack groups, and inline disclosure preserve links", async ({
  page,
}) => {
  await page.goto(url);
  const node = page.getByRole("button", { name: /MLOps exploration/ }).first();
  await node.focus();
  await page.keyboard.press("Enter");
  await expect(node).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#map-detail")).toContainText("AIOps experiments");
  const article = page.locator(".lead-project");
  await article.locator("summary").click();
  await expect(article.locator("details")).toHaveAttribute("open", "");
  await expect(
    article.getByRole("link", { name: "Open project" }),
  ).toBeVisible();
  await expect(article.locator("details")).toContainText("Engineers need");
  for (const name of [
    "Infrastructure",
    "Delivery & automation",
    "Observability",
    "Systems & security",
    "Data & messaging",
    "MLOps exploration",
  ]) {
    await page.locator(".stack-selector").getByRole("button", { name }).click();
    await expect(page.locator("#stack-detail h3")).toHaveText(name);
  }
  await page.locator("#stack-detail summary").click();
  await expect(page.locator("#stack-detail")).toContainText("KServe");
});
test("palette keyboard navigation, Escape, focus return, bilingual search and actions", async ({
  page,
}) => {
  await page.goto(url);
  const trigger = page.getByRole("button", {
    name: "Quick navigation",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("textbox")).toBeFocused();
  await page.getByRole("textbox").fill("проекты");
  await page.keyboard.press("ArrowDown");
  await expect(
    page
      .getByRole("dialog")
      .getByRole("button", { name: "Projects", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.keyboard.press(
    process.platform === "darwin" ? "Meta+k" : "Control+k",
  );
  await page.getByRole("textbox").fill("no-such-result");
  await expect(page.getByText("No matches.", { exact: false })).toBeVisible();
  await page.getByRole("textbox").fill("Switch theme");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page).toHaveURL(/theme=light/);
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("textbox").fill("Contact");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeFocused();
});
test("native modal confines Tab and restores focus without executing on typing", async ({
  page,
}) => {
  await page.goto(url);
  await page
    .getByRole("button", { name: "Quick navigation", exact: true })
    .click();
  await page.getByRole("textbox").fill("Switch language");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement.closest("dialog")),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Quick navigation", exact: true }),
  ).toBeFocused();
});
test("preferences bootstrap, rejected values, query synchronization, blocked storage and system updates", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.addInitScript(() => {
    localStorage.setItem("sergey-frolov-language", "ru");
    localStorage.setItem("sergey-frolov-theme", "light");
  });
  await page.goto("/opsmon/?lang=en&theme=dark&keep=1#projects");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: /Choose language/ }).click();
  await expect(page).toHaveURL(/lang=ru/);
  await expect(page).toHaveURL(/keep=1#projects/);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await page.goto("/opsmon/?lang=__proto__&theme=invalid");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "getItem", {
      value() {
        throw Error("blocked");
      },
    });
    Object.defineProperty(Storage.prototype, "setItem", {
      value() {
        throw Error("blocked");
      },
    });
  });
  await page.goto("/opsmon/?lang=invalid&theme=invalid");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page
    .getByRole("button", { name: "Switch between light and dark theme" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
test("copy success and failure produce honest localized feedback", async ({
  page,
}) => {
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => {} },
    }),
  );
  await page.goto(url);
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.locator(".copy-feedback")).toHaveText("Email copied.");
  await page.evaluate(() =>
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw Error("denied");
        },
      },
    }),
  );
  await page.getByRole("button", { name: "Copy email", exact: true }).click();
  await expect(page.locator(".copy-feedback")).toContainText(
    "Copy unavailable",
  );
  await expect(page.locator(".email")).toHaveText(/opsmon.sh@yandex.com/);
  await page.getByRole("button", { name: /Choose language/ }).click();
  await page
    .getByRole("button", { name: "Скопировать email", exact: true })
    .click();
  await expect(page.locator(".copy-feedback")).toContainText("Не удалось");
});
test("mobile navigation closes on Escape/navigation and yields to palette", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(url);
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.locator("#main-nav").getByRole("link", { name: "About" }).click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#about")).toBeFocused();
  await menu.click();
  await page
    .getByRole("button", { name: "Quick navigation", exact: true })
    .click();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("dialog")).toBeVisible();
});
test("production index, nested 404 response, literal path and configured return link", async ({
  page,
}) => {
  for (const path of ["/opsmon/", "/opsmon/index.html"]) {
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
  const response = await page.goto(
    "/opsmon/missing/nested?lang=ru&theme=light",
  );
  expect(response.status()).toBe(404);
  await expect(page.locator("h1")).toHaveText("Здесь путь заканчивается.");
  await page.getByRole("link", { name: "Вернуться к портфолио" }).click();
  await expect(page).toHaveURL("/opsmon/?lang=ru&theme=light");
  await expect(page.locator("#projects")).toBeAttached();
});
for (const lang of ["en", "ru"])
  for (const theme of ["dark", "light"])
    test(`responsive layout and axe ${lang}/${theme}`, async ({ page }) => {
      const errors = [];
      page.on("pageerror", (err) => errors.push(err.message));
      const failed = [];
      page.on("response", (res) => {
        if (res.url().startsWith("http://127.0.0.1") && res.status() >= 400)
          failed.push(res.url());
      });
      await page.goto(`/opsmon/?lang=${lang}&theme=${theme}`);
      for (const width of [360, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 800 });
        await expect(page.locator("html")).toHaveAttribute("lang", lang);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        ).toBe(true);
      }
      await page.evaluate(() => document.fonts.ready);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      await page
        .getByRole("button", {
          name: lang === "en" ? "Quick navigation" : "Быстрая навигация",
          exact: true,
        })
        .click();
      const modal = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(modal.violations).toEqual([]);
      expect(errors).toEqual([]);
      expect(failed).toEqual([]);
    });
test("short laptop, reduced motion, and 200 percent page zoom", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url);
  expect(
    await page
      .locator(".hero .primary")
      .evaluate((el) => el.getBoundingClientRect().bottom),
  ).toBeLessThan(720);
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await page.evaluate(() => (document.documentElement.style.zoom = "2"));
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator("h1")).toBeVisible();
  await page.locator(".hero .primary").click();
  await expect(page).toHaveURL(/#projects/);
});

test("bootstrap paints resolved preferences before the application loads", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.addInitScript(() => {
    localStorage.setItem("sergey-frolov-theme", "dark");
    localStorage.setItem("sergey-frolov-language", "ru");
  });
  await page.route("**/assets/index-*.js", (route) => route.abort());
  await page.goto("/opsmon/?theme=invalid&lang=invalid");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#08060f",
  );
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(8, 6, 15)");
});

test("unavailable storage object and non-Mac shortcut remain usable", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Blocked", "SecurityError");
      },
    });
    Object.defineProperty(navigator, "platform", { get: () => "Win32" });
  });
  await page.goto(url);
  await page.keyboard.press("Control+k");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("textbox").fill("Switch theme");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page).toHaveURL(/theme=light/);
  expect(errors).toEqual([]);
});

test("active navigation returns to the introduction after scrolling back", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(url);
  await page
    .locator("#main-nav")
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(
    page.locator("#main-nav").getByRole("link", { name: "Projects" }),
  ).toHaveAttribute("aria-current", "location");
  await page.locator(".site-header .brand").click();
  await expect(page.locator(".site-header .brand")).toHaveAttribute(
    "aria-current",
    "location",
  );
  await expect(page.locator("#main-nav [aria-current]")).toHaveCount(0);
});
