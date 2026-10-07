export const projects = [
  {
    title: "kubectl Cheatsheet",
    lead: true,
    visual: "reference",
    status: "Open source",
    category: "Kubernetes · Documentation",
    description: {
      en: "Bilingual searchable Kubernetes reference with practical kubectl commands.",
      ru: "Двуязычный Kubernetes-справочник с поиском и практическими kubectl-командами.",
    },
    problem: {
      en: "Engineers need quick, practical commands without losing the link to official documentation.",
      ru: "Инженерам нужны быстрые практические команды без потери связи с официальной документацией.",
    },
    solution: {
      en: "Search, categories, RU/EN content, practical examples and a documentation-first structure.",
      ru: "Поиск, категории, RU/EN, практические примеры и documentation-first структура.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Kubernetes"],
    features: ["RU/EN", "search", "categories", "practical examples"],
    github: "https://github.com/opsmon/kubectl-cheatsheet",
    demo: "https://opsmon.github.io/kubectl-cheatsheet/",
  },
  {
    title: "macOS Engineering Setup",
    visual: "setup",
    status: "Automation",
    category: "Bootstrap · DevOps Tooling",
    description: {
      en: "Reproducible macOS bootstrap kit for DevOps tooling.",
      ru: "Воспроизводимый macOS bootstrap-kit для DevOps-инструментов.",
    },
    problem: {
      en: "New workstations take time to configure and can drift from the team baseline.",
      ru: "Новые рабочие станции долго настраиваются и легко расходятся с командным baseline.",
    },
    solution: {
      en: "Repeatable setup for Homebrew, Docker, Kubernetes tooling, Terraform, Ansible, Argo CD, VS Code and shell configuration.",
      ru: "Повторяемая настройка Homebrew, Docker, Kubernetes tooling, Terraform, Ansible, Argo CD, VS Code и shell configuration.",
    },
    stack: ["Bash", "Homebrew", "Docker", "Terraform", "Ansible"],
    features: [
      "repeatable setup",
      "safe handling of secrets",
      "developer tooling",
    ],
    github: "https://github.com/opsmon/setup",
    demo: "https://opsmon.github.io/setup/",
  },
  {
    title: "Travel Checklist",
    visual: "travel",
    status: "Product thinking",
    category: "Static Web · UX",
    description: {
      en: "Travel checklist tool with saved progress and shareable lists.",
      ru: "Travel checklist с сохранением прогресса и ссылками для совместного использования.",
    },
    problem: {
      en: "Travel preparation is repetitive, easy to forget and different for each country.",
      ru: "Подготовка к поездкам повторяется, легко забывается и зависит от страны.",
    },
    solution: {
      en: "A finished user-facing static service with country guidance, saved progress and shareable lists.",
      ru: "Законченный пользовательский статический сервис с рекомендациями, сохранением прогресса и ссылками для совместного использования.",
    },
    stack: ["HTML", "CSS", "JavaScript"],
    features: [
      "country recommendations",
      "saved progress",
      "shareable checklists",
    ],
    github: "https://github.com/opsmon/travel",
    demo: "https://opsmon.github.io/travel/",
  },
];
