<script>
  import { onMount } from "svelte";

const profile = {
  name: "Sergey Frolov",
  handle: "opsmon",
  role: "DevOps Engineer",
  site: "https://opsmon.github.io/opsmon/",
  avatar: "https://avatars.githubusercontent.com/u/167893183?v=4",
  github: "https://github.com/opsmon",
  linkedin: "https://www.linkedin.com/in/opsmon/",
  email: "opsmon.sh@yandex.com",
};

const translations = {
  en: {
    meta: {
      title: "Sergey Frolov - DevOps Engineer",
      description:
        "DevOps Engineer focused on Kubernetes, CI/CD, observability, infrastructure automation and practical MLOps projects.",
    },
    nav: {
      aria: "Main navigation",
      menu: "Menu",
      about: "About",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
    },
    brand: {
      aria: "Sergey Frolov, home",
    },
    controls: {
      language: "Choose language",
      theme: "Switch between light and dark theme",
    },
    hero: {
      status: "DevOps Engineer",
      open: "Open to engineering collaboration",
      title: "DevOps and observability.",
      lead:
        "Kubernetes, Linux, automation, monitoring and practical MLOps projects.",
      projects: "View projects",
      profileAria: "Profile snapshot",
      avatarAlt: "Sergey Frolov GitHub avatar",
      role: "DevOps Engineer",
      positioning:
        "DevOps Engineer focused on Kubernetes, Linux, automation and observability. I also work on practical MLOps and AIOps projects.",
      tags: [
        "Kubernetes",
        "Platform Engineering",
        "Observability",
        "Automation",
        "MLOps",
      ],
    },
    metrics: {
      aria: "Professional highlights",
      items: [
        ["7+ years", "in IT"],
        ["Kubernetes", "platform stack"],
        ["Open-source", "contributions"],
        ["DevOps + MLOps", "practical direction"],
      ],
    },
    about: {
      eyebrow: "About",
      title: "Short version: infrastructure, automation, observability.",
      focusTitle: "Focus",
      paragraphs: [
        "I am a DevOps engineer with 7+ years in IT. Most of my work is around Linux, Kubernetes, automation, observability and predictable delivery.",
        "This page is intentionally short: stack, public projects, documentation contributions and MLOps/AIOps experiments I am building in practice.",
      ],
      focus: [
        "Linux, Kubernetes and infrastructure",
        "Automation, delivery and GitOps",
        "Metrics, logs, alerts and incident context",
        "Public projects, documentation and MLOps practice",
      ],
    },
    experience: {
      eyebrow: "Experience",
      title: "7+ years in IT",
      items: [
        ["DevOps", "Infrastructure, Linux, Kubernetes and automation."],
        ["Delivery", "Pipelines, releases, GitOps and repeatable environments."],
        ["Observability", "Metrics, logs, alerts and incident context."],
        ["MLOps direction", "Python, model delivery, LLM integrations and AIOps practice."],
      ],
    },
    skills: {
      eyebrow: "Stack",
      title: "Core tools I use most often.",
    },
    projects: {
      eyebrow: "Featured Projects",
      title: "Projects and contributions, briefly.",
      problemLabel: "Problem",
      solutionLabel: "Solution",
      stackLabel: "Stack",
      githubLabel: "GitHub",
      demoLabel: "Live demo",
      moreEyebrow: "Contributions",
      moreTitle: "Open-source contributions and community work",
      openLabel: "Open",
    },
    direction: {
      aria: "Career direction",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's build reliable engineering platforms.",
      text:
        "Open to technical discussions, open-source collaboration, speaking opportunities and engineering projects.",
    },
  },
  ru: {
    meta: {
      title: "Sergey Frolov - DevOps Engineer",
      description:
        "DevOps-инженер: Kubernetes, CI/CD, наблюдаемость, автоматизация инфраструктуры и практические MLOps-проекты.",
    },
    nav: {
      aria: "Основная навигация",
      menu: "Меню",
      about: "Обо мне",
      experience: "Опыт",
      projects: "Проекты",
      contact: "Контакты",
    },
    brand: {
      aria: "Sergey Frolov, на главную",
    },
    controls: {
      language: "Выбор языка",
      theme: "Переключить светлую или тёмную тему",
    },
    hero: {
      status: "DevOps Engineer",
      open: "Open to engineering collaboration",
      title: "DevOps и observability.",
      lead:
        "Kubernetes, Linux, автоматизация, мониторинг и практические MLOps-проекты.",
      projects: "Посмотреть проекты",
      profileAria: "Краткий профиль",
      avatarAlt: "GitHub-аватар Сергея Фролова",
      role: "DevOps Engineer",
      positioning:
        "DevOps-инженер: Kubernetes, Linux, автоматизация и наблюдаемость. Также работаю над практическими MLOps и AIOps-проектами.",
      tags: [
        "Kubernetes",
        "Platform Engineering",
        "Observability",
        "Automation",
        "MLOps",
      ],
    },
    metrics: {
      aria: "Профессиональные показатели",
      items: [
        ["7+ лет", "в IT"],
        ["Kubernetes", "платформенный стек"],
        ["Open-source", "вклады"],
        ["DevOps + MLOps", "практическое направление"],
      ],
    },
    about: {
      eyebrow: "Обо мне",
      title:
        "Коротко: инфраструктура, автоматизация, наблюдаемость.",
      focusTitle: "Фокус",
      paragraphs: [
        "Я DevOps-инженер с опытом 7+ лет в IT. Основная работа вокруг Linux, Kubernetes, автоматизации, наблюдаемости и предсказуемой доставки.",
        "Здесь всё коротко: стек, публичные проекты, вклад в документацию и MLOps/AIOps-эксперименты, которые я делаю на практике.",
      ],
      focus: [
        "Linux, Kubernetes и инфраструктура",
        "Автоматизация, доставка и GitOps",
        "Метрики, логи, алерты и контекст инцидентов",
        "Публичные проекты, документация и MLOps-практика",
      ],
    },
    experience: {
      eyebrow: "Опыт",
      title: "7+ лет в IT",
      items: [
        ["DevOps", "Инфраструктура, Linux, Kubernetes и автоматизация."],
        ["Delivery", "Пайплайны, релизы, GitOps и повторяемые окружения."],
        ["Observability", "Метрики, логи, алерты и контекст инцидентов."],
        ["MLOps direction", "Python, доставка моделей, LLM-интеграции и AIOps-практика."],
      ],
    },
    skills: {
      eyebrow: "Стек",
      title: "Основные инструменты, с которыми работаю.",
    },
    projects: {
      eyebrow: "Featured Projects",
      title: "Проекты и вклады, коротко.",
      problemLabel: "Проблема",
      solutionLabel: "Решение",
      stackLabel: "Стек",
      githubLabel: "GitHub",
      demoLabel: "Live demo",
      moreEyebrow: "Contributions",
      moreTitle: "Вклад в open-source и сообщество",
      openLabel: "Открыть",
    },
    direction: {
      aria: "Направление развития",
    },
    contact: {
      eyebrow: "Контакты",
      title: "Давайте создавать надёжные инженерные платформы.",
      text:
        "Открыт к техническим обсуждениям, open-source сотрудничеству, выступлениям и инженерным проектам.",
    },
  },
};

