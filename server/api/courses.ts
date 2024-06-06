import {da} from "vuetify/locale";

export default defineEventHandler(async(event) => {
    const config = useRuntimeConfig()
    const {goldApi, ethKey} = config
    console.log('zzzzzzzz', goldApi, ethKey)
    const goldUrl = 'https://www.goldapi.io/api/XAU/USD'
    const gold = await $fetch(goldUrl, {headers:{'X-Access-Token': goldApi}})
    return gold
})