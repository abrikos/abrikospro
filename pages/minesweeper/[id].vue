<script setup lang="ts">
import mine from './mine.svg'
import {storeToRefs} from "pinia";
import {useAuthStore} from "~/store/auth-store";
import type {IUser} from "~/server/models/user.model";

const {loggedUser} = storeToRefs(useAuthStore()) as unknown as { loggedUser: IUser }
const mineUrl = `url("${mine}")`
const route = useRoute()
const router = useRouter()
const {data: game, refresh} = await useNuxtApp().$GET(`/minesweeper/${route.params.id}`)
const {data: prize, refresh: refreshPrize} = await useNuxtApp().$GET(`/ethereum/prize`)
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
    if (game.value.finished === 1) return 'playable mine-saved'
    return 'cheat'
  }
  if (game.value.turns.includes(idx(row, col))) return 'turn'
  return 'playable'
}

const colors = ['', 'red', 'green', 'blue', 'yellow', 'brown', 'cyan', 'magenta', 'pink']

function cellStyle(row: number, col: number) {
  const count = game.value.counts.find((i: [number, number]) => i[0] === idx(row, col))
  const color = count ? colors[count[1]] : ''
  const width = cellSize.value + 'px'
  const height = cellSize.value + 'px'
  return {color, width, height}
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
  await refreshPrize()
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

const smileIcon = computed(() => {
  return game.value.finished === 1 ? 'mdi-emoticon-cool-outline' : game.value.finished === -1 ? 'mdi-emoticon-dead-outline' : 'mdi-emoticon-neutral-outline'
})

</script>

<template lang="pug">
q-toolbar
  q-toolbar-title {{$t('Minesweeper')}}
div#field(:style="{width:fieldSize+'px', padding: fieldPadding+'px'}")
  div#header(:style="{borderWidth:fieldBorder+'px'}")
    div.counter {{time}}
    div#smile(@click="restart")
      //v-btn(:icon="smileIcon" size="x-small" color="yellow" )
      q-icon(color="black" :name="smileIcon")
    div.counter {{game.turn}}
  div#field-border(:style="{borderWidth:fieldBorder+'px'}")
    div#miner
      div.row(v-for="row of rowsArray" :key="row")
        div.cell(v-for="col of colsArray" :key="col" @click="cellClick(row,col)" :class="cellClass(row,col)" :style="cellStyle(row,col)") {{getCount(row,col)}}
div.text-red(v-if="game.finished===-1") {{$t('Game over')}}
div.text-green(v-if="game.finished===1") {{$t('Win')}}
div(v-if="config.public.ethereumNet")
  div(v-if="!loggedUser") {{$t('If you register, you can receive rewards for winnings')}}
    UserLogin
  div(v-else-if="!loggedUser.ethAddress") {{$t('If you provide a wallet address, you can receive rewards for winnings')}}
    NuxtLink.mx-2(to="/user/cabinet") {{$t('Cabinet')}}
  div(v-else) {{$t('For winning you will receive')}}
    strong.mx-1.text-green ~{{prize}} ETH
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

    #smile
      cursor: pointer
      width: 50px
      padding: 1px
      display: flex
      justify-content: center
      background-color: yellow
      border-radius: 12px
      border: 1px solid gray

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

    .playable
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