const skills = [
  {
    title: "Platform & Containers",
    primary: ["Kubernetes", "Docker", "Helm"],
    items: [
      "containerd",
      "Kustomize",
      "Argo CD",
      "GitOps",
      "Ingress",
      "NGINX Ingress",
      "cert-manager",
      "ExternalDNS",
      "Istio",
      "Linkerd",
    ],
  },
  {
    title: "CI/CD & Automation",
    primary: ["CI/CD", "Linux"],
    items: [
      "Terraform",
      "OpenTofu",
      "Ansible",
      "Packer",
      "Python",
      "Bash",
      "Make",
      "release automation",
    ],
  },
  {
    title: "Observability",
    primary: ["Observability"],
    items: [
      "Prometheus",
      "Alertmanager",
      "Grafana",
      "Loki",
      "Tempo",
      "VictoriaMetrics",
      "OpenTelemetry",
      "Sentry",
      "logs",
      "metrics",
      "traces",
      "alerting",
      "incident investigation",
    ],
  },
  {
    title: "Systems & Security",
    primary: ["Linux"],
    items: [
      "systemd",
      "Nginx",
      "HAProxy",
      "DNS",
      "TLS",
      "Git",
      "Vault",
      "RBAC",
      "network policies",
    ],
  },
  {
    title: "Data & Messaging",
    items: [
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Kafka",
      "ClickHouse",
      "S3",
      "MinIO",
    ],
  },
  {
    title: "MLOps Direction",
    direction: true,
    primary: ["Python", "FastAPI"],
    items: [
      "model serving",
      "experiment tracking",
      "MLflow",
      "DVC",
      "Airflow",
      "Kubeflow",
      "KServe",
      "BentoML",
      "Ray",
      "Hugging Face",
      "vector databases",
      "LLM integrations",
      "RAG",
      "AIOps",
    ],
  },
];

