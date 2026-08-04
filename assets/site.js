const state = {
  language: "en",
  theme: "light",
};

const storageKeys = {
  language: "sergey-frolov-language",
  theme: "sergey-frolov-theme",
};

const selectors = {
  languageButtons: "[data-language]",
  themeButton: ".theme-button",
  menuButton: ".menu-button",
  navPanel: "#nav-panel",
};

function getPath(source, path) {
  return path.split(".").reduce((value, key) => value?.[key], source);
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

function element(tagName, className, text) {
  const node = document.createElement(tagName);

  if (className) {
    node.className = className;
  }

  if (text) {
    node.textContent = text;
  }

  return node;
}

function localizeText(dictionary) {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = getPath(dictionary, node.dataset.i18n);

    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((node) => {
    node.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attribute, path] = pair.split(":");
      const value = getPath(dictionary, path);

      if (attribute && typeof value === "string") {
        node.setAttribute(attribute.trim(), value);
      }
    });
  });
}

function updateMeta(dictionary) {
  document.title = dictionary.meta.title;

  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');

  if (description) {
    description.content = dictionary.meta.description;
  }

  if (ogTitle) {
    ogTitle.content = dictionary.meta.title;
  }

  if (ogDescription) {
    ogDescription.content = dictionary.meta.description;
  }

  if (twitterTitle) {
    twitterTitle.content = dictionary.meta.title;
  }

  if (twitterDescription) {
    twitterDescription.content = dictionary.meta.description;
  }
}

function renderHeroTags(dictionary) {
  const target = document.querySelector('[data-render="hero-tags"]');

  if (!target) {
    return;
  }

  target.replaceChildren(
    ...dictionary.hero.tags.map((tag) => element("span", "chip chip-strong", tag)),
  );
}

function renderMetrics(dictionary) {
  const target = document.querySelector('[data-render="metrics"]');

  if (!target) {
    return;
  }

  const nodes = dictionary.metrics.items.map(([value, label]) => {
    const item = element("article", "metric-card");
    item.append(element("strong", "", value), element("span", "", label));
    return item;
  });

  target.replaceChildren(...nodes);
}

function renderAbout(dictionary) {
  const aboutTarget = document.querySelector('[data-render="about"]');
  const focusTarget = document.querySelector('[data-render="focus"]');

  if (aboutTarget) {
    aboutTarget.replaceChildren(
      ...dictionary.about.paragraphs.map((paragraph) =>
        element("p", "", paragraph),
      ),
    );
  }

  if (focusTarget) {
    focusTarget.replaceChildren(
      ...dictionary.about.focus.map((item) => {
        const li = element("li");
        li.textContent = item;
        return li;
      }),
    );
  }
}

function renderExperience(dictionary) {
  const target = document.querySelector('[data-render="experience"]');

  if (!target) {
    return;
  }

  const nodes = dictionary.experience.items.map(([title, text], index) => {
    const article = element("article", "experience-card");
    const number = element("span", "card-number", String(index + 1).padStart(2, "0"));
    const heading = element("h3", "", title);
    const paragraph = element("p", "", text);

    article.append(number, heading, paragraph);
    return article;
  });

  target.replaceChildren(...nodes);
}

function renderSkills() {
  const target = document.querySelector('[data-render="skills"]');

  if (!target) {
    return;
  }

  const nodes = skills.map((group) => {
    const article = element(
      "article",
      `skill-card${group.direction ? " skill-card-direction" : ""}`,
    );
    const title = element("h3", "", group.title);
    const chips = element("div", "chip-list");

    [...(group.primary || []), ...(group.items || [])].forEach((skill) => {
      const isPrimary = group.primary?.includes(skill);
      chips.append(element("span", `chip${isPrimary ? " chip-strong" : ""}`, skill));
    });

    article.append(title, chips);
    return article;
  });

  target.replaceChildren(...nodes);
}

function projectText(value, language) {
  if (typeof value === "string") {
    return value;
  }

  return value[language] || value.en;
}

