<script>
  import { onMount, tick } from "svelte";
  import { sectionIds } from "../lib/navigation.js";
  export let d;
  export let language;
  export let theme;
  export let setLanguage;
  export let toggleTheme;
  export let openPalette;
  export let go;
  export let base;
  let menuOpen = false,
    menuButton,
    active = "top";
  const links = ["projects", "about", "experience", "skills", "contact"];
  export function closeMenu() {
    menuOpen = false;
  }
  async function toggleMenu() {
    menuOpen = !menuOpen;
    if (menuOpen) {
      await tick();
      document.querySelector("#main-nav a")?.focus();
    }
  }
  function keydown(event) {
    if (event.key === "Escape" && menuOpen) {
      menuOpen = false;
      menuButton.focus();
    }
  }
  function navigate(event, id) {
    event.preventDefault();
    menuOpen = false;
    go(id);
  }
  onMount(() => {
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            active = e.target.classList.contains("hero") ? "top" : e.target.id;
        }
      },
      { rootMargin: "-90px 0px -55% 0px", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el =
        id === "top"
          ? document.querySelector(".hero")
          : document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  });
</script>

<svelte:window on:keydown={keydown} />
<header class="site-header">
  <div class="shell header-inner">
    <a
      class="brand"
      href={base + "#top"}
      aria-label={"opsmon. — " + d.brand.aria}
      aria-current={active === "top" ? "location" : undefined}
      on:click={(e) => navigate(e, "top")}
      ><svg viewBox="0 0 32 32" aria-hidden="true"
        ><path
          d="M5 21V11L13 6l8 5v10l-8 5-8-5Zm8-5 8-5m-8 5v10m8-15 6-4v15l-6 4"
        /></svg
      ><span>opsmon<span class="brand-dot">.</span></span></a
    >
    <nav id="main-nav" class:open={menuOpen} aria-label={d.nav.aria}>
      {#each links as id}<a
          href={base + "#" + id}
          aria-current={active === id ? "location" : undefined}
          on:click={(e) => navigate(e, id)}>{d.sections[id]}</a
        >{/each}
    </nav>
    <div class="header-controls">
      <button
        class="palette-trigger"
        on:click={openPalette}
        aria-label={d.palette}
        ><span aria-hidden="true">⌕</span><kbd>K</kbd></button
      >
      <button
        class="language-button"
        aria-label={d.controls.language + " · " + language.toUpperCase()}
        on:click={() => setLanguage(language === "en" ? "ru" : "en")}
        >{language.toUpperCase()}</button
      >
      <button
        class="icon-button"
        aria-label={d.controls.theme}
        title={theme === "dark" ? d.themeDark : d.themeLight}
        on:click={toggleTheme}
        ><span aria-hidden="true">{theme === "dark" ? "☾" : "☼"}</span></button
      >
      <button
        class="menu-button"
        bind:this={menuButton}
        aria-expanded={menuOpen}
        aria-controls="main-nav"
        aria-label={d.nav.menu}
        on:click={toggleMenu}
        ><span aria-hidden="true">{menuOpen ? "×" : "☰"}</span></button
      >
    </div>
  </div>
</header>
