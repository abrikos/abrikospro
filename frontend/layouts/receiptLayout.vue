<template>
  <v-app >
    <v-app-bar fixed app dense class="main-menu">
      <v-app-bar-title>
          {{title}}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
<!--        <v-btn id to="/game">
          {{$t('Games')}}
        </v-btn>-->
        <v-btn id to="/receipt/view" v-if="user">
          {{$t('Receipts')}}
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <CommonMenu noTranslate="1"/>
    </v-app-bar>
    <v-main>
      <v-container>
                <nuxt/>
      </v-container>
    </v-main>
    <v-footer>
      Abrikos
    </v-footer>
    <SnackBar/>
  </v-app>
</template>


<script>
import CommonMenu from "~/components/CommonMenu.vue";


export default {
  head() {
    return {
      title: this.title
    };
  },
  components: {CommonMenu},
  computed: {
    title(){
      return 'Агрегатор чеков'
    },
    user() {
      return this.$store.getters.getLoggedUser
    },
  },
  created() {
    this.$i18n.setLocale('ru')
    //this.$vuetify.theme.isDark = true
    //this.$axios.$get('/build-date')        .then(res => this.buildDate = res.ctime)
  },

}
</script>

<style lang="sass">

</style>
