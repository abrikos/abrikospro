<script lang="ts" setup>
import {storeToRefs} from 'pinia'; // import storeToRefs helper hook from pinia
import {useAuthStore} from '~/store/auth-store'; // import the auth store we just created
import type {IUser} from "~/server/models/user.model";
import {useI18n} from "vue-i18n";

const $q = useQuasar()
const config = useRuntimeConfig()
const {locale, availableLocales} = useI18n()

const {logUserOut} = useAuthStore(); // use authenticateUser action from  auth store
const {loggedUser} = storeToRefs(useAuthStore()) as unknown as { loggedUser: IUser }

const drawerLeft = ref(true)
const drawerRight = ref(false)
const nightMode = ref(true)
const title = 'Abrikos HP'
useHead({title})

function toggleTheme() {
  $q.dark.set(!$q.dark.mode)
  localStorage.setItem('dark', $q.dark.mode ? 'dark' : 'light')
}

const myLocale = useCookie('locale')

function switchLocale(l: string) {
  locale.value = l
  myLocale.value = l
  //localStorage.setItem('locale', l)
  //$i18n.locale.value = 'ru'
}

onMounted(() => {
  $q.dark.set(localStorage.getItem('dark') === 'dark')
  locale.value = myLocale.value || 'ru'
})

const openGroup = ref(['games', 'fiscal'])


</script>
<template lang="pug">
q-layout(view="hHh Lpr lff")
  NuxtLoadingIndicator
  q-header(elevated)
    q-toolbar
      q-toolbar-title
        q-btn(flat to="/") {{title}}
          //q-img#logo(src="/logo.svg")
      q-btn(to="/user/admin" v-if="loggedUser?.isAdmin" flat) ADMIN
      q-btn-dropdown(icon="translate" )
        q-list
          q-item(v-for="l of availableLocales" @click="switchLocale(l)" :active="locale === l" :key="l" clickable v-close-popup) {{l}}
      q-btn(@click="toggleTheme" icon="mdi-theme-light-dark" flat)
      q-space
      UserLoginButton

  LeftMenu
  q-page-container
    slot



</template>

<style scoped lang="sass">
img#logo
  height: 40px
</style>
