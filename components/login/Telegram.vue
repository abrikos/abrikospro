<script setup>
import { useAuthStore } from '~/store/auth-store.ts';
const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store
const config = useRuntimeConfig()
const {$event, $listen} = useNuxtApp()

const holder = ref(null)
async function login(data){
    const res = await authenticateUser(data, 'telegram')
    if(res) $event('login:close')
}

onMounted(()=>{
    window.onTelegramAuth = async function (user) {
        login(user)
    }
    console.log(config.public.telegramBotName)
    const tgScript = document.createElement('script')
    tgScript.async = true
    tgScript.src = "https://telegram.org/js/telegram-widget.js?22"
    tgScript.setAttribute('data-telegram-login', config.public.telegramBotName)
    tgScript.setAttribute('data-onauth', 'window.onTelegramAuth(user)')
    tgScript.setAttribute('data-request-access', 'write')
    tgScript.setAttribute('data-size', 'large')
    document.getElementById('holder').appendChild(tgScript);
})

</script>

<template lang="pug">
div#holder

</template>

<style scoped>

</style>
