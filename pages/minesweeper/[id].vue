<script setup lang="ts">
import mine from './mine.svg'

const mineUrl = `url("${mine}")`
const route = useRoute()
const router = useRouter()
const {data: game, refresh} = await useNuxtApp().$GET(`/minesweeper/${route.params.id}`)
const rowsArray = Array(game.value.rows).fill(null).map((_, i) => i)
const colsArray = Array(game.value.cols).fill(null).map((_, i) => i)
const config = useRuntimeConfig()

const cellSize = ref(40)
const fieldBorder = 4
const fieldPadding = 4
const fieldSize = cellSize.value * game.value.rows + fieldBorder * 2 + fieldPadding * 2

function idx(row: number, col: number) {
    return row * game.value.rows + col
}

function cellClass(row: number, col: number) {
    if (game.value.mines.includes(idx(row, col))) {
        if (game.value.finished === -1) return 'mine-exploded'
        if (game.value.finished === 1) return 'hidden mine-saved'
        return 'cheat'
    }
    if (game.value.turns.includes(idx(row, col))) return 'turn'
    return 'hidden'
}

const colors = ['', 'red', 'green', 'blue', 'yellow', 'brown', 'cyan', 'magenta', 'pink']

function cellStyle(row: number, col: number) {
    const count = game.value.counts.find((i: [number, number]) => i[0] === idx(row, col))
    const color = count ? colors[count[1]] : ''
    const width = cellSize.value + 'px'
    return {color, width, height: width}
}

const timer = ref()
const time = ref(0)

async function cellClick(row: number, col: number) {
    if (game.value.finished) {
        return
    }
    if (game.value.turns.includes(idx(row, col))) return
    if (!timer.value) {
        timer.value = setInterval(() => {
            time.value++
        }, 1000)
    }
    const {data} = await useNuxtApp().$POST(`/minesweeper/${game.value.id}/turn`, {idx: idx(row, col)})
    if (data.value.finished) {
        clearInterval(timer.value)
    }
    await refresh()
}

async function restart() {
    const {data: newGame} = await useNuxtApp().$PUT(`/minesweeper/create`, game.value)
    await router.push(`/minesweeper/${newGame.value.id}`)
}

function getCount(row: number, col: number) {
    const i = idx(row, col)
    const found = game.value.counts.find((c: [number, number]) => c[0] === i)
    return found && found[1]
}

</script>

<template lang="pug">
h1 Under construction
div#field(:style="{width:fieldSize+'px', padding: fieldPadding+'px'}")
    div#header(:style="{borderWidth:fieldBorder+'px'}")
        div.counter {{time}}
        div#smile
            v-icon(color="yellow" ) mdi-home
        div.counter {{game.turn}}
    div#field-border(:style="{borderWidth:fieldBorder+'px'}")
        div#miner
            div.row(v-for="row of rowsArray" :key="row")
                div.cell(v-for="col of colsArray" :key="col" @click="cellClick(row,col)" :class="cellClass(row,col)" :style="cellStyle(row,col)") {{getCount(row,col)}}
div.text-red(v-if="game.finished===-1") {{$t('Game over')}}
div.text-green(v-if="game.finished===1") {{$t('Win')}}
div
    v-btn(@click="restart") {{$t('Restart')}}
</template>

<style scoped lang="sass">
#field
    background-color: silver

    #header
        display: flex
        justify-content: space-between
        align-items: center
        border-style: solid
        border-left-color: gray
        border-top-color: gray
        margin-bottom: 10px
        padding: 5px

        .counter
            overflow: hidden
            width: 60px
            text-align: right
            padding: 4px
            background-color: black
            color: red
            font-weight: bolder

    #field-border
        border-style: solid
        border-left-color: gray
        border-top-color: gray

#miner
    .row
        display: flex
        flex-wrap: wrap

        .cell
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
            background-image: v-bind(mineUrl)
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