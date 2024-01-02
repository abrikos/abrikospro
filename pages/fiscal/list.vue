<script setup lang="ts">
const router = useRouter()
const {data: fiscal} = await useNuxtApp().$GET('/fiscal/list')
const headers = [
    {title: 'Дата', key: 'date'},
    {title: 'Магазин', key: 'retailPlaceFull'},
    {title: 'Сумма', key: 'sumHuman', align: 'end'},
]
const search=ref()

function goToFiscal(e:any,row:any){
    router.push(`/fiscal/view-${row.item.id}`)
}
</script>

<template lang="pug">
v-text-field(v-model="search" prepend-inner-icon="mdi-magnify" flat hide-details variant="solo-filled")
v-data-table(:items="fiscal" :headers="headers" v-model:search="search" @click:row="goToFiscal" item-value="id")

</template>

<style scoped lang="sass">

</style>