const projects = [
  {
    title: "kubectl Cheatsheet",
    status: "Open source",
    category: "Kubernetes · Documentation",
    description: {
      en:
        "Bilingual searchable Kubernetes reference with practical kubectl commands.",
      ru:
        "Двуязычный Kubernetes-справочник с поиском и практическими kubectl-командами.",
    },
    problem: {
      en:
        "Engineers need quick, practical commands without losing the link to official documentation.",
      ru:
        "Инженерам нужны быстрые практические команды без потери связи с официальной документацией.",
    },
    solution: {
      en:
        "Search, categories, RU/EN content, practical examples and a documentation-first structure.",
      ru:
        "Поиск, категории, RU/EN, практические примеры и documentation-first структура.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Kubernetes"],
    features: ["RU/EN", "search", "categories", "practical examples"],
    github: "https://github.com/opsmon/kubectl-cheatsheet",
    demo: "https://opsmon.github.io/kubectl-cheatsheet/",
  },
  {
    title: "macOS Engineering Setup",
    status: "Automation",
    category: "Bootstrap · DevOps Tooling",
    description: {
      en:
        "Reproducible macOS bootstrap kit for DevOps tooling.",
      ru:
        "Воспроизводимый macOS bootstrap-kit для DevOps-инструментов.",
    },
    problem: {
      en:
        "New workstations take time to configure and can drift from the team baseline.",
      ru:
        "Новые рабочие станции долго настраиваются и легко расходятся с командным baseline.",
    },
    solution: {
      en:
        "Repeatable setup for Homebrew, Docker, Kubernetes tooling, Terraform, Ansible, Argo CD, VS Code and shell configuration.",
      ru:
        "Повторяемая настройка Homebrew, Docker, Kubernetes tooling, Terraform, Ansible, Argo CD, VS Code и shell configuration.",
    },
    stack: ["Bash", "Homebrew", "Docker", "Terraform", "Ansible"],
    features: ["repeatable setup", "safe handling of secrets", "developer tooling"],
    github: "https://github.com/opsmon/setup",
    demo: "https://opsmon.github.io/setup/",
  },
  {
    title: "Travel Checklist",
    status: "Product thinking",
    category: "Static Web · UX",
    description: {
      en:
        "Travel checklist tool with saved progress and shareable lists.",
      ru:
        "Travel checklist с сохранением прогресса и ссылками для совместного использования.",
    },
    problem: {
      en:
        "Travel preparation is repetitive, easy to forget and different for each country.",
      ru:
        "Подготовка к поездкам повторяется, легко забывается и зависит от страны.",
    },
    solution: {
      en:
        "A finished user-facing static service with country guidance, saved progress and shareable lists.",
      ru:
        "Законченный пользовательский статический сервис с рекомендациями, сохранением прогресса и ссылками для совместного использования.",
    },
    stack: ["HTML", "CSS", "JavaScript"],
    features: ["country recommendations", "saved progress", "shareable checklists"],
    github: "https://github.com/opsmon/travel",
    demo: "https://opsmon.github.io/travel/",
  },
];

const moreProjects = [
  {
    title: "Kubernetes Documentation",
    description: {
      en: "Contribution to open infrastructure documentation",
      ru: "Вклад в открытую инфраструктурную документацию",
    },
    url: "https://github.com/kubernetes/website",
  },
  {
    title: "Yandex Cloud Documentation",
    description: {
      en: "Documentation contribution and practical improvements",
      ru: "Вклад в документацию и практические улучшения",
    },
    url: "https://github.com/yandex-cloud/docs",
  },
  {
    title: "DeckHouse User Community",
    description: {
      en: "Community contributor",
      ru: "Контрибьютер пользовательского сообщества",
    },
    url: "https://deckhouse.ru/community/",
  },
  {
    title: "Habr",
    description: {
      en: "Articles and public writing",
      ru: "Статьи и публичные материалы",
    },
    url: "https://habr.com/ru/users/opsmon/",
  },
  {
    title: "IncidentGPT",
    description: {
      en: "AIOps assistant contribution for incident context and LLM analysis drafts",
      ru: "Вклад в AIOps-ассистента для контекста инцидентов и LLM-черновиков анализа",
    },
    url: "https://github.com/opsmon/IncidentGPT",
  },
  {
    title: "GitHub Profile",
    description: {
      en: "Public projects and experiments",
      ru: "Публичные проекты и эксперименты",
    },
    url: "https://github.com/opsmon",
  },
];

