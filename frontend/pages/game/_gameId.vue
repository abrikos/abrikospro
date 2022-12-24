<template lang="pug">
  div(v-if="game")
    h1 {{$t(game.params.label)}} "{{game.name}}"
    h3 {{$t(game.params.description)}}
    TicTacToe(:game="game" :loadData="loadData")
    h4.red--text(v-if="game.data.winner") zzzz
    div {{game.data}}
</template>

<script>
import TicTacToe from "~/components/games/TicTacToe.vue";

export default {
  name: "_gameId",
  components: {TicTacToe},
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
    async loadData(){
      this.game = await this.$axios.$get('/game/view/' + this.$route.params.gameId)
    }
  }
}
</script>

<style scoped>

</style>