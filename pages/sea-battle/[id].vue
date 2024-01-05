<script setup lang="ts">
import type {ICell} from "~/server/models/sea-battle.model";

const route = useRoute()
const router = useRouter()
const {data, refresh} = await useNuxtApp().$GET(`/sea-battle/${route.params.id}`)
const rowsArray = Array(data.value.rows).fill(null).map((_, i) => i)
const colsArray = Array(data.value.cols).fill(null).map((_, i) => i)

function idx(row: number, col: number) {
    return row * data.value.rows + col
}

function cellClass(row: number, col: number) {
    const cell = data.value.field1.find((c:ICell)=>c.row===row && c.col===col)
    if(!cell) return
    if(cell.ship) return 'ship'
    return 'hidden'
}

async function cellClick(row: number, col: number) {
    if (data.value.winner) return
    await useNuxtApp().$POST(`/sea-battle/${data.value.id}/turn`, {idx: idx(row, col)})
    await refresh()
}

async function restart() {
    const {data: newGame} = await useNuxtApp().$PUT(`/sea-battle/create`, data.value)
    await router.push(`/sea-battle/${newGame.value.id}`)
}

function getCell(row: number, col: number) {
    return data.value.field1.find((c: ICell) => c.row === row && c.col === col)
}

</script>

<template lang="pug">
div.text-red(v-if="data.finished===-1") {{$t('Game over')}}
div.text-green(v-if="data.finished===1") {{$t('Win')}}
div#miner
    div.row(v-for="row of rowsArray" :key="row")
        div.cell(v-for="col of colsArray" :key="col" @click="cellClick(row,col)" :class="cellClass(row,col)") {{getCell(row,col).allow}}
    div
        v-btn(@click="restart") {{$t('Restart')}}
</template>

<style scoped lang="sass">
#miner
    .row
        display: flex
        flex-wrap: wrap
        .cell
            width: 80px
            height: 80px
            border: 1px solid gray
        .ship
            background-color: green

</style>