const contactLinks = [
  {
    label: "GitHub",
    url: profile.github,
  },
  {
    label: "LinkedIn",
    url: profile.linkedin,
  },
  {
    label: "Email",
    url: `mailto:${profile.email}`,
  },
];



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

<style>
:root {
  color-scheme: light;
  --bg: #f7f8f6;
  --bg-elevated: rgba(255, 255, 255, 0.72);
  --bg-muted: rgba(238, 241, 236, 0.72);
  --bg-inverse: #141614;
  --text: #171a18;
  --muted: #5e665f;
  --soft: #7d857e;
  --line: rgba(23, 26, 24, 0.11);
  --line-strong: rgba(23, 26, 24, 0.18);
  --accent: #6d3df2;
  --accent-strong: #5227c8;
  --accent-soft: #ece6ff;
  --warning-soft: #f4ead4;
  --shadow: 0 18px 50px rgba(20, 22, 20, 0.08);
  --glass-highlight: rgba(255, 255, 255, 0.72);
  --radius-card: 20px;
  --radius-control: 14px;
  --radius-soft: 16px;
  --max: 1160px;
  --header-height: 72px;
}

:global(html[data-theme="dark"] ) {
  color-scheme: dark;
  --bg: #111412;
  --bg-elevated: rgba(24, 28, 25, 0.72);
  --bg-muted: rgba(32, 38, 32, 0.72);
  --bg-inverse: #f5f7f2;
  --text: #f2f5ef;
  --muted: #bac3ba;
  --soft: #8f9a91;
  --line: rgba(242, 245, 239, 0.12);
  --line-strong: rgba(242, 245, 239, 0.22);
  --accent: #a78bfa;
  --accent-strong: #c4b5fd;
  --accent-soft: rgba(167, 139, 250, 0.16);
  --warning-soft: rgba(244, 234, 212, 0.1);
  --shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
  --glass-highlight: rgba(255, 255, 255, 0.08);
}

* {
  box-sizing: border-box;
}

:global(html) {
  min-width: 320px;
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--header-height) + 16px);
}

:global(body) {
  min-width: 320px;
  margin: 0;
  overflow-x: hidden;
  background:
    linear-gradient(180deg, rgba(109, 61, 242, 0.07), transparent 360px),
    var(--bg);
  color: var(--text);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

:global(body[data-menu-open="true"]) {
  overflow: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
}

button {
  font: inherit;
}

::selection {
  background: var(--accent-soft);
}

.shell {
  width: min(var(--max), calc(100% - 48px));
  margin-inline: auto;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--accent), transparent 28%);
  outline-offset: 3px;
}

.site-header {
  position: sticky;
  z-index: 50;
  top: 0;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--bg), transparent 12%);
  backdrop-filter: blur(18px);
}

.nav {
  display: flex;
  min-height: var(--header-height);
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.brand-mark {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 56%);
  border-radius: var(--radius-control);
  background:
    linear-gradient(145deg, var(--glass-highlight), transparent 52%),
    color-mix(in srgb, var(--accent-soft), var(--bg-elevated) 58%);
  color: var(--accent);
  font-size: 13px;
  letter-spacing: 0;
  box-shadow: 0 10px 28px color-mix(in srgb, var(--accent), transparent 86%);
  backdrop-filter: blur(18px) saturate(145%);
  -webkit-backdrop-filter: blur(18px) saturate(145%);
}

.brand-logo svg {
  width: 22px;
  height: 22px;
  overflow: visible;
}

