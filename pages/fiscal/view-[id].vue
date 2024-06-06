<script setup lang="ts">
import type {IFiscal} from "~/server/models/fiscal.model";

const route = useRoute()
const router = useRouter()
const {data} = await useNuxtApp().$GET(`/fiscal/${route.params.id}`)
const fiscal = data as IFiscal
const headers = [
    {title: 'Наименование', key: 'name'},
    {title: 'Количество', key: 'quantity', align: 'end'},
    {title: 'Сумма', key: 'sum', align: 'end'},
    {title: '', key: 'action'},
]
const search=ref()
async function deleteFiscal(id:string){
  await useNuxtApp().$DELETE('/fiscal/' + id)
  await router.push('/fiscal/list')
}

</script>

<template lang="pug">
div(v-if="fiscal")
    h1 {{fiscal.date}} {{fiscal.retailPlaceFull}}
      v-btn(@click.prevent.stop="deleteFiscal(fiscal.id)" icon="mdi-delete" size="small" )
    //v-text-field(v-model="search" prepend-inner-icon="mdi-magnify" flat hide-details variant="solo-filled")
    //v-data-table(:items="fiscal.goods" :headers="headers" v-model:search="search" )
    v-card
        table
            tbody
                tr
                    th Наименование
                    th Количество
                    th Сумма
                tr(v-for="good of fiscal.goods" :key="good.id")
                    td {{good.name}}
                    td {{good.quantity}}
                    td {{good.sum}}

</template>

<style scoped lang="sass">
.v-theme--dark
    tr
        border-bottom: 1px dotted gray
.v-theme--light
    tr
        border-bottom: 1px dotted silver
table
    //width: 100%
    border-collapse: collapse
    td
        padding: 5px
</style>