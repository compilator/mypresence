/** Central brand tokens — colors, copy, and asset paths for MyPresence. */

export const brandColors = {
  green: "#34c759",
  graphite: "#1b1f23",
  gray: "#7b8190",
  background: "#f7f8fa",
  white: "#ffffff",
} as const;

export type BrandColorKey = keyof typeof brandColors;

export const brandAssets = {
  logoMain: "/brand/logo-main.svg",
  logoMark: "/brand/logo-mark.svg",
  logoHorizontal: "/brand/logo-horizontal.svg",
  logoWordmark: "/brand/logo-wordmark.svg",
  appIcon: "/brand/app-icon.svg",
  ogBrand: "/brand/og-brand.svg",
} as const;

export const brandDomains = {
  main: "mypresence.pro",
  brand: "brand.mypresence.pro",
} as const;

export type BrandLocale = "ru" | "en";

export interface BrandSectionCopy {
  ru: string;
  en: string;
}

export interface BrandMeaningItem {
  label: BrandSectionCopy;
  description: BrandSectionCopy;
  icon: "document" | "conversation" | "presence" | "growth";
}

export interface BrandColorTile {
  key: BrandColorKey | "white";
  name: BrandSectionCopy;
  usage: BrandSectionCopy;
}

export const brandContent = {
  cover: {
    title: { ru: "mypresence", en: "mypresence" },
    subtitle: {
      ru: "Руководство по бренду",
      en: "Brand Guidelines",
    },
    version: { ru: "Версия 1.0 · 2026", en: "Version 1.0 · 2026" },
  },
  promise: {
    text: {
      ru: "Мы создаём доверие прежде, чем создаём AI.",
      en: "We build trust before we build AI.",
    },
    highlight: { ru: "доверие", en: "trust" },
  },
  mark: {
    title: { ru: "Знак", en: "The Mark" },
  },
  meaning: {
    title: { ru: "Смысл", en: "Meaning" },
    items: [
      {
        icon: "document",
        label: { ru: "Документ", en: "Document" },
        description: {
          ru: "Резюме — отправная точка",
          en: "Your resume is the starting point",
        },
      },
      {
        icon: "conversation",
        label: { ru: "Диалог", en: "Conversation" },
        description: {
          ru: "AI помогает раскрыть потенциал",
          en: "AI helps reveal your potential",
        },
      },
      {
        icon: "presence",
        label: { ru: "Присутствие", en: "Presence" },
        description: {
          ru: "Профессиональное присутствие в мире",
          en: "Professional presence in the world",
        },
      },
      {
        icon: "growth",
        label: { ru: "Рост", en: "Growth" },
        description: {
          ru: "Новые возможности и развитие карьеры",
          en: "New opportunities and career growth",
        },
      },
    ] satisfies BrandMeaningItem[],
  },
  logos: {
    title: { ru: "Логотипы", en: "Logos" },
    rules: [
      {
        ru: "Используйте основной логотип там, где достаточно пространства.",
        en: "Use the primary logo when space allows.",
      },
      {
        ru: "Используйте знак для favicon, приложения и социальных профилей.",
        en: "Use the mark for favicon, app icons and social profiles.",
      },
    ],
  },
  colors: {
    title: { ru: "Цвета", en: "Colors" },
    tiles: [
      {
        key: "green",
        name: { ru: "Зелёный", en: "Green" },
        usage: {
          ru: "Акцент, ключевые слова, знак",
          en: "Accent, key words, mark fold",
        },
      },
      {
        key: "graphite",
        name: { ru: "Графит", en: "Graphite" },
        usage: {
          ru: "Основной текст, тело знака",
          en: "Primary text, mark body",
        },
      },
      {
        key: "gray",
        name: { ru: "Серый", en: "Gray" },
        usage: {
          ru: "Вторичный текст, иконки",
          en: "Secondary text, icons",
        },
      },
      {
        key: "background",
        name: { ru: "Фон", en: "Background" },
        usage: {
          ru: "Рабочая поверхность",
          en: "Workspace canvas",
        },
      },
      {
        key: "white",
        name: { ru: "Белый", en: "White" },
        usage: {
          ru: "Карточки, контраст",
          en: "Cards, contrast",
        },
      },
    ] satisfies BrandColorTile[],
  },
  typography: {
    title: { ru: "Типографика", en: "Typography" },
    family: "Geist",
    sample: {
      ru: "Создайте своё профессиональное присутствие.",
      en: "Build your professional presence.",
    },
    scales: [
      { name: { ru: "Display", en: "Display" }, className: "text-5xl sm:text-7xl font-semibold tracking-tight" },
      { name: { ru: "Heading", en: "Heading" }, className: "text-3xl sm:text-4xl font-semibold tracking-tight" },
      { name: { ru: "Body", en: "Body" }, className: "text-lg leading-relaxed" },
      { name: { ru: "Caption", en: "Caption" }, className: "text-sm text-brand-gray" },
    ],
  },
  voice: {
    title: { ru: "Голос бренда", en: "Brand Voice" },
    lines: [
      { ru: "Спокойный.", en: "Calm." },
      { ru: "Уверенный.", en: "Confident." },
      { ru: "Профессиональный.", en: "Professional." },
      { ru: "Без лишнего шума.", en: "No unnecessary noise." },
    ],
    accent: { ru: "Спокойный.", en: "Calm." },
  },
  motion: {
    title: { ru: "Движение", en: "Motion" },
    subtitle: { ru: "Просто. Плавно. Осмысленно.", en: "Simple. Smooth. Meaningful." },
    steps: [
      { ru: "Документ", en: "Document" },
      { ru: "Диалог", en: "Conversation" },
      { ru: "Присутствие", en: "Presence" },
    ],
  },
  privacy: {
    title: { ru: "Обещание приватности", en: "Privacy Promise" },
    headline: {
      ru: "Мы никогда не просим пользователей жертвовать конфиденциальностью ради лучшего AI.",
      en: "We will never ask users to trade their privacy for better AI.",
    },
    highlight: { ru: "никогда", en: "never" },
    detail: {
      ru: "AI не получает имя, контакты, фото и исходный файл. Он анализирует только профессиональную структуру: опыт, навыки, технологии и проекты.",
      en: "AI does not receive names, contacts, photos or source files. It analyzes only the professional structure: experience, skills, technologies and projects.",
    },
  },
  usage: {
    title: { ru: "Примеры", en: "Usage Examples" },
  },
  final: {
    headline: {
      ru: "Создайте своё профессиональное присутствие.",
      en: "Build your professional presence.",
    },
    highlight: { ru: "своё", en: "your" },
    subtext: brandDomains.main,
  },
  meta: {
    title: {
      ru: "Бренд MyPresence — руководство по айдентике",
      en: "MyPresence Brand Guidelines",
    },
    description: {
      ru: "Логотип, цвета, типографика, голос бренда и принципы доверия MyPresence.",
      en: "Logo, colors, typography, brand voice and trust principles for MyPresence.",
    },
  },
} as const;

export function t(copy: BrandSectionCopy, locale: BrandLocale): string {
  return copy[locale];
}

export function getBrandColor(key: BrandColorKey | "white"): string {
  return brandColors[key === "white" ? "white" : key];
}
