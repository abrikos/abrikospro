<script lang="ts" setup>
import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import {useAuthStore} from '~/store/auth-store'; // import the auth store we just created
import {useTheme} from 'vuetify'
import type {IUser} from "~/server/models/user.model";
import {useI18n} from "vue-i18n";

const config = useRuntimeConfig()
const {locale} = useI18n()
const theme = useTheme()

const {logUserOut} = useAuthStore(); // use authenticateUser action from  auth store
const {loggedUser} = storeToRefs(useAuthStore()) as unknown as { loggedUser: IUser }

const drawerLeft = ref(true)
const drawerRight = ref(false)
const nightMode = ref(true)
const title = 'Abrikos HP'
useHead({title})

function toggleTheme() {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    localStorage.setItem('theme', theme.global.name.value)
}
const myLocale = useCookie('locale')
function switchLocale(l: string) {
    locale.value = l
    myLocale.value = l
    //localStorage.setItem('locale', l)
    //$i18n.locale.value = 'ru'
}

onMounted(() => {
    theme.global.name.value = localStorage.getItem('theme') || 'dark'
    //locale.value = localStorage.getItem('locale') || 'ru'
    locale.value = myLocale.value || 'ru'
})

const openGroup = ref(['games', 'fiscal'])

</script>
<template lang="pug">
v-app
    NuxtLoadingIndicator
    v-app-bar(density="compact" )
        v-app-bar-title
            div.d-flex.align-center
                div.px-2
                    img#logo(src="/logo.svg")
                span {{title}}
        v-btn(to="/user/admin" v-if="loggedUser?.isAdmin") ADMIN
        //v-btn(to="/user/login" v-if="!loggedUser") {{$t('Login')}}
        UserLoginButton
        v-btn(to="/user/signup" v-if="!loggedUser") {{$t('Signup')}}
        v-btn(to="/user/cabinet" v-if="loggedUser") {{loggedUser.name}}
            UserAvatar(:user="loggedUser")
        v-btn(@click="logUserOut" v-if="loggedUser" append-icon="mdi-logout" ) {{$t('Logout')}}
        v-btn(@click="toggleTheme" icon="mdi-theme-light-dark" )
        v-menu
            template(v-slot:activator="{props}")
                v-btn(icon="mdi-translate" v-bind="props")
            v-list
                v-list-item(v-for="locale of $i18n.availableLocales" @click="switchLocale(locale)" :active="$i18n.locale === locale" :key="locale") {{locale}}
        template(v-slot:prepend)
            v-app-bar-nav-icon(@click.stop="drawerLeft = !drawerLeft")
        //template(v-slot:append)
            v-btn(icon="mdi-dots-vertical" @click.stop="drawerRight = !drawerRight")
    v-navigation-drawer(v-model="drawerLeft" :temporary="false" location="left" )
        v-list(v-model:opened="openGroup" )
            v-list-item(to="/" prepend-icon="mdi-home" title="Home")
            v-list-item(v-if="config.public.devMode" to="/metamask" prepend-icon="mdi-dollar" ) Metamask
            v-list-item(to="/courses" prepend-icon="mdi-dollar" ) {{$t('Courses')}}
            v-divider
            span
                v-list-group(value="games")
                    template(v-slot:activator="{props}")
                        v-list-item(v-bind="props" prepend-icon="mdi-nintendo-game-boy" ) Игры
                    v-list-item(to="/minesweeper/list" prepend-icon="mdi-mine" ) {{$t('Minesweeper')}}
                    v-list-item(v-if="config.public.devMode" to="/solitaire/list" prepend-icon="mdi-cards-playing-club-multiple" ) {{$t('Solitaire')}}
                    v-list-item(v-if="config.public.devMode" to="/sea-battle/list" prepend-icon="mdi-ship-wheel" ) {{$t('Sea battle')}}
                v-divider
            span
                v-list-group(value="fiscal")
                    template(v-slot:activator="{props}")
                        v-list-item(v-bind="props" prepend-icon="mdi-cash-register" ) Чеки

                    v-list-item(to="/fiscal/upload" prepend-icon="mdi-upload-box" ) Загрузка
                    v-list-item(to="/fiscal/monthly" prepend-icon="mdi-calendar-month" ) Помесячно
                    v-list-item(to="/fiscal/list" prepend-icon="mdi-format-list-bulleted" ) Список
                    v-list-item(to="/fiscal/goods" prepend-icon="mdi-basket-fill" ) Товары
                v-divider

    v-main
        v-container(fluidx)
            slot
    NuxtSnackbar
</template>

<style scoped lang="sass">
img#logo
    height: 40px
</style>