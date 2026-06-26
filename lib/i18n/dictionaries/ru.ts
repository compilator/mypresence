/** Russian dictionary. Defines the canonical shape (see lib/i18n/types.ts). */
import { legalRu, trustRu } from "@/lib/i18n/dictionaries/ru-legal";

export const ru = {
  brand: {
    name: "mypresence",
    tagline: "Резюме → карьерный интеллект → сайт.",
  },
  meta: {
    title: "mypresence — резюме в карьерный сайт",
    description:
      "mypresence превращает ваше резюме в премиальное карьерное портфолио с помощью ИИ. Резюме, карьерный интеллект и сайт.",
  },
  common: {
    themeToggle: "Переключить тему",
    back: "Назад",
    startOver: "Начать заново",
  },
  footer: {
    tagline: "Резюме → карьерный интеллект → сайт.",
  },
  steps: {
    upload: "Загрузка",
    analysis: "Анализ",
    profile: "Профиль",
    appearance: "Оформление",
    portfolio: "Портфолио",
  },
  landing: {
    hero: {
      badge: "От резюме к карьерному сайту за минуты",
      titleLead: "Ваша карьера —",
      titleAccent: "достойно представлена.",
      subtitle:
        "Загрузите резюме, и ИИ превратит его в премиальное карьерное портфолио. Без шаблонов и навыков дизайна.",
      primaryCta: "Загрузить резюме",
      secondaryCta: "Как это работает",
      note: "Бесплатный предпросмотр. Регистрация не нужна.",
      previewResumeLabel: "Резюме",
      previewResumeCaption: "PDF или Word",
      previewAiLabel: "Анализ ИИ",
      previewAiCaption: "Структурный профиль",
      previewPortfolioLabel: "Портфолио",
      previewPortfolioCaption: "Готовый сайт",
    },
    features: {
      title: "Всё нужное и ничего лишнего",
      subtitle:
        "Точный набор инструментов, который превращает статичное резюме в живое профессиональное присутствие.",
      intelligenceTitle: "Карьерный интеллект",
      intelligenceDesc:
        "Мы читаем ваше резюме и превращаем его в ясный, убедительный профиль.",
      premiumTitle: "Премиум по умолчанию",
      premiumDesc:
        "Дизайн уровня Apple со светлой и тёмной темами. Ничего настраивать не нужно.",
      fastTitle: "Готово за минуты",
      fastDesc:
        "От PDF до живого портфолио за один спокойный и понятный сценарий.",
      controlTitle: "Вы всё контролируете",
      controlDesc:
        "Просматривайте всё перед публикацией. Ничего не публикуется случайно.",
    },
    how: {
      title: "Как это работает",
      subtitle:
        "Четыре шага от резюме до портфолио, которым приятно делиться.",
      step1Title: "Загрузите резюме",
      step1Desc:
        "PDF или Word (DOCX, DOC) — перетащите файл. Остальное мы берём на себя, форматирование не нужно.",
      step2Title: "ИИ собирает профиль",
      step2Desc: "Ваш опыт, навыки и проекты структурируются автоматически.",
      step3Title: "Выберите оформление",
      step3Desc: "Светлая или тёмная тема и стиль портфолио, который вам подходит.",
      step4Title: "Просмотр и публикация",
      step4Desc: "Посмотрите готовый сайт и опубликуйте своё портфолио.",
    },
    cta: {
      title: "Превратите резюме в карьерный сайт сегодня",
      subtitle: "Это занимает несколько минут, а предпросмотр бесплатный.",
      button: "Начать",
    },
  },
  upload: {
    title: "Загрузите ваше резюме",
    description:
      "Мы превратим его в структурированный карьерный профиль. Поддерживаются PDF, DOCX и DOC.",
    privacy:
      "Ваш файл остаётся приватным и используется только для создания профиля.",
    analyze: "Анализировать резюме",
    reading: "Читаем резюме",
    dropTitle: "Перетащите резюме или нажмите, чтобы выбрать",
    dropHint: "PDF, DOCX или DOC — до 10 МБ",
    removeAria: "Удалить файл",
    errors: {
      unsupportedFormat:
        "Поддерживаются только PDF, DOCX и DOC. Пожалуйста, загрузите резюме в одном из этих форматов.",
      tooLarge: "Файл слишком большой (макс. 10 МБ).",
      empty: "Похоже, файл пустой.",
      unreadable:
        "Не удалось извлечь текст из резюме. Возможно, это скан или повреждённый файл. Попробуйте другой.",
      generic: "Не удалось прочитать этот файл. Попробуйте другой.",
    },
  },
  analysis: {
    title: "Анализируем ваше резюме",
    description: "ИИ читает ваш опыт и собирает профиль.",
    stage1: "Читаем резюме",
    stage2: "Извлекаем опыт",
    stage3: "Структурируем навыки и проекты",
    stage4: "Дорабатываем профиль",
    errorTitle: "Не удалось проанализировать",
    errorMessage: "Что-то пошло не так при анализе резюме. Попробуйте ещё раз.",
    retry: "Попробовать снова",
    uploadAnother: "Загрузить другой файл",
  },
  profile: {
    title: "Ваш карьерный профиль",
    description: "Вот что извлёк наш ИИ. Дальше выберите оформление.",
    sectionExperience: "Опыт",
    sectionSkills: "Навыки",
    sectionProjects: "Проекты",
    sectionEducation: "Образование",
    chooseAppearance: "Выбрать оформление",
    present: "наст. время",
  },
  appearance: {
    title: "Выберите оформление",
    description:
      "Выберите цветовую тему и стиль портфолио. Можно посмотреть предпросмотр.",
    colorMode: "Цветовая тема",
    colorModeDesc: "Как ваше опубликованное портфолио видят посетители.",
    modeLight: "Светлая",
    modeDark: "Тёмная",
    modeSystem: "Системная",
    styleLabel: "Стиль",
    soon: "Скоро",
    backToProfile: "Назад к профилю",
    previewPortfolio: "Предпросмотр портфолио",
    styles: {
      editorial: {
        name: "Редакционный",
        description: "В стиле Apple: крупная типографика и тонкие линии.",
      },
    },
  },
  portfolio: {
    backToAppearance: "Оформление",
    previewBadge: "Предпросмотр",
    executiveSummary: "О себе",
    sectionSnapshot: "Краткий обзор",
    sectionExpertise: "Ключевые компетенции",
    sectionExperience: "Опыт",
    sectionProjects: "Проекты",
    sectionSkills: "Навыки",
    sectionEducation: "Образование",
    achievements: "Достижения",
    responsibilities: "Обязанности",
    builtWith: "Создано в mypresence",
    builtWithTagline: "Создайте своё профессиональное присутствие.",
    present: "наст. время",
    snapshot: {
      years: "Опыт",
      level: "Уровень",
      specialization: "Специализация",
      technologies: "Технологии",
      projects: "Проекты",
      companies: "Компании",
    },
  },
  publish: {
    trigger: "Опубликовать",
    title: "Опубликовать портфолио",
    description:
      "Ваше портфолио будет доступно по ссылке. Вы сможете обновить его в любой момент.",
    now: "Опубликовать",
    publishing: "Публикуем",
    successTitle: "Ваше портфолио опубликовано",
    successDescription: "Поделитесь своим новым карьерным портфолио.",
    copy: "Копировать",
    copied: "Скопировано",
    note: "Страница доступна по постоянной ссылке и индексируется поисковыми системами.",
    viewPublished: "Открыть опубликованную страницу",
  },
  legal: legalRu,
  trust: trustRu,
} as const;
