const translations = {
  ru: {
    pageTitle: "opsmon — DevOps Engineer",
    description:
      "opsmon — DevOps-инженер: MLOps, observability, automation и developer experience.",
    ogDescription:
      "MLOps, observability, automation, developer experience и надёжный платёжный сервис.",
    navLabel: "Основная навигация",
    brandLabel: "opsmon, на главную",
    languageLabel: "Выбор языка",
    themeLabel: "Выбор темы",
    navAbout: "Обо мне",
    navProjects: "Проекты",
    navContacts: "Контакты",
    heroTitle: "Делаю сложную инфраструктуру понятнее.",
    heroLead:
      "Развиваю платёжный сервис, MLOps-практики, наблюдаемость и автоматизацию, которые помогают командам быстрее и спокойнее выпускать сервисы.",
    viewProjects: "Посмотреть проекты",
    profileLabel: "Профиль Сергея",
    profileImageAlt: "Фотография Сергея",
    status: "создаю надёжные системы",
    aboutEyebrow: "Обо мне",
    aboutTitle: "Инженерия как способ помогать командам.",
    platformsTitle: "Платформы",
    platformsText:
      "Cloud, Kubernetes, GitOps и внутренние инструменты, которые сокращают путь от идеи до работающего сервиса.",
    observabilityTitle: "Наблюдаемость",
    observabilityText:
      "Метрики, логи и сигналы, которые помогают принимать решения.",
    documentationTitle: "Документация",
    documentationText:
      "Люблю стандартизировать процессы и сохранять знания так, чтобы ими могла пользоваться вся команда.",
    finopsText:
      "Оптимизация облачных затрат без компромиссов для надёжности.",
    stackLabel: "Основной стек",
    projectsEyebrow: "Избранные проекты",
    projectsTitle: "Практика, упакованная в полезные инструменты.",
    cheatsheetText:
      "Двуязычный практический справочник kubectl с командами, сценариями диагностики и ссылками на официальную документацию.",
    trackerText:
      "Небольшой инструмент для отслеживания личного прогресса, привычек и фокуса.",
    speakerText:
      "Закрытые материалы докладов об инфраструктуре, миграциях и инженерных процессах.",
    travelText:
      "Двуязычный конструктор чек-листов для поездок с рекомендациями по 37 странам, сохранением прогресса и ссылками для совместного использования.",
    setupText:
      "Воспроизводимый bootstrap-kit для нового Mac: Homebrew, Kubernetes-инструменты, языки разработки, dotfiles и расширения VS Code.",
    birthdayText:
      "Система персональных поздравительных страниц для инженеров команды с шаблоном карточки, прямыми ссылками и автоматическим деплоем на GitHub Pages.",
    contributionsTitle: "Помогаю открытой документации становиться лучше.",
    habrArticleContribution:
      "Debugging Remote Work: A DevOps Approach to Health",
    kubernetesContribution:
      "Перевод официальной документации на русский язык",
    yandexContribution: "Улучшения и дополнения официальной документации",
    contactEyebrow: "На связи",
    contactTitle:
      "Обсудим инфраструктуру, документацию или хороший кофе.",
    footerText: "Сделано с ясностью и небольшой автоматизацией.",
  },
  en: {
    pageTitle: "opsmon — DevOps Engineer",
    description:
      "opsmon — DevOps engineer focused on MLOps, observability, automation, and developer experience.",
    ogDescription:
      "MLOps, observability, automation, developer experience, and the company's payment service.",
    navLabel: "Main navigation",
    brandLabel: "opsmon, back to home",
    languageLabel: "Choose language",
    themeLabel: "Choose theme",
    navAbout: "About",
    navProjects: "Projects",
    navContacts: "Contact",
    heroTitle: "Making complex infrastructure easier to understand.",
    heroLead:
      "I work on the company's payment service, MLOps practices, observability, and automation that help teams ship services faster and with more confidence.",
    viewProjects: "View projects",
    profileLabel: "Sergey's profile",
    profileImageAlt: "Portrait of Sergey",
    status: "building reliable systems",
    aboutEyebrow: "About me",
    aboutTitle: "Engineering as a way to help teams.",
    platformsTitle: "Platforms",
    platformsText:
      "Cloud, Kubernetes, GitOps, and internal tools that shorten the path from an idea to a running service.",
    observabilityTitle: "Observability",
    observabilityText:
      "Metrics, logs, and signals that help teams make informed decisions.",
    documentationTitle: "Documentation",
    documentationText:
      "I enjoy standardizing processes and preserving knowledge so the whole team can use it.",
    finopsText:
      "Optimizing cloud costs without compromising reliability.",
    stackLabel: "Core technology stack",
    projectsEyebrow: "Selected projects",
    projectsTitle: "Hands-on experience turned into useful tools.",
    cheatsheetText:
      "A bilingual, practical kubectl reference with commands, troubleshooting scenarios, and links to official documentation.",
    trackerText:
      "A lightweight tool for tracking personal progress, habits, and focus.",
    speakerText:
      "Private talk materials about infrastructure, migrations, and engineering processes.",
    travelText:
      "A bilingual trip checklist builder with guidance for 37 countries, saved progress, and shareable configuration links.",
    setupText:
      "A reproducible bootstrap kit for a new Mac with Homebrew, Kubernetes tools, development runtimes, dotfiles, and VS Code extensions.",
    birthdayText:
      "A system of personalized celebration pages for engineering teammates, with a reusable card template, direct links, and automatic GitHub Pages deployment.",
    contributionsTitle: "Helping open documentation get better.",
    habrArticleContribution:
      "Debugging Remote Work: A DevOps Approach to Health",
    kubernetesContribution:
      "Translating the official documentation into Russian",
    yandexContribution:
      "Improvements and additions to the official documentation",
    contactEyebrow: "Get in touch",
    contactTitle:
      "Let's talk about infrastructure, documentation, or great coffee.",
    footerText: "Built with clarity and a little automation.",
  },
};

