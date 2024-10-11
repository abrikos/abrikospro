<script setup lang="ts">
import type {IUser} from "~/server/models/user.model";

const {loggedUser} = defineProps<{ loggedUser: IUser}>()
const config = useRuntimeConfig()

async function submit() {
    await useNuxtApp().$POST('/user/update', loggedUser)
    snapshot()
}

const userSnapshot = ref<IUser>(loggedUser && JSON.parse(JSON.stringify(loggedUser)))
const edited = computed(() => {
    return loggedUser && JSON.stringify(userSnapshot.value) !== JSON.stringify(loggedUser)
})

function reset() {
    for (const key in loggedUser) {
        loggedUser.value[key] = userSnapshot.value[key]
    }
}

function snapshot() {
    for (const key in loggedUser) {
        userSnapshot.value[key] = loggedUser[key]
    }
}



</script>

<template lang="pug">
v-card(width="600" )
    v-card-text
        q-input(
            v-model="loggedUser.email"
            label="Адрес почты"
            :disabled="!loggedUser.strategy"
            append-inner-icon="mdi-at"
        )
        q-input(v-model="loggedUser.avatarImage" :label="$t('Avatar')")
            template(v-slot:append-inner)
                //v-fade-transition
                UserAvatar(:user="loggedUser" )
        q-input(v-model="loggedUser.name" :label="$t('Name')")
        q-input(v-if="config.public.ethereumNet" v-model="loggedUser.ethAddress" :label="$t('Address of ETH wallet')" append-inner-icon="mdi-ethereum" )
    v-card-actions(v-if="edited")
        q-btn(@click="submit" color="primary" ) {{$t('Save')}}
        v-spacer
        q-btn(@click="reset") {{$t('Cancel')}}
</template>

<style scoped lang="sass">
img.strategy
    //transform: translate(7px, 3px)
    height: 20px
</style>
