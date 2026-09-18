export const keys = {
  lang: "sergey-frolov-language",
  theme: "sergey-frolov-theme",
};
export const valid = (key, value) =>
  (key === "lang" ? ["en", "ru"] : ["light", "dark"]).includes(value);
export function read(storage, key) {
  try {
    return storage.getItem(keys[key]);
  } catch {
    return null;
  }
}
export function resolve(key, params, storage, fallback) {
  const query = params.get(key),
    saved = read(storage, key);
  return valid(key, query) ? query : valid(key, saved) ? saved : fallback;
}
export function persist(
  key,
  value,
  storage,
  location = window.location,
  history = window.history,
) {
  if (!valid(key, value)) return;
  try {
    (storage || window.localStorage).setItem(keys[key], value);
  } catch {
    /* Preferences are optional. */
  }
  const url = new URL(location.href);
  if (url.searchParams.has(key)) {
    url.searchParams.set(key, value);
    history.replaceState(null, "", url);
  }
}
export function resetTheme() {
  try {
    localStorage.removeItem(keys.theme);
  } catch {
    /* Optional storage. */
  }
  const url = new URL(window.location.href);
  url.searchParams.delete("theme");
  history.replaceState(null, "", url);
}
export async function copyEmail(email, clipboard) {
  try {
    await clipboard.writeText(email);
    return true;
  } catch {
    return false;
  }
}