const languageButtons = document.querySelectorAll("[data-language]");
const themeButtons = document.querySelectorAll("[data-theme-value]");
const languageToggle = document.querySelector(".language-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const supportedLanguages = Object.keys(translations);
const supportedThemes = ["base", "x5", "noir"];
const themePreferenceKey = "opsmon-theme-v2";

function readPreference(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // The page still works when storage is disabled.
  }
}

function applyLanguage(language, updateUrl = false) {
  const selectedLanguage = supportedLanguages.includes(language) ? language : "ru";
  const dictionary = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = dictionary.pageTitle;

  document.querySelector('meta[name="description"]').content = dictionary.description;
  document.querySelector('meta[property="og:description"]').content =
    dictionary.ogDescription;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = dictionary[element.dataset.i18n];
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute(
      "aria-label",
      dictionary[element.dataset.i18nAriaLabel],
    );
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = dictionary[element.dataset.i18nAlt];
  });

  languageButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === selectedLanguage),
    );
  });

  if (languageToggle) {
    languageToggle.dataset.active = selectedLanguage;
  }

  savePreference("opsmon-language", selectedLanguage);

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("lang", selectedLanguage);
    window.history.replaceState({}, "", url);
  }
}

function applyTheme(theme, updateUrl = false) {
  const selectedTheme = supportedThemes.includes(theme) ? theme : "base";

  if (selectedTheme === "base") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = selectedTheme;
  }

  themeButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.themeValue === selectedTheme),
    );
  });

  if (themeToggle) {
    themeToggle.dataset.active = selectedTheme;
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    const themeColors = {
      base: "#f5f5f7",
      x5: "#eafbdc",
      noir: "#08060f",
    };

    themeColor.content = themeColors[selectedTheme];
  }

  savePreference(themePreferenceKey, selectedTheme);

  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set("theme", selectedTheme);
    window.history.replaceState({}, "", url);
  }
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () =>
    applyLanguage(button.dataset.language, true),
  );
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () =>
    applyTheme(button.dataset.themeValue, true),
  );
});

const urlParameters = new URLSearchParams(window.location.search);
const urlLanguage = urlParameters.get("lang");
const urlTheme = urlParameters.get("theme");
const savedLanguage = readPreference("opsmon-language");
const browserLanguage = navigator.language.toLowerCase().startsWith("ru")
  ? "ru"
  : "en";

applyLanguage(urlLanguage || savedLanguage || browserLanguage);
applyTheme(urlTheme || readPreference(themePreferenceKey) || "noir");
requestAnimationFrame(() => {
  document.documentElement.classList.add("theme-ready");
});

const year = document.querySelector("#year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}
