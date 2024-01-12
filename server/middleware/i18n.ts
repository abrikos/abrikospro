import { createI18n } from 'vue-i18n'
import fs from 'fs-extra'

const i18n = createI18n({
    fallbackLocale: 'en',
}).global

const dir = fs.readdirSync('./locales')

for (const locale of dir) {
    i18n.setLocaleMessage(locale.replace('.json',''), fs.readJSONSync('locales/' + locale))
}

export default defineEventHandler(e => {
    e.context.$t = (key: string) =>
        i18n.t(key, getCookie(e, 'locale') || i18n.fallbackLocale.toString())
})

declare module 'h3' {
    interface H3EventContext {
        $t: typeof i18n.t
    }
}