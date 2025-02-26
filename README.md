## GYM BRO TG-MINI-APP

<img src="./.github/assets/berserk.gif" alt="Berserk" />

### Table of Contents

- 🚀 [Getting Started](#getting-started)
- 📖 [Project Structure](#project-structure)
- 💻 [Environment Variables](#environment-variables)
- 🏠 [Nuxt Configuration](#nuxt-configuration)
- ❤️ [Contribute](#contribute)
- ⚖️ [License](#license)

---

## <a name="getting-started">🚀 Getting Started</a>

## Install deps

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

## <a name="project-structure">📖 Project structure</a>

```
gym-tg-app/
├── app/               # Main application directory containing core application logic
│   ├── services
│   ├── helpers        # For helper functions and utilities
│   ├── stores         # For state management stores (Pinia)
│   ├── plugins
│   ├── middleware
│   ├── nuxt.config.ts # Nuxt.js configuration file
│   └── ...            # Other application-specific files and directories
├── .env.example
├── CHANGELOG.md       # Changelog file documenting project changes
└── ...                # Other project files and directories
```

## <a name="environment-variables">💻 Environment Variables</a>

Create 2 files `.env.development` and `.env.production` in your main directory with the following contents:

```dotenv
NUXT_PUBLIC_API_URL=https://api.example.com
```

**Note:** Replace the placeholder values with your actual environment variable values. Do **not** commit this file to
version control.

## <a name="environment-variables">🏠 Nuxt configuration</a>

Update your `nuxt.config.ts` file in the `app` directory as follows:

```typescript
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
      ],
      script: [{ src: 'https://telegram.org/js/telegram-web-app.js' }],
    },
  },

  runtimeConfig: {
    public: {
      apiUrl: '',
      botToken: '',
      chatId: '',
    },
  },

  ui: {
    theme: {
      colors: ['primary', 'secondary', 'orange', 'indigo', 'black', 'cyan', 'stone', 'gray', 'lime', 'rose', 'info', 'success', 'warning', 'error'],
    },
  },

  devServer: {
    host: '192.168.0.199',
    port: 5000,
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@nuxtjs/i18n',
  ],

  primevue: {
    directives: {
      exclude: '*',
    },
    components: {
      include: ['Chart'],
    },
    composables: {
      exclude: '*',
    },
  },

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  i18n: {
    vueI18n: './app/plugins/i18n.config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_language',
      redirectOn: 'root',
    },
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    storage: 'localStorage',
    storageKey: 'nuxt-color-mode',
  },

  compatibilityDate: '2024-11-27',
})
```

## <a name="contribute">❤️ Contribute</a>

We welcome contributions to improve Gym TG App! 💪

Here are ways you can contribute:

- **Reporting Bugs:** If you find bugs or issues, please create a detailed issue on GitHub with:
    - Steps to reproduce
    - Expected behavior
    - Actual behavior
    - Screenshots (if applicable)

- **Feature Suggestions:** Have ideas to enhance the app? Open an issue with the tag "enhancement" and include:
    - Clear description of the feature
    - Use cases
    - Any mockups or examples (if available)

- **Code Contributions:** Want to contribute code?
    1. Fork the repository
    2. Create a feature branch (`git checkout -b feature/name`)
    3. Follow our coding standards
    4. Write clear commit messages following conventional commits
    5. Submit a Pull Request (**Note**: send your PR to the **development** branch, this is the latest stable version
       for development)

Before contributing, please read our CHANGELOG in the releases to understand recent changes.

For questions and discussions, join our [Telegram channel](https://t.me/+Gm_8ULokA71kMTU6).

## <a name="license">⚖️ License</a>

[MIT](https://github.com/molsrg/gym-tg-app/tree/main/LICENSE)
