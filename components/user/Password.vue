<script setup lang="ts">
import type {IUser} from "~/server/models/user.model";
import {useI18n} from "vue-i18n";
const {loggedUser} = defineProps<{ loggedUser: IUser}>()
const {t} = useI18n()
const password = ref()
const password2 = ref()
const canSubmit = () => {
    return password.value && password.value === password2.value
}

async function changePassword() {
    await useNuxtApp().$POST('/user/password', {password: password.value})
    password2.value = undefined
    password.value = undefined
}

const rules = ref([() => password === password2 || t('Password and confirmation must be the same')])

</script>

<template lang="pug">
v-card(v-if="!loggedUser.strategy" width="600" )
    v-card-text
        v-text-field(v-model="password" :label="$t('New password')" type="password")
        v-text-field(v-model="password2" :label="$t('Confirm password')" type="password" :error-messages="(password!==password2) ? $t('Password and confirmation must be the same'): null")
    v-card-actions(v-if="canSubmit()")
        v-btn(@click="changePassword") {{$t('Save')}}

</template>

<style scoped lang="sass">
</style>