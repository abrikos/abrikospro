<script setup lang="ts">

import type {ISeaBattle} from "~/server/models/sea-battle.model";
const router = useRouter()
const {data:list}:{data:ISeaBattle[]} = await useNuxtApp().$GET(`/sea-battle/list`)

async function create() {
    const {data} = await useNuxtApp().$PUT('/sea-battle/create')
    await router.push(`/sea-battle/${data.value.id}`)
}

</script>

<template lang="pug">
v-card(width="600" )
    v-toolbar
        v-toolbar-title {{$t('Sea battle')}}
    v-card-text
        div
            v-btn(@click="create") {{$t('Create')}}
        div(v-for="item of list" :key="item.id")
            NuxtLink(:to="`/sea-battle/${item.id}`") {{item.createdAt}}

</template>

<style scoped lang="sass">

</style>