.brand-logo path,
.brand-logo circle {
  fill: none;
  stroke: currentColor;
  stroke-width: 2.1;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.brand-logo circle {
  fill: currentColor;
  stroke: none;
}

.brand-name {
  white-space: nowrap;
}

.nav-panel,
.nav-links,
.nav-controls {
  display: flex;
  align-items: center;
}

.nav-panel {
  gap: 30px;
}

.nav-links {
  gap: 22px;
}

.nav-links a {
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  color: var(--muted);
  font-size: 14px;
  font-weight: 560;
}

.nav-links a:hover {
  color: var(--text);
}

.nav-controls {
  gap: 10px;
}

.segmented-control {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 2px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: var(--radius-control);
  background: var(--bg-muted);
}

.segmented-control button,
.icon-button,
.menu-button {
  min-width: 44px;
  min-height: 44px;
  border: 0;
  border-radius: calc(var(--radius-control) - 4px);
  background: transparent;
  color: var(--muted);
  cursor: pointer;
}

.segmented-control button {
  min-height: 34px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 750;
}

.segmented-control button[aria-pressed="true"] {
  background: var(--bg-elevated);
  color: var(--text);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.08);
}

.icon-button {
  position: relative;
  display: grid;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
  place-items: center;
}

.sun-icon,
.moon-icon {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
}

.sun-icon {
  border: 2px solid currentColor;
  opacity: 1;
}

.moon-icon {
  background: currentColor;
  opacity: 0;
  transform: translateY(4px);
}

:global(html[data-theme="dark"]) .sun-icon {
  opacity: 0;
  transform: translateY(-4px);
}

:global(html[data-theme="dark"]) .moon-icon {
  opacity: 1;
  transform: translateY(0);
}

.menu-button {
  display: none;
  border: 1px solid var(--line);
  background: var(--bg-elevated);
}

.menu-lines,
.menu-lines::before,
.menu-lines::after {
  display: block;
  width: 18px;
  height: 2px;
  margin-inline: auto;
  border-radius: 2px;
  background: currentColor;
  content: "";
}

.menu-lines::before {
  transform: translateY(-6px);
}

.menu-lines::after {
  transform: translateY(4px);
}

.hero {
  display: grid;
  min-height: min(88vh, 860px);
  grid-template-columns: minmax(0, 1fr) minmax(300px, 420px);
  gap: clamp(42px, 7vw, 90px);
  align-items: center;
  padding: 86px 0 64px;
}

.hero-copy {
  min-width: 0;
}

.status-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 26px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 650;
}

.status-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--accent-soft);
}

.status-separator {
  width: 1px;
  height: 16px;
  background: var(--line-strong);
}

h1,
h2,
h3,
p {
  overflow-wrap: anywhere;
}

.hero h1 {
  max-width: 790px;
  margin: 0;
  font-size: clamp(42px, 7vw, 84px);
  letter-spacing: 0;
  line-height: 0.98;
}

:global(html[lang="ru"]) .hero h1 {
  max-width: 850px;
  font-size: clamp(36px, 6.2vw, 72px);
}

.hero-lead {
  max-width: 720px;
  margin: 26px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 22px);
  line-height: 1.55;
}

.tag-row,
.chip-list,
.project-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-row {
  margin-top: 26px;
}

.chip {
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg-elevated);
  color: var(--muted);
  font-size: 13px;
  font-weight: 560;
}

.chip-strong {
  border-color: color-mix(in srgb, var(--accent), transparent 68%);
  background: var(--accent-soft);
  color: var(--accent-strong);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.button {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 1px solid transparent;
  border-radius: var(--radius-control);
  font-weight: 700;
  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: var(--accent);
  color: #ffffff;
}

.button-primary:hover {
  background: var(--accent-strong);
}

.button-secondary {
  border-color: var(--line);
  background: var(--bg-elevated);
  color: var(--text);
}

.button-secondary:hover {
  border-color: var(--line-strong);
}

.profile-panel,
.focus-card,
.metric-card,
.experience-card,
.skill-card,
.project-card,
.more-projects {
  border: 1px solid var(--line);
  border-radius: var(--radius-card);
  background:
    linear-gradient(145deg, var(--glass-highlight), transparent 46%),
    var(--bg-elevated);
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
}

.profile-panel {
  position: relative;
  display: grid;
  gap: 24px;
  align-self: center;
  padding: 28px;
  overflow: hidden;
}

.profile-panel img {
  position: relative;
  z-index: 1;
  display: block;
  width: 112px;
  height: 112px;
  border: 1px solid var(--line);
  border-radius: var(--radius-soft);
  object-fit: cover;
}

.profile-panel > div:not(.ai-activity),
.mini-flow {
  position: relative;
  z-index: 1;
}

.ai-activity {
  position: absolute;
  top: 28px;
  right: 28px;
  width: 126px;
  height: 88px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--accent), transparent 74%);
  border-radius: var(--radius-soft);
  background:
    linear-gradient(90deg, color-mix(in srgb, var(--accent), transparent 88%) 1px, transparent 1px),
    linear-gradient(180deg, color-mix(in srgb, var(--accent), transparent 88%) 1px, transparent 1px),
    color-mix(in srgb, var(--accent-soft), transparent 56%);
  background-size: 21px 21px;
  opacity: 0.78;
}

