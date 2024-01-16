<script setup lang="ts">
import {useAuthStore} from '~/store/auth-store';
const {$event, $listen} = useNuxtApp()
const {authenticateUser, loggedUser} = useAuthStore()

const router = useRouter()
//if (loggedUser) router.push('/user/cabinet')
const user = ref({email: '', password: ''})

async function submit() {
    const res = await authenticateUser(user.value, 'password')
    if(res) closeDialog()
}

function closeDialog(){
    $event('login:close')
}

</script>

<template lang="pug">
    v-card(width="600" )
        v-toolbar
            v-toolbar-title {{$t('Login')}}
            v-spacer
            v-btn(@click="closeDialog" icon="mdi-close" )
        v-card-text
            v-text-field(v-model="user.email" label="Email" )
            v-text-field(v-model="user.password" :label="$t('Password')" type="password" )
        v-card-actions
            v-btn(@click="submit") {{$t('Send')}}
            LoginTelegram
            v-spacer
            NuxtLink(to="/user/password-restore") {{$t('Restore password')}}
            //v-btn(@click="router.push('/password-restore')")

</template>

<style scoped>

</style>