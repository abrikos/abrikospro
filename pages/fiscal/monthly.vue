<script setup lang="ts">
const {data: fiscal} = await useNuxtApp().$GET('/fiscal/monthly')

const yearHeader = computed(()=>{
    let year = 0
    const rows = []
    for(const item of fiscal.value){
        if(year!==item.year){
            year = item.year
            rows.push({header:year})
        }
        rows.push(item)
    }
    return rows
})
</script>

<template lang="pug">
table
    tbody
        tr
            th Год
            th Месяц
            th Сумма
        tr(v-for="(item,i) of yearHeader" :key="i" )
            td {{item.header}}
            td.text-right {{item.month}}
            td.text-right {{item.totalSum?.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')}}
</template>

<style scoped lang="sass">
td
    width: 100px
</style>