<template>
  <vue-telegram-login
      v-if="bot"
      mode="callback"
      telegram-login="AbrikosGames_bot"
      @callback="yourCallbackFunction"/>
</template>

<script>
import {vueTelegramLogin} from 'vue-telegram-login'

export default {
  name: "LoginTelegram",
  components: {vueTelegramLogin},
  data() {
    return {
      bot: null
    }
  },
  methods: {
    async yourCallbackFunction(user) {
      // gets user as an input
      // id, first_name, last_name, username,
      // photo_url, auth_date and hash
      user.strategy = 'telegram'
      console.log(user)
      await this.$auth.login({data:user}).catch(e=>console.log('Login problem', e))
      if(this.$store.getters.getLoggedUser)
        await this.$router.push(this.$store.getters.getLoginRedirect)
    }
  },
  created() {
    this.$axios.$get('/telegram/bot-info')
        .then(res=>{
          this.bot = res.username
          console.log(res)
        })
  }
}
</script>

<style scoped>

</style>