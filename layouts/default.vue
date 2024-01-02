<script lang="ts" setup>
import { storeToRefs } from 'pinia'; // import storeToRefs helper hook from pinia
import { useAuthStore } from '~/store/auth-store'; // import the auth store we just created
import { useTheme } from 'vuetify'
import type {IUser} from "~/server/models/user.model";
const theme = useTheme()

const { logUserOut } = useAuthStore(); // use authenticateUser action from  auth store
const {loggedUser} = storeToRefs(useAuthStore()) as unknown as {loggedUser:IUser}

const drawerLeft = ref(true)
const drawerRight = ref(false)
const nightMode = ref(true)
const title = 'Abrikos HP'
useHead({title})
function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

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
        v-btn(to="/admin" v-if="loggedUser?.isAdmin") ADMIN
        v-btn(to="/login" v-if="!loggedUser") Войти
        v-btn(to="/signup" v-if="!loggedUser") Регистрация
        v-btn(to="/cabinet" v-if="loggedUser") {{loggedUser.name}}
            UserAvatar(:user="loggedUser")
        v-btn(@click="logUserOut" v-if="loggedUser" append-icon="mdi-logout" ) Выйти
        v-btn(@click="toggleTheme" icon="mdi-theme-light-dark" )
        //template(v-slot:prepend)
            v-app-bar-nav-icon(@click.stop="drawerLeft = !drawerLeft")
        //template(v-slot:append)
            v-btn(icon="mdi-dots-vertical" @click.stop="drawerRight = !drawerRight")
    //v-navigation-drawer(v-model="drawerRight" temporary location="right" )
        v-list
            v-list-item
                v-switch(@click="toggleTheme" v-model="nightMode" label="Ночной режим" )

    //v-navigation-drawer(v-model="drawerLeft")
        v-list
            v-list-item(to="/") Начало
            v-list-item(to="/fiscal/list" vif="user") Просмотр чеков
            v-list-item(to="/fiscal/upload" vif="user") Загрузка чеков


    v-main
        v-container(fluidx)
            v-row
                v-col(cols="2")
                    v-list
                        v-list-item(to="/") Начало
                        v-list-item(to="/fiscal/list" v-if="loggedUser") Просмотр чеков
                        v-list-item(to="/fiscal/goods" v-if="loggedUser") Просмотр товаров
                        v-list-item(to="/fiscal/upload" v-if="loggedUser") Загрузка чеков
                v-col
                    slot
    NuxtSnackbar
</template>

<style scoped lang="sass">
img#logo
    height: 40px
</style>