<template>
  <div>
    GAMES
    <div v-for="(game,i) of games" :key="i">
      <span class="link" @click="goTo(game)">{{$t(game.label)}}</span>
    </div>
  </div>
</template>

<script>
import layout from '~/middleware/layouts'
export default {
  name: "game-index",
  layout,
  data(){
    return {
      games:[]
    }
  },
  created(){
    this.loadGames()
  },
  methods:{
    async goTo(game){
      const created = await this.$axios.$get('/game/create/'+game.name)
      this.$router.push('/game/'+created.id)
    },
    async loadGames(){
      this.games = await this.$axios.$get('/game/list')
    }
  }
}
</script>

<style scoped lang="sass">
.link
  cursor: pointer
</style>