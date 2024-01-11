<script setup lang="ts">
import mine from './mine.svg'

const mineUrl = `url("${mine}")`
const route = useRoute()
const router = useRouter()
const {data, refresh} = await useNuxtApp().$GET(`/minesweeper/${route.params.id}`)
const rowsArray = Array(data.value.rows).fill(null).map((_, i) => i)
const colsArray = Array(data.value.cols).fill(null).map((_, i) => i)
const config = useRuntimeConfig()

function idx(row: number, col: number) {
    return row * data.value.rows + col
}

function cellClass(row: number, col: number) {
    if (data.value.mines.includes(idx(row, col))) {
        if (data.value.finished === -1) return 'mine-exploded'
        if (data.value.finished === 1) return 'hidden mine-saved'
        return 'cheat'
    }
    if (data.value.turns.includes(idx(row, col))) return 'turn'
    return 'hidden'
}
const colors = ['','red','green','blue','yellow','brown','cyan','magenta','pink']
function cellStyle(row:number, col:number){
    const count = data.value.counts.find((i: [number,number]) => i[0] === idx(row, col))
    if(count) return `color:${colors[count[1]]}`
}

async function cellClick(row: number, col: number) {
    if (data.value.finished) return
    if (data.value.turns.includes(idx(row, col))) return
    await useNuxtApp().$POST(`/minesweeper/${data.value.id}/turn`, {idx: idx(row, col)})
    await refresh()
}

async function restart() {
    const {data: newGame} = await useNuxtApp().$PUT(`/minesweeper/create`, data.value)
    await router.push(`/minesweeper/${newGame.value.id}`)
}

function getCount(row: number, col: number) {
    const i = idx(row, col)
    const found = data.value.counts.find((c: [number, number]) => c[0] === i)
    return found && found[1]
}

const theme = 'red'

</script>

<template lang="pug">
div.text-red(v-if="data.finished===-1") {{$t('Game over')}}
div.text-green(v-if="data.finished===1") {{$t('Win')}}
div#miner
    div.row(v-for="row of rowsArray" :key="row")
        div.cell(v-for="col of colsArray" :key="col" @click="cellClick(row,col)" :class="cellClass(row,col)" :style="cellStyle(row,col)") {{getCount(row,col)}}
    div
        v-btn(@click="restart") {{$t('Restart')}}
</template>

<style scoped lang="sass">
#miner
    .row
        display: flex
        flex-wrap: wrap

        .cell
            width: 40px
            height: 40px
            background-color: silver
            display: flex
            justify-content: center
            align-items: center
            font-weight: bolder
        .turn
            border: 1px solid gray

        .cheat
            border: 1px solid red
            //opacity: .2
        .mine-exploded
            background-color: red
            border: 1px solid gray
            background-image: v-bind('mineUrl')
            background-size: 80%
            background-position: center

        .hidden
            border-style: solid
            border-width: 3px
            border-top-color: white
            border-right-color: gray
            border-bottom-color: gray
            border-left-color: white

        .mine-saved
            background-image: v-bind('mineUrl')
            background-size: 80%
            background-position: center

</style>