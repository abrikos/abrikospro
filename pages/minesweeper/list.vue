<script setup lang="ts">

import type {ISeaBattle} from "~/server/models/sea-battle.model";

const router = useRouter()
const params = ref({rows: 10, cols: 10, percent: 13})
const {data}: { data: ISeaBattle[] } = await useNuxtApp().$GET(`/minesweeper/list`)

async function create() {
  const {data} = await useNuxtApp().$PUT('/minesweeper/create', params.value)
  await router.push(`/minesweeper/${data.value.id}`)
}

const rowItems = Array(100).fill(null).map((_, i) => i)
const colItems = Array(100).fill(null).map((_, i) => i)
const percentItems = [5, 13, 20]
</script>

<template lang="pug">
q-toolbar
  q-toolbar-title {{$t('Minesweeper')}}
div.flex
  q-select(:options="rowItems" v-model="params.rows" :label="$t('Rows')")
  q-select(:options="colItems" v-model="params.cols" :label="$t('Cols')")
  q-select(:options="percentItems" v-model="params.percent" :label="$t('Percent')" density="compact" )
  q-btn(@click="create" color="primary" ) {{$t('Create')}}
div(v-for="item of data" :key="item.id")
  NuxtLink(:to="`/minesweeper/${item.id}`") {{item.createdAt}}

</template>

<style scoped lang="sass">
.q-field
  width: 150px
</style>
