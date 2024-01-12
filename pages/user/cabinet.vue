<script setup lang="ts">
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/store/auth-store";
import type {IUser} from "~/server/models/user.model";

const {loggedUser} = storeToRefs(useAuthStore()) as unknown as { loggedUser: IUser }
const router = useRouter()

watch(loggedUser,(v)=>{
    if(!v) router.push('/')
})
const tab = ref()
</script>

<template lang="pug">
v-card(v-if="loggedUser")
    v-toolbar
        v-toolbar-title  {{$t('Cabinet')}}

    v-tabs(v-model="tab")
        v-tab(:value="1" ) {{$t('Profile')}}
            img.strategy(v-if="loggedUser.strategy" :src="`/${loggedUser.strategy}.svg`")
        v-tab(:value="2" ) {{$t('Change password')}}
    UserProfile(v-if="tab===1" :logged-user="loggedUser")
    UserPassword(v-if="tab===2" :logged-user="loggedUser")

</template>
