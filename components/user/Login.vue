<script setup lang="ts">
import {useAuthStore} from '~/store/auth-store';
import {storeToRefs} from "pinia";
import type {IUser} from "~/server/models/user.model";

const {authenticateUser, loggedUser} = useAuthStore()

const router = useRouter()
//if (loggedUser) router.push('/user/cabinet')
const user = ref({email: '', password: ''})

async function submit() {
    const res = await authenticateUser(user.value, 'password')
    if (res) showDialog.value = false
}

const showDialog = ref()
</script>

<template lang="pug">
v-btn(@click="showDialog=true") {{$t('Login')}}
v-dialog(width="500" v-model="showDialog" )
    v-card(width="600" )
        v-toolbar
            v-toolbar-title {{$t('Login')}}
            v-spacer
            v-btn(@click="showDialog=false" icon="mdi-close" )
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