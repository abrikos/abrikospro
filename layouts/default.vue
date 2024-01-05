<script lang="ts" setup>
import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import {useAuthStore} from '~/store/auth-store'; // import the auth store we just created
import {useTheme} from 'vuetify'
import type {IUser} from "~/server/models/user.model";
import {useI18n} from "vue-i18n";

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

function switchLocale(l: string) {
    locale.value = l
    localStorage.setItem('locale', l)
    //$i18n.locale.value = 'ru'
}

onMounted(() => {
    theme.global.name.value = localStorage.getItem('theme') || 'dark'
    locale.value = localStorage.getItem('locale') || 'ru'
})

const open = ['minesweeper', 'fiscal']

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
        v-btn(to="/user/login" v-if="!loggedUser") Войти
        v-btn(to="/user/signup" v-if="!loggedUser") Регистрация
        v-btn(to="/user/cabinet" v-if="loggedUser") {{loggedUser.name}}
            UserAvatar(:user="loggedUser")
        v-btn(@click="logUserOut" v-if="loggedUser" append-icon="mdi-logout" ) Выйти
        v-btn(@click="toggleTheme" icon="mdi-theme-light-dark" )
        v-menu
            template(v-slot:activator="{props}")
                v-btn(icon="mdi-translate" v-bind="props")
            v-list
                v-list-item(v-for="locale of $i18n.availableLocales" @click="switchLocale(locale)" :active="$i18n.locale === locale" :key="locale") {{locale}}
        //template(v-slot:prepend)
            v-app-bar-nav-icon(@click.stop="drawerLeft = !drawerLeft")
        //template(v-slot:append)
            v-btn(icon="mdi-dots-vertical" @click.stop="drawerRight = !drawerRight")
    //v-navigation-drawer(v-model="drawerRight" temporary location="right" )
        v-list
            v-list-item
                v-switch(@click="toggleTheme" v-model="nightMode" label="Ночной режим" )


    v-main
        v-container(fluidx)
            v-row
                v-col(cols="2")
                    v-list(v-model:opened="open" )
                        v-list-item(to="/") Начало
                        v-divider
                        v-list-subheader Игры
                        v-list-item(to="/minesweeper/list") {{$t('Minesweeper')}}
                        v-list-item(to="/sea-battle/list") {{$t('Sea battle')}}

                        v-divider
                        //v-list( v-if="loggedUser")
                        v-list-subheader Чеки
                        v-list-item(to="/fiscal/upload") Загрузка
                        v-list-item(to="/fiscal/monthly") Помесячно
                        v-list-item(to="/fiscal/list") Просмотр
                        v-list-item(to="/fiscal/goods") Товары

                v-col
                    slot
    NuxtSnackbar
</template>

<style scoped lang="sass">
img#logo
    height: 40px
</style>