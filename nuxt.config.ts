// https://nuxt.com/docs/api/configuration/nuxt-config

import type {NuxtPage} from "@nuxt/schema";

export default defineNuxtConfig({
    ssr: false,
    hooks: {
        'pages:extend'(pages) {
            function setMiddleware(pages: NuxtPage[]) {
                for (const page of pages) {
                    page.meta ||= {}
                    // Note that this will override any middleware set in `definePageMeta` in the page
                    page.meta.middleware = ['auth-middleware']
                    if (page.children) {
                        setMiddleware(page.children)
                    }
                }
            }

            setMiddleware(pages)
        }
    },
    modules: [
        '@invictus.codes/nuxt-vuetify',
        'nuxt-mongoose',
        'nuxt-snackbar',
        '@pinia/nuxt',
    ],
    runtimeConfig: {
        authExpiration: 3600 * 24 * 30,
        authRefreshBeforeExpiration: 3000,
        authTokenName: 'auth_token',
        mailUser: process.env.MAIL_USER,
        mailPassword: process.env.MAIL_PASSWORD,
        telegramBotToken: process.env.TG_BOT_TOKEN,
        telegramBotName: process.env.TG_BOT_NAME,
        public: {
            devMode: process.env.NODE_ENV !== 'production',
            telegramBotName: process.env.TG_BOT_NAME
        }
    },
    app: {
        head: {
            link: [{rel: 'icon', type: 'image/svg', href: '/logo.svg'}],
            script: [
                //{src:'/ym.js', tagPosition:'bodyClose'}
            ]
        }
    },
    snackbar: {
        bottom: true,
        right: true,
        duration: 5000
    },
    mongoose: {
        uri: process.env.MONGODB_URI,
        options: {},
        modelsDir: 'models',
    },
    css: ['vuetify/lib/styles/main.sass', '~/assets/vuetify.sass'],
    vuetify: {
        /* vuetify options */
        vuetifyOptions: {
            theme: {
                defaultTheme: 'dark'
            }
            // @TODO: list all vuetify options
        },

        moduleOptions: {
            //customVariables: ['~/assets/variables.scss'],
            /* nuxt-vuetify module options */
            treeshaking: true,
            useIconCDN: true,

            /* vite-plugin-vuetify options */
            styles: 'sass',
            autoImport: true,
            //useVuetifyLabs: true,
        }
    },
    build: {
        transpile: ['fetch-custom'],
    },
    devtools: {enabled: true}
})
