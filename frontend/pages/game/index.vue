<template>
  <div>
    GAMES
    <div v-for="(game,i) of $gameList()" :key="i">

      <router-link :to="game.to">{{game.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "game-index",
  data(){
    return {
      games:[]
    }
  },
  created(){
    this.loadGames()
  },
  methods:{
    async loadGames(){
      this.games = await this.$axios.$get('/game/list')
    }
  }
}
</script>

<style scoped>

</style>