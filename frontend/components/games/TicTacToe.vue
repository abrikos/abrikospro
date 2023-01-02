<template lang="pug">
  div
    div.field
      div(v-for="index in game.params.fieldSize" @click="doTurn(index)" v-bind:class="{player: isPlayer(index), bot:isBot(index), winner: isWinner(index)}") {{index}}
</template>

<script>
export default {
  name: "TicTacToe",
  props: ['game', 'loadData'],
  data() {
    return {
      cellWidth: 40,
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
    async doTurn(index) {
      await this.$axios.$put('/game/' + this.game.id + '/turn', {index})
      await this.loadData()
    },
    isPlayer(index) {
      return this.game.data.cells.find(c => c.index === index)?.player === 'player'
    },
    isBot(index) {
      return this.game.data.cells.find(c => c.index === index)?.player === 'bot'
    },
    isWinner(index) {
      return this.game.data.winner && this.game.data.winner.includes(index)
    }
  }
}
</script>

<style scoped lang="sass">
.field
  display: flex
  width: v-bind('fieldWidth')
  flex-wrap: wrap

  div
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    width: v-bind('cellWidthPx')
    height: v-bind('cellWidthPx')
    border: 1px solid silver

  .winner
    border-color: red
    border-width: 4px
  .player
    background-color: #3e8ddd

  .bot
    background-color: sandybrown
</style>