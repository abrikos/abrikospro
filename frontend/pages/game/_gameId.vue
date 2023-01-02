<template lang="pug">
  div(v-if="game")
    h1 {{$t(game.params.label)}} "{{game.name}}"
    h3 {{$t(game.params.description)}}
    TicTacToe(:game="game" :loadData="loadData" :doTurn="doTurn" v-if="game.type==='tictactoe'" )
    SeaBattle(:game="game" :loadData="loadData" :doTurn="doTurn" v-if="game.type==='seabattle'" )
    h4.red--text(v-if="game.data.winner") Winner
    v-btn(@click="newGame") New Game

</template>

<script>
import TicTacToe from "~/components/games/TicTacToe.vue";
import SeaBattle from "~/components/games/SeaBattle.vue";

export default {
  name: "gameById",
  components: {SeaBattle, TicTacToe},
  data() {
    return {
      game: null,
      params: null
    }
  },
  async fetch() {
    await this.loadData()
  },
  methods:{
    async doTurn(body) {
      await this.$axios.$put('/game/' + this.game.id + '/turn', body)
      await this.loadData()
    },
    async newGame(){
      await this.$axios.$get(`/game/${this.$route.params.gameId}/restart/`)
      await this.loadData()
    },
    async loadData(){
      this.game = await this.$axios.$get('/game/view/' + this.$route.params.gameId)
    }
  }
}
</script>

<style scoped>

</style>