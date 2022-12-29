<template lang="pug">
  div
    span {{fieldWidth}}
    div.field
      div(v-for="cell in game.data.cells" @click="doTurn(cell.index)" v-bind:class="{player: isPlayer(cell), bot:isBot(cell)}") {{cell.index}}
</template>

<script>
export default {
  name: "TicTacToe",
  props: ['game', 'loadData'],
  data(){
    return {
      cellWidth: 40,
    }
  },
  computed:{
    fieldWidth(){
      return this.game?.params.cols * this.cellWidth + 'px'
    },
    cellWidthPx(){
      return this.cellWidth + 'px'
    }
  },
  methods:{
    async doTurn(index){
      await this.$axios.$put('/game/'+this.game.id+'/turn', {index})
      await this.loadData()
    },
    isPlayer(cell){
      return this.game.data.cells.find(c=>c.index ===cell.index)?.player === 'player'
    },
    isBot(cell){
      return this.game.data.cells.find(c=>c.index ===cell.index)?.player === 'bot'
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
  .player
    background-color: #3e8ddd
  .bot
    background-color: red
</style>