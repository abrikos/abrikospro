<script setup lang="ts">
import type {VDataTable} from 'vuetify/lib/components/index.mjs'

const router = useRouter()
const {data: list, refresh} = await useNuxtApp().$GET('/fiscal/goods')
const headers = [
    {label: 'Наименование', field: 'name', name:'', align: 'left'},
    {label: 'Кол-во', field: 'quantity', name:''},
    {label: 'Цена', field: 'priceHuman', name:''},
    {label: 'Сумма', field: 'sum', name:''},
    {label: 'Дата', field: 'fiscal.date', name:''},
    {label: 'Магазин', field: 'fiscal.retailPlaceFull', name:''},

]
const search = ref('')

function goToFiscal(e: any, row: any) {
  console.log(row)
    //router.push(`/fiscal/view-${row.item.fiscal.id}`)
}

const filtered = computed(()=>{
  return list.value.filter((v:any)=>{
    for(const field in v){
      if(headers.map(h=>h.field).includes(field) && v[field].toString().toLowerCase().match(search.value.toLowerCase())){ return true }
    }
  })
})



</script>

<template lang="pug">
q-input(v-model="search" clearable @clear="search='';doSearch()" label="Поиск" )
//q-table(:rows="fiscal" :headers="headers" v-model:search="search" @click:row="goToFiscal" item-value="id")
q-table(:rows="filtered" :columns="headers" @row-click="goToFiscal" :pagination="{rowsPerPage:10}")

</template>

<style scoped lang="sass">

</style>
