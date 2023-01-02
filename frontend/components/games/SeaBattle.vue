<template lang="pug">
  v-row
    v-col(v-for="player of players" )
      div.battle-field
        div(v-for="cell in game.data[player]" @click="doTurn(cell)" v-bind:class="{ship: !!cell.ship, border:!!cell.border}") {{cell.ship}}
      div {{game.data[player].filter(c=>c.ship)}}
</template>

<script>
export default {
  name: "SeaBattle",
  props: ['game', 'loadData', 'doTurn'],
  data() {
    return {
      cellWidth: 40,
      players: ['player', 'bot']
    }
  },
  computed: {
    fieldWidth() {
      return this.game?.params.cols * this.cellWidth + 'px'
    },
    cellWidthPx() {
      return this.cellWidth + 'px'
    },
  },
  methods: {

  }
}
</script>

<style scoped lang="sass">
.battle-field
  display: flex
  width: v-bind('fieldWidth')
  flex-wrap: wrap

  .borderBak
    background-color: blue
    opacity: .4
  .ship
    color: red
    background-color: #7f828b
    border: none
  div
    background-color: #3e8ddd
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    width: v-bind('cellWidthPx')
    height: v-bind('cellWidthPx')
    border: 1px solid silver
</style>