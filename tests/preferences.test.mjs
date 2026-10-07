import { test } from "node:test";
import assert from "node:assert/strict";
import { resolve, persist, copyEmail } from "../src/lib/preferences.js";
import { dictionaries } from "../src/i18n/index.js";
import { isHome, matches } from "../src/lib/navigation.js";
const store = (value) => ({ getItem: () => value, setItem() {} });
test("URL, valid storage, then system/browser precedence", () => {
  for (const [key, values] of [
    ["lang", ["en", "ru"]],
    ["theme", ["dark", "light"]],
  ]) {
    assert.equal(
      resolve(
        key,
        new URLSearchParams(`${key}=${values[0]}`),
        store(values[1]),
        values[1],
      ),
      values[0],
    );
    assert.equal(
      resolve(
        key,
        new URLSearchParams(`${key}=invalid`),
        store(values[0]),
        values[1],
      ),
      values[0],
    );
    assert.equal(
      resolve(
        key,
        new URLSearchParams(`${key}=__proto__`),
        store("invalid"),
        values[1],
      ),
      values[1],
    );
    assert.equal(
      resolve(
        key,
        new URLSearchParams(),
        {
          getItem() {
            throw Error();
          },
        },
        values[1],
      ),
      values[1],
    );
  }
});
test("switching synchronizes only existing override and preserves hash/unrelated query", () => {
  let next;
  persist(
    "lang",
    "ru",
    store(null),
    { href: "https://example.com/opsmon/?lang=en&other=1#projects" },
    {
      replaceState(a, b, url) {
        next = url;
      },
    },
  );
  assert.equal(
    next.href,
    "https://example.com/opsmon/?lang=ru&other=1#projects",
  );
  next = null;
  persist(
    "theme",
    "dark",
    store(null),
    { href: "https://example.com/opsmon/?other=1#skills" },
    {
      replaceState() {
        next = true;
      },
    },
  );
  assert.equal(next, null);
});
test("clipboard reports actual completion and tolerates denied/missing API", async () => {
  let copied;
  assert.equal(
    await copyEmail("test@example.com", {
      async writeText(value) {
        copied = value;
      },
    }),
    true,
  );
  assert.equal(copied, "test@example.com");
  assert.equal(
    await copyEmail("email", {
      async writeText() {
        throw Error("denied");
      },
    }),
    false,
  );
  assert.equal(await copyEmail("email", undefined), false);
});
function shape(value) {
  return Array.isArray(value)
    ? value.map(shape)
    : value && typeof value === "object"
      ? Object.fromEntries(
          Object.keys(value)
            .sort()
            .map((k) => [k, shape(value[k])]),
        )
      : typeof value;
}
test("English and Russian dictionaries have complete matching structure", () =>
  assert.deepEqual(shape(dictionaries.en), shape(dictionaries.ru)));
test("base routes are exact and search treats user input as text", () => {
  for (const path of ["/opsmon/", "/opsmon/index.html"])
    assert.equal(isHome(path, "/opsmon/"), true);
  for (const path of ["/opsmon/nope/", "/opsmonish/", "/opsmon/foo/index.html"])
    assert.equal(isHome(path, "/opsmon/"), false);
  assert.equal(
    matches({ label: "Projects", search: "Проекты" }, "проЕКты"),
    true,
  );
  assert.equal(matches({ label: "Projects" }, "<img>"), false);
});
