export const legalRu = {
  eyebrow: "Trust Center",
  updatedLabel: "Обновлено",
  nav: {
    privacy: "Конфиденциальность",
    terms: "Условия",
    personalData: "Персональные данные",
    cookies: "Cookies",
    contact: "Контакты",
    status: "Статус",
    roadmap: "Roadmap",
    changelog: "Changelog",
  },
  privacy: {
    meta: {
      title: "Политика конфиденциальности",
      description:
        "Как mypresence защищает вашу приватность и обрабатывает данные с Privacy-first AI.",
    },
    title: "Политика конфиденциальности",
    intro:
      "mypresence создан вокруг доверия. Мы помогаем вам представить профессиональный опыт — и берём на себя ответственность за то, как обрабатываются ваши данные. Эта политика объясняет простым языком, что мы собираем, что никогда не передаём, и как работает анализ.",
    updated: "26 июня 2025",
    sections: {
      collect: {
        title: "Какие данные мы обрабатываем",
        body: [
          "Текст резюме, который вы загружаете (PDF, DOCX или DOC).",
          "Имя файла и технические метаданные загрузки.",
          "Структурированный CareerProfile, сформированный после анализа.",
          "Настройки оформления портфолио в рамках текущей сессии.",
          "Опционально: изображение профиля, извлечённое из PDF (только локально, не отправляется в AI).",
        ],
      },
      neverSent: {
        title: "Что мы никогда не отправляем в OpenAI",
        body: [
          "Оригинальный файл резюме (PDF, DOCX, DOC).",
          "Профессиональное фото.",
          "Полное имя, email, телефон, возраст, дату рождения.",
          "Персональные ссылки (LinkedIn, GitHub, Telegram и др.) в исходном виде.",
          "mypresence использует Privacy-first AI: персональные данные заменяются стабильными плейсхолдерами до запроса. В OpenAI уходит только анонимизированный профессиональный опыт.",
        ],
      },
      ai: {
        title: "Как работает AI-анализ",
        body: [
          "1. Резюме парсится на сервере в plain text.",
          "2. PII Redaction Layer удаляет персональные данные и сохраняет их в серверном vault.",
          "3. OpenAI получает только redacted text и возвращает структурированный JSON.",
          "4. Персональные поля восстанавливаются на сервере перед показом вам.",
          "Мы не рендерим сырой вывод AI — только валидированный CareerProfile.",
        ],
      },
      storage: {
        title: "Как долго хранятся файлы",
        body: [
          "Загруженные файлы резюме не сохраняются постоянно — они читаются один раз для извлечения текста.",
          "В текущей MVP-версии CareerProfile и настройки хранятся в памяти браузера до обновления страницы.",
          "Опубликованные портфолио сохраняются как CareerProfile JSON без исходного файла резюме.",
        ],
      },
      rights: {
        title: "Ваши права",
        body: [
          "Вы можете прекратить использование сервиса в любой момент.",
          "Вы контролируете, публикуется ли портфолио — предпросмотр остаётся приватным.",
          "По вопросам данных свяжитесь с нами через страницу контактов.",
        ],
      },
      contact: {
        title: "Контакты",
        body: "По вопросам конфиденциальности: privacy@presence.app (placeholder).",
      },
    },
  },
  personalData: {
    meta: {
      title: "Политика обработки персональных данных",
      description: "Как mypresence обрабатывает персональные данные пользователей.",
    },
    title: "Обработка персональных данных",
    intro:
      "Этот документ описывает категории персональных данных, цели и правовые основания обработки. mypresence относится к данным ответственно — прозрачность для нас часть продукта.",
    updated: "26 июня 2025",
    sections: {
      types: {
        title: "Категории персональных данных",
        body: [
          "Идентификационные: ФИО, контакты из резюме.",
          "Профессиональные: опыт, навыки, образование, проекты.",
          "Технические: cookies, необходимые для работы сайта.",
          "Визуальные: фото профиля (если извлечено из PDF).",
        ],
      },
      purpose: {
        title: "Цели обработки",
        body: [
          "Формирование CareerProfile и карьерного портфолио.",
          "AI-анализ профессионального опыта.",
          "Публикация портфолио по вашему решению.",
          "Обеспечение работоспособности и безопасности сервиса.",
        ],
      },
      legal: {
        title: "Правовое основание",
        body: [
          "Согласие пользователя при загрузке резюме и использовании сервиса.",
          "Исполнение договора (оказание услуг mypresence).",
          "Законный интерес — улучшение качества сервиса без компрометации приватности.",
          "Оператор: [НАИМЕНОВАНИЕ ОПЕРАТОРА] (placeholder).",
        ],
      },
      storage: {
        title: "Хранение",
        body: [
          "Исходные файлы резюме не хранятся после парсинга.",
          "CareerProfile в сессии — до закрытия вкладки (MVP).",
          "Опубликованные профили — до удаления пользователем или по запросу.",
        ],
      },
      deletion: {
        title: "Удаление",
        body: [
          "Обновите страницу — сессионные данные исчезнут.",
          "Для удаления опубликованного портфолио — обратитесь в поддержку.",
        ],
      },
      rights: {
        title: "Права субъекта данных",
        body: [
          "Доступ к своим данным.",
          "Исправление неточностей.",
          "Удаление («право на забвение»).",
          "Ограничение обработки.",
          "Отзыв согласия.",
        ],
      },
      security: {
        title: "Безопасность",
        body: [
          "PII redaction перед передачей в OpenAI.",
          "HTTPS для всех соединений.",
          "Минимизация данных — собираем только необходимое.",
          "Vault PII хранится только на сервере во время анализа.",
        ],
      },
      contact: {
        title: "Контакты оператора",
        body: [
          "Email: privacy@presence.app (placeholder)",
          "Адрес: [АДРЕС ОПЕРАТОРА] (placeholder)",
          "ИНН: [ИНН] (placeholder)",
        ],
      },
    },
  },
  terms: {
    meta: {
      title: "Условия использования",
      description: "Правила использования платформы mypresence.",
    },
    title: "Условия использования",
    intro:
      "mypresence — платформа профессиональной идентичности. Эти условия определяют, как вы можете пользоваться сервисом. Мы пишем их понятным языком, без лишней бюрократии.",
    updated: "26 июня 2025",
    sections: {
      service: {
        title: "Описание сервиса",
        body: [
          "mypresence превращает резюме в структурированный CareerProfile и карьерное портфолио с помощью AI.",
          "Сервис находится в стадии Alpha — функции могут меняться.",
        ],
      },
      responsibilities: {
        title: "Обязанности пользователя",
        body: [
          "Загружать только своё резюме или документы, на обработку которых у вас есть право.",
          "Не использовать сервис для незаконных целей.",
          "Проверять сгенерированный профиль перед публикацией.",
        ],
      },
      availability: {
        title: "Доступность",
        body: [
          "Мы стремимся поддерживать стабильную работу, но не гарантируем бесперебойный доступ.",
          "Технические работы могут проводиться без предварительного уведомления.",
        ],
      },
      aiLimits: {
        title: "Ограничения AI",
        body: [
          "AI анализирует только заявленный в резюме опыт.",
          "mypresence не гарантирует точность каждого поля — проверяйте результат.",
          "AI не должен и не будет придумывать факты — но финальная ответственность за публикацию лежит на вас.",
        ],
      },
      noGuarantee: {
        title: "Без гарантий трудоустройства",
        body: [
          "mypresence не гарантирует собеседования, офферы или трудоустройство.",
          "Портфолио — инструмент представления, а не обещание результата.",
        ],
      },
      ip: {
        title: "Интеллектуальная собственность",
        body: [
          "Ваш CareerProfile и контент резюме принадлежат вам.",
          "Дизайн, код и бренд mypresence — собственность правообладателя сервиса.",
        ],
      },
      liability: {
        title: "Ограничение ответственности",
        body: [
          "Сервис предоставляется «как есть» в рамках Alpha.",
          "mypresence не несёт ответственности за косвенные убытки, связанные с использованием сервиса.",
        ],
      },
      termination: {
        title: "Прекращение",
        body: [
          "Вы можете прекратить использование в любой момент.",
          "Мы можем ограничить доступ при нарушении условий.",
        ],
      },
      changes: {
        title: "Изменения",
        body: [
          "Условия могут обновляться. Актуальная версия всегда на этой странице.",
          "Дата обновления указана в начале документа.",
        ],
      },
      contact: {
        title: "Контакты",
        body: "legal@presence.app (placeholder)",
      },
    },
  },
  cookies: {
    meta: {
      title: "Политика cookies",
      description: "Как mypresence использует cookies.",
    },
    title: "Политика cookies",
    intro:
      "Мы используем минимум cookies — только то, что нужно для работы сайта. Без рекламных трекеров.",
    updated: "26 июня 2025",
    sections: {
      what: {
        title: "Что такое cookies",
        body: [
          "Cookies — небольшие файлы, которые браузер сохраняет на вашем устройстве.",
          "Они помогают сайту запоминать настройки и поддерживать сессию.",
        ],
      },
      why: {
        title: "Зачем мы их используем",
        body: [
          "Сейчас mypresence использует только essential cookies, необходимые для работы.",
          "Например: предпочтение темы (светлая/тёмная).",
          "Аналитические cookies могут быть добавлены позже — политика будет обновлена.",
        ],
      },
      disable: {
        title: "Как отключить",
        body: [
          "Вы можете отключить cookies в настройках браузера.",
          "Без essential cookies некоторые функции могут работать некорректно.",
        ],
      },
    },
  },
  contact: {
    meta: {
      title: "Контакты",
      description: "Связаться с командой mypresence.",
    },
    title: "Контакты",
    intro:
      "Мы открыты для вопросов о продукте, приватности и партнёрстве. Ответим спокойно и по делу.",
    support: {
      title: "Поддержка",
      email: "support@presence.app",
      hours: "Пн–Пт, 10:00–18:00 (МСК) (placeholder)",
      telegram: "@presence_support (optional, placeholder)",
    },
    business: {
      title: "Для бизнеса",
      email: "hello@presence.app (placeholder)",
      entity: "[Юридическое лицо] (placeholder)",
      taxId: "[ИНН] (placeholder)",
      address: "[Юридический адрес] (placeholder)",
    },
  },
  status: {
    meta: {
      title: "Статус сервиса",
      description: "Текущее состояние компонентов mypresence.",
    },
    title: "Статус сервиса",
    intro: "Все системы работают штатно. Эта страница обновляется вручную в Alpha.",
    operational: "Operational",
    components: {
      website: "Website",
      ai: "AI Analysis",
      portfolio: "Portfolio Generation",
      publishing: "Publishing",
      api: "API",
    },
  },
  roadmap: {
    meta: {
      title: "Roadmap",
      description: "План развития mypresence — Career Intelligence Platform.",
    },
    title: "Roadmap",
    intro:
      "mypresence строит Digital Professional Identity. Каждый этап расширяет CareerProfile — резюме парсится только один раз.",
    stages: [
      { stage: "Stage 1", title: "Resume → CareerProfile", status: "shipped" },
      { stage: "Stage 2", title: "Качество CareerProfile", status: "in_progress" },
      { stage: "Stage 3", title: "Vacancy Analysis", status: "planned" },
      { stage: "Stage 4", title: "Resume Optimization", status: "planned" },
      { stage: "Stage 5", title: "Portfolio Optimization", status: "planned" },
      { stage: "Stage 6", title: "Cover Letter", status: "planned" },
      { stage: "Stage 7", title: "Professional Pitch", status: "planned" },
      { stage: "Stage 8", title: "Career Intelligence", status: "planned" },
    ],
    statusLabels: {
      shipped: "Готово",
      in_progress: "В работе",
      planned: "Запланировано",
    },
  },
  changelog: {
    meta: {
      title: "Changelog",
      description: "История изменений mypresence.",
    },
    title: "Changelog",
    intro: "Что нового в mypresence — кратко и по делу.",
    entries: [
      {
        version: "Alpha 0.1",
        title: "Privacy-first AI Analysis",
        added: [
          "PII Redaction Layer before OpenAI requests",
          "Server-side PII vault during analysis",
          "Restore flow after AI response",
          "Russian resume PII tests",
          "Trust Center — legal pages",
        ],
        privacy: [
          "Original resume files are not sent to OpenAI",
          "Professional photo is not sent to OpenAI",
          "Full name, contacts, links, age and birth date are redacted",
          "Professional experience remains available for analysis",
        ],
      },
    ],
  },
} as const;

export const trustRu = {
  privacyFirst: {
    title: "Privacy-first AI",
    body: "Ваши персональные данные обрабатываются безопасно. Имя, контакты и загруженный файл резюме не отправляются в AI напрямую. Анализируется только анонимизированный профессиональный опыт.",
  },
} as const;
