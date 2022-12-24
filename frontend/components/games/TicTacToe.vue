<template lang="pug">
  div
    table
      tr(v-for="row in game.params.rows")
        td(v-for="col in game.params.cols" @click="doTurn(row,col)" v-bind:class="{ active: isActive(row,col) }")  {{row}} {{col}}
</template>

<script>
export default {
  name: "TicTacToe",
  props: ['game', 'loadData'],
  methods:{
    async doTurn(row,col){
      await this.$axios.$put('/game/'+this.game.id+'/turn', {row,col})
      await this.loadData()
    },
    isActive(row,col){
      return this.game.data.cells.find(c=>c.row===row && c.col ===col)
    }
  }
}
</script>

<style scoped lang="sass">
td
  cursor: pointer
td.active
  background-color: #3e8ddd
</style>