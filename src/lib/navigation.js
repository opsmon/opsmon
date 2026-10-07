export const sectionIds = [
  "top",
  "projects",
  "about",
  "experience",
  "skills",
  "contributions",
  "contact",
];
export function isHome(path, base) {
  return path === base || path === `${base}index.html`;
}
export function matches(command, query) {
  return `${command.label} ${command.search || ""}`
    .toLocaleLowerCase()
    .includes(query.trim().toLocaleLowerCase());
}
export function navigateSection(id, base, is404 = false) {
  if (is404) {
    window.location.href = `${base}${window.location.search}#${id}`;
    return;
  }
  history.pushState(null, "", `#${id}`);
  const target = document.getElementById(id);
  target?.focus({ preventScroll: true });
  target?.scrollIntoView({
    behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  });
}
