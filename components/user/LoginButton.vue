<script setup lang="ts">
import {useAuthStore} from "~/store/auth-store";
import {storeToRefs} from "pinia";
import type {IUser} from "~/server/models/user.model";

const {logUserOut} = useAuthStore(); // use authenticateUser action from  auth store
const {loggedUser} = storeToRefs(useAuthStore()) as unknown as { loggedUser: IUser }

const {$event, $listen} = useNuxtApp()
$listen('login:close', async () => {
    showDialog.value = false
})

const showDialog = ref()
</script>

<template lang="pug">


div.flex(v-if="loggedUser")
  q-btn(to="/user/cabinet" flat) {{loggedUser.name}}
    UserAvatar(:user="loggedUser")
  q-btn(@click="logUserOut" icon="mdi-logout" :label="$t('Logout')" flat)

div.flex(v-else)
  q-btn(@click="showDialog=true" icon="mdi-login" :label="$t('Login')" flat)
q-dialog(width="500" v-model="showDialog" )
    UserLogin
</template>

<style scoped lang="sass">

</style>
