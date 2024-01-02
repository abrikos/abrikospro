<script setup lang="ts">
import type {VDataTable} from 'vuetify/lib/components/index.mjs'

const router = useRouter()
const {data: fiscal} = await useNuxtApp().$GET('/fiscal/goods')
const headers = [
    {title: 'Наименование', key: 'name'},
    {title: 'Кол-во', key: 'quantity', align: 'end'},
    {title: 'Цена', key: 'priceHuman', align: 'end'},
    {title: 'Дата', key: 'fiscal.date', align: 'end'},
    {title: 'Магазин', key: 'fiscal.retailPlaceFull'},

]
type SortItem = InstanceType<typeof VDataTable>['sortBy']
const sortBy: SortItem = [{key: 'fiscal.date', order: 'desc'}]
const search = ref()

function goToFiscal(e: any, row: any) {
    router.push(`/fiscal/view-${row.item.fiscal.id}`)
}
</script>

<template lang="pug">
v-text-field(v-model="search" prepend-inner-icon="mdi-magnify" flat hide-details variant="solo-filled")
v-data-table(:items="fiscal" :headers="headers" v-model:search="search" @click:row="goToFiscal" v-model:sort-by="sortBy" item-value="id")

</template>

<style scoped lang="sass">

</style>