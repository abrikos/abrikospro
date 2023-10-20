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
        <v-btn id to="/receipt/upload">
          {{$t('Upload')}}
        </v-btn>
        <v-btn id to="/receipt/about">
          {{$t('About')}}
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
        <small> {{$t('app_description')}}</small>
        <a href='https://play.google.com/store/apps/details?id=ru.fns.billchecker&hl=ru&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank">
            <img alt='Доступно в Google Play' src='/googleplay_RU.png' width="200"/>
        </a>

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
