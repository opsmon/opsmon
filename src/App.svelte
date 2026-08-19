<script>
  import { onMount } from "svelte";
  import {
    contactLinks,
    moreProjects,
    profile,
    projects,
    skills,
    translations,
  } from "./lib/content.js";

  const storageKeys = {
    language: "sergey-frolov-language",
    theme: "sergey-frolov-theme",
  };

  let language = "en";
  let theme = "light";
  let menuOpen = false;
  let showNotFound = false;
  let year = new Date().getFullYear();

  $: dictionary = translations[language] || translations.en;
  $: updateDocument(language, theme, dictionary, menuOpen, showNotFound);

  function localized(value) {
    if (typeof value === "string") {
      return value;
    }

    return value[language] || value.en;
  }

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Storage is optional; the site remains usable without it.
    }
  }

  function preferredLanguage() {
    const urlLanguage = new URLSearchParams(window.location.search).get("lang");
    const storedLanguage = readStorage(storageKeys.language);
    const browserLanguage = navigator.language.toLowerCase().startsWith("ru")
      ? "ru"
      : "en";

    return translations[urlLanguage] ? urlLanguage : storedLanguage || browserLanguage;
  }

  function preferredTheme() {
    const urlTheme = new URLSearchParams(window.location.search).get("theme");
    const storedTheme = readStorage(storageKeys.theme);

    if (urlTheme === "light" || urlTheme === "dark") {
      return urlTheme;
    }

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setLanguage(nextLanguage) {
    language = translations[nextLanguage] ? nextLanguage : "en";
    writeStorage(storageKeys.language, language);
  }

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
    writeStorage(storageKeys.theme, theme);
  }

  function closeMenu() {
    menuOpen = false;
  }

  function homeHref() {
    return window.location.pathname.startsWith("/opsmon") ? "/opsmon/" : "/";
  }

  function isNotFoundPath() {
    const normalizedPath = window.location.pathname.replace(/\/+$/, "/");

    return ![
      "/",
      "/index.html",
      "/opsmon/",
      "/opsmon/index.html",
    ].includes(normalizedPath);
  }

  function updateDocument(nextLanguage, nextTheme, nextDictionary, isMenuOpen, isNotFound) {
    if (typeof document === "undefined") {
      return;
    }

    document.documentElement.lang = nextLanguage;
    document.documentElement.dataset.theme = nextTheme;
    document.body.dataset.menuOpen = String(isMenuOpen);
    document.title = isNotFound
      ? `Page not found - ${profile.name}`
      : nextDictionary.meta.title;

    const meta = {
      'meta[name="description"]': isNotFound
        ? "Page not found."
        : nextDictionary.meta.description,
      'meta[property="og:title"]': nextDictionary.meta.title,
      'meta[property="og:description"]': nextDictionary.meta.description,
      'meta[name="twitter:title"]': nextDictionary.meta.title,
      'meta[name="twitter:description"]': nextDictionary.meta.description,
      'meta[name="theme-color"]': nextTheme === "dark" ? "#111412" : "#f7f8f6",
    };

    Object.entries(meta).forEach(([selector, content]) => {
      const node = document.querySelector(selector);

      if (node) {
        node.setAttribute("content", content);
      }
    });
  }

  function reveal(node) {
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  onMount(() => {
    language = preferredLanguage();
    theme = preferredTheme();
    showNotFound = isNotFoundPath();
    year = new Date().getFullYear();
  });
</script>

{#if showNotFound}
  <main class="shell not-found">
    <section class="not-found-copy" aria-labelledby="not-found-title">
      <p class="eyebrow">HTTP 404</p>
      <h1 id="not-found-title">Pod not found.</h1>
      <p>
        The requested page left the cluster, missed the readiness probe, and is
        currently pretending this was a planned migration.
      </p>
      <div class="hero-actions">
        <a class="button button-primary" href={homeHref()}>Back to portfolio</a>
        <a
          class="button button-secondary"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >Open GitHub</a>
      </div>
    </section>

    <aside class="not-found-terminal" aria-label="404 diagnostic output">
      <div class="terminal-top" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <pre><code>$ kubectl get page /this-route
NAME          STATUS              AGE
this-route    CrashLoopBackOff    404s

$ kubectl describe page /this-route
Reason:  Link wandered away
Action:  Return to a healthy endpoint

$ echo "no panic, just routing"
no panic, just routing</code></pre>
    </aside>
  </main>
{:else}
  <header class="site-header">
    <nav class="nav shell" aria-label={dictionary.nav.aria}>
      <a class="brand" href="#top" aria-label={dictionary.brand.aria} on:click={closeMenu}>
        <span class="brand-mark brand-logo" aria-hidden="true">
          <svg viewBox="0 0 32 32" role="img">
            <path d="M7 20.5V11.5L16 6.5L25 11.5V20.5L16 25.5L7 20.5Z" />
            <path d="M12 16H20" />
            <path d="M16 12V20" />
            <circle cx="16" cy="16" r="2.5" />
          </svg>
        </span>
        <span class="brand-name">{profile.name}</span>
      </a>

      <button
        class="menu-button"
        type="button"
        aria-controls="nav-panel"
        aria-expanded={menuOpen}
        on:click={() => (menuOpen = !menuOpen)}
      >
        <span class="menu-lines" aria-hidden="true"></span>
        <span class="sr-only">{dictionary.nav.menu}</span>
      </button>

      <div class="nav-panel" id="nav-panel" data-open={menuOpen}>
        <div class="nav-links">
          <a href="#about" on:click={closeMenu}>{dictionary.nav.about}</a>
          <a href="#experience" on:click={closeMenu}>{dictionary.nav.experience}</a>
          <a href="#projects" on:click={closeMenu}>{dictionary.nav.projects}</a>
          <a href="#contact" on:click={closeMenu}>{dictionary.nav.contact}</a>
        </div>
        <div class="nav-controls">
          <div class="segmented-control" role="group" aria-label={dictionary.controls.language}>
            {#each Object.keys(translations) as key}
              <button
                type="button"
                aria-pressed={language === key}
                on:click={() => setLanguage(key)}
              >{key.toUpperCase()}</button>
            {/each}
          </div>
          <button
            class="icon-button theme-button"
            type="button"
            aria-label={dictionary.controls.theme}
            on:click={toggleTheme}
          >
            <span class="sun-icon" aria-hidden="true"></span>
            <span class="moon-icon" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </nav>
  </header>

  <main id="top">
    <section class="hero shell" aria-labelledby="hero-title">
      <div class="hero-copy reveal" use:reveal>
        <div class="status-line">
          <span class="status-dot" aria-hidden="true"></span>
          <span>{dictionary.hero.status}</span>
          <span class="status-separator" aria-hidden="true"></span>
          <span>{dictionary.hero.open}</span>
        </div>
        <h1 id="hero-title">{dictionary.hero.title}</h1>
        <p class="hero-lead">{dictionary.hero.lead}</p>
        <div class="tag-row">
          {#each dictionary.hero.tags as tag}
            <span class="chip chip-strong">{tag}</span>
          {/each}
        </div>
        <div class="hero-actions">
          <a class="button button-primary" href="#projects">{dictionary.hero.projects}</a>
          <a class="button button-secondary" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a class="button button-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>

      <aside class="profile-panel reveal" aria-label={dictionary.hero.profileAria} use:reveal>
        <img src={profile.avatar} width="176" height="176" alt={dictionary.hero.avatarAlt} />
        <div class="ai-activity" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <p class="profile-kicker">{profile.name}</p>
          <strong>{dictionary.hero.role}</strong>
          <span>{dictionary.hero.positioning}</span>
        </div>
        <div class="mini-flow" aria-label={dictionary.direction.aria}>
          <span>Infrastructure</span>
          <span>Platforms</span>
          <span>Observability</span>
          <span>MLOps</span>
        </div>
      </aside>
    </section>

    <section class="metrics shell" aria-label={dictionary.metrics.aria}>
      <div>
        {#each dictionary.metrics.items as [value, label]}
          <article class="metric-card reveal" use:reveal>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        {/each}
      </div>
    </section>

    <section class="section shell" id="about" aria-labelledby="about-title">
      <div class="section-heading reveal" use:reveal>
        <p class="eyebrow">{dictionary.about.eyebrow}</p>
        <h2 id="about-title">{dictionary.about.title}</h2>
      </div>
      <div class="about-layout">
        <div class="about-copy reveal" use:reveal>
          {#each dictionary.about.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}
        </div>
        <div class="focus-card reveal" use:reveal>
          <h3>{dictionary.about.focusTitle}</h3>
          <ul>
            {#each dictionary.about.focus as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>
      </div>
    </section>

    <section class="section shell" id="experience" aria-labelledby="experience-title">
      <div class="section-heading reveal" use:reveal>
        <p class="eyebrow">{dictionary.experience.eyebrow}</p>
        <h2 id="experience-title">{dictionary.experience.title}</h2>
      </div>
      <div class="experience-grid">
        {#each dictionary.experience.items as [title, text], index}
          <article class="experience-card reveal" use:reveal>
            <span class="card-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        {/each}
      </div>
    </section>

    <section class="section shell" id="skills" aria-labelledby="skills-title">
      <div class="section-heading reveal" use:reveal>
        <p class="eyebrow">{dictionary.skills.eyebrow}</p>
        <h2 id="skills-title">{dictionary.skills.title}</h2>
      </div>
      <div class="skills-grid">
        {#each skills as group}
          <article class:skill-card-direction={group.direction} class="skill-card reveal" use:reveal>
            <h3>{group.title}</h3>
            <div class="chip-list">
              {#each [...(group.primary || []), ...(group.items || [])] as skill}
                <span class:chip-strong={group.primary?.includes(skill)} class="chip">{skill}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>
    </section>

    <section class="section projects-section" id="projects" aria-labelledby="projects-title">
      <div class="shell">
        <div class="section-heading reveal" use:reveal>
          <p class="eyebrow">{dictionary.projects.eyebrow}</p>
          <h2 id="projects-title">{dictionary.projects.title}</h2>
        </div>
        <div class="projects-grid">
          {#each projects as project}
            <article class:project-card-featured={project.featured} class="project-card reveal" use:reveal>
              <div class="project-top">
                <span class="project-category">{project.category}</span>
                <span class="project-status">{project.status}</span>
              </div>
              <h3>{project.title}</h3>
              <p class="project-description">{localized(project.description)}</p>
              <div class="project-stack">
                <span class="stack-label">{dictionary.projects.stackLabel}</span>
                {#each project.stack as item}
                  <span class="chip">{item}</span>
                {/each}
              </div>
              <div class="project-links">
                <a class="text-link" href={project.github} target="_blank" rel="noreferrer">{dictionary.projects.githubLabel}</a>
                {#if project.demo}
                  <a class="text-link" href={project.demo} target="_blank" rel="noreferrer">{dictionary.projects.demoLabel}</a>
                {/if}
              </div>
            </article>
          {/each}
        </div>
        <div class="more-projects reveal" use:reveal>
          <div>
            <p class="eyebrow">{dictionary.projects.moreEyebrow}</p>
            <h3>{dictionary.projects.moreTitle}</h3>
          </div>
          <div class="more-project-links">
            {#each moreProjects as project}
              <a class="more-project-link" href={project.url} target="_blank" rel="noreferrer">
                <strong>{project.title}</strong>
                <span>{localized(project.description)}</span>
                <span class="arrow">{dictionary.projects.openLabel}</span>
              </a>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <section class="section shell contact-section" id="contact" aria-labelledby="contact-title">
      <div class="contact-inner reveal" use:reveal>
        <div>
          <p class="eyebrow">{dictionary.contact.eyebrow}</p>
          <h2 id="contact-title">{dictionary.contact.title}</h2>
          <p>{dictionary.contact.text}</p>
        </div>
        <div class="contact-links">
          {#each contactLinks.filter((link) => link.label !== "Email" || profile.email) as link}
            <a
              class="contact-link"
              href={link.url}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
            >{link.label}</a>
          {/each}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer shell">
    <span>© {year} {profile.name}</span>
  </footer>
{/if}
