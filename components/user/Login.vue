<script setup lang="ts">
import {useAuthStore} from '~/store/auth-store';

const {$event, $listen} = useNuxtApp()
const {authenticateUser, loggedUser} = useAuthStore()
const config = useRuntimeConfig()

const router = useRouter()
//if (loggedUser) router.push('/user/cabinet')
const user = ref(config.public.devMode ? {email: 'abrikoz@gmail.com', password: '1'} : {email: '', password: ''})

async function submit() {
  const res = await authenticateUser(user.value, 'password')
  if (res) closeDialog()
}

function closeDialog() {
  $event('login:close')
}

</script>

<template lang="pug">
q-card(width="600" )
  q-toolbar
    q-toolbar-title {{$t('Login')}}
    q-space
    q-btn(@click="closeDialog" icon="mdi-close" )
  q-card-section
    LoginTelegram
  q-card-section
    q-input(v-model="user.email" label="Email" hint="")
    q-input(v-model="user.password" :label="$t('Password')" type="password" )
  q-card-actions
    q-btn(@click="submit" :flat="false" color="primary" ) {{$t('Send')}}
  q-card-section
    q-separator
    q-space
    q-btn(to="/user/signup") {{$t('Signup')}}
    q-btn(to="/password-restore") {{$t('Restore password')}}

</template>

<style scoped>

</style>