.ai-activity::before {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 0 34%,
    color-mix(in srgb, var(--accent), transparent 62%) 48%,
    transparent 62% 100%
  );
  content: "";
  transform: translateX(-120%);
  animation: ai-scan 4.8s ease-in-out infinite;
}

.ai-activity span {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 18px color-mix(in srgb, var(--accent), transparent 42%);
  animation: ai-pulse 2.8s ease-in-out infinite;
}

.ai-activity span:first-child {
  top: 18px;
  left: 18px;
}

.ai-activity span:nth-child(2) {
  top: 50px;
  left: 42px;
  animation-delay: 420ms;
}

.ai-activity span:nth-child(3) {
  top: 28px;
  right: 28px;
  animation-delay: 840ms;
}

.ai-activity span:nth-child(4) {
  right: 48px;
  bottom: 16px;
  animation-delay: 1260ms;
}

.profile-kicker {
  margin: 0 0 6px;
  color: var(--soft);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
}

.profile-panel strong {
  display: block;
  margin-bottom: 12px;
  font-size: 26px;
  line-height: 1.15;
}

.profile-panel span {
  color: var(--muted);
}

.mini-flow {
  display: grid;
  gap: 8px;
}

.mini-flow span {
  min-height: 36px;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: var(--radius-control);
  background: var(--bg-muted);
  color: var(--muted);
  font-size: 13px;
  font-weight: 650;
}

.metrics {
  padding-bottom: 52px;
}

.metrics > div {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.metric-card {
  min-height: 112px;
  padding: 20px;
}

.metric-card strong,
.metric-card span {
  display: block;
}

.metric-card strong {
  margin-bottom: 8px;
  font-size: clamp(25px, 3vw, 34px);
  line-height: 1;
}

.metric-card span {
  color: var(--muted);
}

.section {
  padding: 86px 0;
}

.section-heading {
  max-width: 820px;
  margin-bottom: 42px;
}

.eyebrow {
  margin: 0 0 12px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.section-heading h2,
.contact-inner h2 {
  margin: 0;
  font-size: clamp(34px, 5vw, 58px);
  letter-spacing: 0;
  line-height: 1.05;
}

.about-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 380px);
  gap: 28px;
}

.about-copy {
  max-width: 760px;
  color: var(--muted);
  font-size: clamp(17px, 1.6vw, 20px);
}

.about-copy p {
  margin: 0;
}

.about-copy p + p {
  margin-top: 18px;
}

.focus-card {
  padding: 24px;
}

.focus-card h3,
.skill-card h3 {
  margin: 0;
  font-size: 20px;
}

