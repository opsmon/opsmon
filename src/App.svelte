<script>
  import { onMount } from "svelte";
  import { profile } from "./data/profile.js";
  import { projects } from "./data/projects.js";
  import { dictionaries } from "./i18n/index.js";
  import { persist, resetTheme, copyEmail } from "./lib/preferences.js";
  import { sectionIds, isHome, navigateSection } from "./lib/navigation.js";
  import Header from "./components/Header.svelte";
  import Hero from "./components/Hero.svelte";
  import ProjectShowcase from "./components/ProjectShowcase.svelte";
  import AboutExperience from "./components/AboutExperience.svelte";
  import StackExplorer from "./components/StackExplorer.svelte";
  import Contributions from "./components/Contributions.svelte";
  import Contact from "./components/Contact.svelte";
  import CommandPalette from "./components/CommandPalette.svelte";
  import NotFound from "./components/NotFound.svelte";
  import "./styles/tokens.css";
  import "./styles/global.css";
  const base = import.meta.env.BASE_URL;
  let language = document.documentElement.lang === "ru" ? "ru" : "en";
  let theme = document.documentElement.dataset.theme;
  let followSystem = window.__opsmonPreferences.system;
  const notFound = !isHome(window.location.pathname, base);
  let palette,
    header,
    copyState = "";
  $: d = dictionaries[language];
  $: updateDocument(d, language, theme);
  $: commands = [
    ...sectionIds.map((id) => ({
      label: d.sections[id],
      group: d.navigationGroup,
      search: `${dictionaries.en.sections[id]} ${dictionaries.ru.sections[id]}`,
      run: () => go(id),
    })),
    ...projects.flatMap((project) => [
      {
        label: project.title,
        group: d.projectGroup,
        search: `${project.description.en} ${project.description.ru}`,
        run: () => window.location.assign(project.demo),
      },
      {
        label: `${project.title} · ${d.source}`,
        group: d.projectGroup,
        search: "GitHub",
        run: () => window.location.assign(project.github),
      },
    ]),
    {
      label: d.switchLanguage,
      group: d.actionGroup,
      search: "language язык English русский",
      run: () => setLanguage(language === "en" ? "ru" : "en"),
    },
    {
      label: d.switchTheme,
      group: d.actionGroup,
      search: "theme тема dark light",
      run: toggleTheme,
    },
    {
      label: d.system,
      group: d.actionGroup,
      search: "theme system тема система",
      run: useSystem,
    },
    {
      label: d.copy,
      group: d.actionGroup,
      search: "email почта " + profile.email,
      run: copy,
    },
  ];
  function setLanguage(value) {
    language = value;
    persist("lang", value);
  }
  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    followSystem = false;
    persist("theme", theme);
  }
  function useSystem() {
    resetTheme();
    followSystem = true;
    theme = matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  function go(id) {
    navigateSection(id, base, notFound);
  }
  function openPalette() {
    header.closeMenu();
    palette.open();
  }
  async function copy() {
    copyState = "";
    copyState = (await copyEmail(profile.email, navigator.clipboard))
      ? "success"
      : "failure";
  }
  function shortcut(event) {
    if (
      event.defaultPrevented ||
      event.repeat ||
      event.isComposing ||
      event.altKey ||
      event.shiftKey
    )
      return;
    const mac = /Mac|iPhone|iPad/.test(navigator.platform);
    if (
      event.key.toLowerCase() === "k" &&
      (mac ? event.metaKey && !event.ctrlKey : event.ctrlKey && !event.metaKey)
    ) {
      event.preventDefault();
      if (!document.querySelector("dialog[open]")) openPalette();
    }
  }
  function updateDocument(dictionary, lang, nextTheme) {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = nextTheme;
    const title = notFound
      ? `${dictionary.notFoundMeta} — ${profile.name}`
      : dictionary.meta.title;
    const description = notFound
      ? dictionary.notFoundText
      : dictionary.meta.description;
    document.title = title;
    for (const [selector, content] of Object.entries({
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
      'meta[name="theme-color"]': nextTheme === "dark" ? "#08060f" : "#f7f4fc",
      'meta[property="og:image:alt"]': dictionary.socialAlt,
      'meta[name="twitter:image:alt"]': dictionary.socialAlt,
      'meta[property="og:locale"]': lang === "ru" ? "ru_RU" : "en_US",
      'meta[name="robots"]': notFound ? "noindex, follow" : "index, follow",
    }))
      document.querySelector(selector)?.setAttribute("content", content);
  }
  onMount(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const change = (event) => {
      if (followSystem) theme = event.matches ? "dark" : "light";
    };
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  });
</script>

<svelte:window on:keydown={shortcut} />
<a class="skip-link" href="#top">{d.skip}</a>
<Header
  bind:this={header}
  {d}
  {language}
  {theme}
  {setLanguage}
  {toggleTheme}
  {openPalette}
  {go}
  {base}
/>
{#if notFound}
  <NotFound {d} {base} />
{:else}
  <main id="top" tabindex="-1">
    <Hero {d} {openPalette} />
    <ProjectShowcase {d} {language} />
    <AboutExperience {d} />
    <StackExplorer {d} />
    <Contributions {d} {language} />
    <Contact {d} {copy} {copyState} />
  </main>
{/if}
<footer class="shell site-footer">
  <a class="brand" href={base}>opsmon<span class="brand-dot">.</span></a><span
    >© {new Date().getFullYear()} {d.name}</span
  ><span>{d.footer}</span><button
    class="system-theme"
    on:click={useSystem}
    aria-pressed={followSystem}
    >{followSystem ? d.themeSystem : d.system}</button
  ><a href="#top">{d.back} ↑</a>
</footer>
<div class="sr-only" role="status">
  {copyState === "success"
    ? d.copied
    : copyState === "failure"
      ? d.copyFailed + " " + profile.email
      : ""}
</div>
<CommandPalette bind:this={palette} {d} {commands} />
