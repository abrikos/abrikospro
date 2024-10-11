<script setup lang="ts">
const router = useRouter()
const {data: list} = await useNuxtApp().$GET('/fiscal/list')
const headers = [
  {label: 'Дата', field: 'date', name:''},
  {label: 'Магазин', field: 'retailPlace', name:'', align: 'left'},
  {label: 'Адрес', field: 'retailPlaceAddress', name:'', align: 'left'},
  {label: 'Сумма', field: 'sumHuman', name:''},
  {label: 'Чек', field: 'fiscalDocumentNumber', name:''},
]
const search = ref('')

function goToFiscal(e: any, row: any) {
  router.push(`/fiscal/view-${row.id}`)
}

const filtered = computed(()=>{
  return list.value.filter((v:any)=>{
    for(const key in v){
      if(headers.map(h=>h.field).includes(key) && v[key].toString().toLowerCase().match(search.value.toLowerCase())){ return true }
    }
  })
})

</script>

<template lang="pug">
q-input(v-model="search" clearable label="Поиск" )
//q-table(:rows="fiscal" :headers="headers" v-model:search="search" @click:row="goToFiscal" item-value="id")
q-table(:rows="filtered" :columns="headers" @row-click="goToFiscal" :pagination="{rowsPerPage:10}")


</template>

<style scoped lang="sass">

</style>
