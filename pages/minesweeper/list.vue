<script setup lang="ts">
const router = useRouter()
const params = ref({rows: 10, cols: 10, percent: 13})
const {data, refresh} = await useNuxtApp().$GET(`/minesweeper/list`)

async function create() {
    const {data} = await useNuxtApp().$PUT('/minesweeper/create', params.value)
    await router.push(`/minesweeper/${data.value.id}`)
}

const rowItems = Array(100).fill(null).map((_, i) => i)
const colItems = Array(100).fill(null).map((_, i) => i)
const percentItems = [5, 13, 20]
</script>

<template lang="pug">
v-card(width="600" )
    v-toolbar
        v-toolbar-title Minesweeper
    v-card-text
        div.d-flex
            v-select(:items="rowItems" v-model="params.rows" label="rows" density="compact" )
            v-select(:items="colItems" v-model="params.cols" label="cols" density="compact" )
            v-select(:items="percentItems" v-model="params.percent" label="percent" density="compact" )
            v-btn(@click="create") Create
        div(v-for="item of data" :key="item.id")
            NuxtLink(:to="`/minesweeper/${item.id}`") {{item.createdAt}}

</template>

<style scoped lang="sass">

</style>