.focus-card ul {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.focus-card li {
  position: relative;
  padding-left: 18px;
  color: var(--muted);
}

.focus-card li::before {
  position: absolute;
  top: 0.66em;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  content: "";
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.experience-card {
  min-height: 210px;
  padding: 22px;
}

.experience-card h3 {
  margin: 0;
  font-size: 22px;
}

.experience-card p {
  margin: 14px 0 0;
  color: var(--muted);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.skill-card {
  min-height: 188px;
  padding: 22px;
}

.skill-card h3 {
  margin-bottom: 18px;
}

.skill-card-direction {
  background:
    linear-gradient(180deg, var(--accent-soft), transparent 72%),
    var(--bg-elevated);
}

.projects-section {
  background: var(--bg-inverse);
  color: var(--bg);
}

:global(html[data-theme="dark"]) .projects-section {
  background: #080a08;
  color: var(--text);
}

.projects-section .eyebrow {
  color: var(--accent-strong);
}

:global(html[data-theme="dark"]) .projects-section .eyebrow {
  color: var(--accent);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 14px;
}

.project-card {
  display: grid;
  min-height: 340px;
  align-content: start;
  gap: 20px;
  padding: 24px;
  background: color-mix(in srgb, var(--bg-inverse), #ffffff 8%);
  color: var(--bg);
  box-shadow: none;
}

:global(html[data-theme="dark"]) .project-card {
  background: var(--bg-elevated);
  color: var(--text);
}

.project-card-featured {
  grid-row: span 2;
  min-height: 460px;
  background:
    linear-gradient(180deg, rgba(167, 139, 250, 0.18), transparent 58%),
    color-mix(in srgb, var(--bg-inverse), #ffffff 7%);
}

:global(html[data-theme="dark"]) .project-card-featured {
  background:
    linear-gradient(180deg, rgba(167, 139, 250, 0.12), transparent 58%),
    var(--bg-elevated);
}

.project-top {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.project-category,
.project-status,
.stack-label {
  color: color-mix(in srgb, currentColor, transparent 36%);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.project-status {
  min-height: 30px;
  padding: 6px 9px;
  border: 1px solid currentColor;
  border-radius: 999px;
  color: var(--accent-strong);
  text-transform: none;
}

:global(html[data-theme="dark"]) .project-status {
  color: var(--accent);
}

.project-card h3 {
  margin: 0;
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.03;
}

.project-description {
  margin: 0;
  color: color-mix(in srgb, currentColor, transparent 24%);
}

.project-description {
  font-size: 17px;
}

:global(html[data-theme="dark"]) .project-card .chip {
  border-color: color-mix(in srgb, currentColor, transparent 78%);
  background: transparent;
  color: color-mix(in srgb, currentColor, transparent 18%);
}

.project-stack {
  align-items: center;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
}

.text-link,
.contact-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-control);
  font-weight: 750;
}

.text-link {
  padding: 0 13px;
  border: 1px solid color-mix(in srgb, currentColor, transparent 76%);
  color: inherit;
}

.text-link::after,
.contact-link::after {
  margin-left: 8px;
  content: "↗";
}

.text-link:hover,
.more-project-link:hover,
.contact-link:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.more-projects {
  display: grid;
  grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1fr);
  gap: 22px;
  margin-top: 14px;
  padding: 24px;
  background: color-mix(in srgb, var(--bg-inverse), #ffffff 8%);
  color: var(--bg);
  box-shadow: none;
}

:global(html[data-theme="dark"]) .more-projects {
  background: var(--bg-elevated);
  color: var(--text);
}

.more-projects h3 {
  margin: 0;
  font-size: 24px;
}

.more-project-links {
  display: grid;
  gap: 8px;
}

.more-project-link {
  display: grid;
  grid-template-columns: minmax(120px, 0.5fr) minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
  min-height: 54px;
  padding: 10px 0;
  border-bottom: 1px solid color-mix(in srgb, currentColor, transparent 84%);
}

.more-project-link span {
  color: color-mix(in srgb, currentColor, transparent 28%);
}

.more-project-link .arrow {
  min-width: 44px;
  color: inherit;
  text-align: right;
}

.card-number {
  display: block;
  margin-bottom: 44px;
  color: var(--soft);
  font-size: 13px;
  font-weight: 800;
}

.contact-section {
  padding-bottom: 72px;
}

.contact-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
  gap: clamp(30px, 6vw, 76px);
  align-items: end;
  padding: 34px;
  border: 1px solid var(--line);
  border-radius: var(--radius-card);
  background:
    linear-gradient(145deg, var(--glass-highlight), transparent 46%),
    var(--bg-elevated);
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
}

.contact-inner p {
  max-width: 680px;
  margin: 18px 0 0;
  color: var(--muted);
  font-size: 18px;
}

.contact-links {
  display: grid;
  gap: 8px;
}

.contact-link {
  justify-content: space-between;
  padding: 0 14px;
  border: 1px solid var(--line);
  background: var(--bg);
}

.site-footer {
  display: flex;
  min-height: 84px;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  color: var(--soft);
  font-size: 14px;
}

@keyframes ai-scan {
  0%,
  42% {
    transform: translateX(-120%);
  }

  72%,
  100% {
    transform: translateX(120%);
  }
}

@keyframes ai-pulse {
  0%,
  100% {
    opacity: 0.44;
    transform: scale(0.82);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.not-found {
  display: grid;
  min-height: 100vh;
  grid-template-columns: minmax(0, 0.9fr) minmax(280px, 0.7fr);
  gap: clamp(32px, 7vw, 92px);
  align-items: center;
  padding-block: 48px;
}

.not-found h1 {
  max-width: 620px;
  margin: 0;
  font-size: clamp(58px, 9vw, 116px);
  line-height: 0.94;
}

.not-found-copy p:not(.eyebrow) {
  max-width: 590px;
  margin: 26px 0 0;
  color: var(--muted);
  font-size: clamp(18px, 2vw, 23px);
}

.not-found-terminal {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-card);
  background:
    linear-gradient(145deg, var(--glass-highlight), transparent 46%),
    var(--bg-elevated);
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
}

.terminal-top {
  display: flex;
  gap: 7px;
  padding: 14px;
  border-bottom: 1px solid var(--line);
  background: var(--bg-muted);
}

.terminal-top span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--soft);
}

.terminal-top span:first-child {
  background: #ef6a5b;
}

.terminal-top span:nth-child(2) {
  background: #f3bd4f;
}

.terminal-top span:nth-child(3) {
  background: var(--accent);
}

.not-found-terminal pre {
  margin: 0;
  padding: 22px;
  overflow-x: auto;
  color: var(--muted);
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: clamp(12px, 1.35vw, 15px);
  line-height: 1.7;
}

.not-found-terminal code {
  white-space: pre;
}

.reveal {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 460ms ease,
    transform 460ms ease;
}

:global(.reveal.is-visible) {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 1024px) {
  .hero,
  .about-layout,
  .contact-inner,
  .not-found {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding-top: 72px;
  }

  .profile-panel {
    max-width: 640px;
  }

  .not-found {
    min-height: auto;
  }

  .metrics > div,
  .experience-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .skills-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card,
  .project-card-featured {
    min-height: 0;
  }
}

@media (max-width: 820px) {
  .menu-button {
    display: grid;
    place-items: center;
  }

  .nav-panel {
    position: absolute;
    top: calc(var(--header-height) + 1px);
    right: 24px;
    left: 24px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 18px;
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: var(--radius-card);
    background:
      linear-gradient(145deg, var(--glass-highlight), transparent 46%),
      var(--bg-elevated);
    box-shadow: var(--shadow);
    backdrop-filter: blur(24px) saturate(145%);
    -webkit-backdrop-filter: blur(24px) saturate(145%);
  }

  .nav-panel[data-open="true"] {
    display: flex;
  }

  .nav-links,
  .nav-controls {
    align-items: stretch;
  }

  .nav-links {
    flex-direction: column;
    gap: 2px;
  }

  .nav-links a {
    border-radius: var(--radius-control);
    padding-inline: 10px;
  }

  .nav-links a:hover {
    background: var(--bg-muted);
  }

  .nav-controls {
    justify-content: space-between;
  }

  .more-projects,
  .more-project-link {
    grid-template-columns: 1fr;
  }

  .more-project-link .arrow {
    text-align: left;
  }
}

@media (max-width: 640px) {
  .shell {
    width: min(var(--max), calc(100% - 32px));
  }

  .brand-name {
    max-width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero {
    padding-top: 52px;
  }

  .status-line {
    align-items: flex-start;
  }

  .status-separator {
    display: none;
  }

  .hero h1,
  :global(html[lang="ru"]) .hero h1 {
    font-size: clamp(34px, 11vw, 48px);
    line-height: 1.04;
  }

  .hero-actions,
  .project-links {
    display: grid;
    grid-template-columns: 1fr;
  }

  .not-found h1 {
    font-size: clamp(44px, 14vw, 66px);
  }

  .metrics > div,
  .experience-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 64px 0;
  }

  .section-heading h2,
  .contact-inner h2 {
    font-size: clamp(30px, 10vw, 42px);
  }

  .profile-panel,
  .focus-card,
  .experience-card,
  .skill-card,
  .project-card,
  .more-projects,
  .contact-inner,
  .not-found-terminal pre {
    padding: 20px;
  }

  .site-footer {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }

  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