function renderProjects(dictionary) {
  const target = document.querySelector('[data-render="projects"]');

  if (!target) {
    return;
  }

  const nodes = projects.map((project) => {
    const article = element(
      "article",
      `project-card${project.featured ? " project-card-featured" : ""}`,
    );
    const top = element("div", "project-top");
    const category = element("span", "project-category", project.category);
    const status = element("span", "project-status", project.status);
    const title = element("h3", "", project.title);
    const description = element(
      "p",
      "project-description",
      projectText(project.description, state.language),
    );
    const stack = element("div", "project-stack");
    const links = element("div", "project-links");

    top.append(category, status);

    stack.append(element("span", "stack-label", dictionary.projects.stackLabel));
    project.stack.forEach((item) => stack.append(element("span", "chip", item)));

    const github = element("a", "text-link", dictionary.projects.githubLabel);
    github.href = project.github;
    github.target = "_blank";
    github.rel = "noreferrer";
    links.append(github);

    if (project.demo) {
      const demo = element("a", "text-link", dictionary.projects.demoLabel);
      demo.href = project.demo;
      demo.target = "_blank";
      demo.rel = "noreferrer";
      links.append(demo);
    }

    article.append(top, title, description, stack, links);
    return article;
  });

  target.replaceChildren(...nodes);
}

function renderMoreProjects() {
  const target = document.querySelector('[data-render="more-projects"]');
  const dictionary = translations[state.language];

  if (!target) {
    return;
  }

  const nodes = moreProjects.map((project) => {
    const link = element("a", "more-project-link");
    const title = element("strong", "", project.title);
    const description = element(
      "span",
      "",
      projectText(project.description, state.language),
    );
    const arrow = element("span", "arrow", dictionary.projects.openLabel);

    link.href = project.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.append(title, description, arrow);
    return link;
  });

  target.replaceChildren(...nodes);
}

function renderContact() {
  const target = document.querySelector('[data-render="contact"]');

  if (!target) {
    return;
  }

  const nodes = contactLinks
    .filter((link) => link.label !== "Email" || Boolean(profile.email))
    .map((link) => {
      const anchor = element("a", "contact-link", link.label);
      anchor.href = link.url;

      if (!link.url.startsWith("mailto:")) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }

      return anchor;
    });

  target.replaceChildren(...nodes);
}

function renderAll(dictionary) {
  renderHeroTags(dictionary);
  renderMetrics(dictionary);
  renderAbout(dictionary);
  renderExperience(dictionary);
  renderSkills();
  renderProjects(dictionary);
  renderMoreProjects();
  renderContact();
}

function applyLanguage(language, persist = false) {
  const selectedLanguage = translations[language] ? language : "en";
  const dictionary = translations[selectedLanguage];

  state.language = selectedLanguage;
  document.documentElement.lang = selectedLanguage;

  localizeText(dictionary);
  updateMeta(dictionary);
  renderAll(dictionary);

  document.querySelectorAll(selectors.languageButtons).forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === selectedLanguage),
    );
  });

  if (persist) {
    writeStorage(storageKeys.language, selectedLanguage);
  }
}

function applyTheme(theme, persist = false) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  const themeColor = document.querySelector('meta[name="theme-color"]');

  state.theme = selectedTheme;
  document.documentElement.dataset.theme = selectedTheme;

  if (themeColor) {
    themeColor.content = selectedTheme === "dark" ? "#111412" : "#f7f8f6";
  }

  if (persist) {
    writeStorage(storageKeys.theme, selectedTheme);
  }
}

function preferredLanguage() {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  const storedLanguage = readStorage(storageKeys.language);
  const browserLanguage = navigator.language.toLowerCase().startsWith("ru")
    ? "ru"
    : "en";

  return urlLanguage || storedLanguage || browserLanguage;
}

function preferredTheme() {
  const urlTheme = new URLSearchParams(window.location.search).get("theme");
  const storedTheme = readStorage(storageKeys.theme);

  if (urlTheme === "light" || urlTheme === "dark") {
    return urlTheme;
  }

  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function initMenu() {
  const button = document.querySelector(selectors.menuButton);
  const panel = document.querySelector(selectors.navPanel);

  if (!button || !panel) {
    return;
  }

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      panel.dataset.open = String(!isOpen);
      document.body.dataset.menuOpen = String(!isOpen);
    });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      panel.dataset.open = "false";
      document.body.dataset.menuOpen = "false";
    });
  });
}

function initControls() {
  document.querySelectorAll(selectors.languageButtons).forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.language, true);
    });
  });

  const themeButton = document.querySelector(selectors.themeButton);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      applyTheme(state.theme === "dark" ? "light" : "dark", true);
    });
  }
}

function initReveal() {
  const nodes = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 },
  );

  nodes.forEach((node) => observer.observe(node));
}

function initYear() {
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

applyTheme(preferredTheme());
applyLanguage(preferredLanguage());
initControls();
initMenu();
initReveal();
initYear();
