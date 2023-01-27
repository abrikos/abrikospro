<template lang="pug">
  div.index
    h1 {{$t('app_description')}}
    a( href='https://play.google.com/store/apps/details?id=ru.fns.billchecker&hl=ru&gl=US&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target="_blank")
      img(alt='Доступно в Google Play' src='/googleplay_RU.png')
    hr
    i18n(path="index_info_logged" tag="label" v-if="user")
      router-link(to="/receipt/view") {{$t('Checks')}}
    i18n(path="index_info_guest" tag="label" v-if="!user")
      router-link(to="/user/login") {{$t('Login')}}

  //div.index-logo
    img(src="/logo.svg")

</template>

<script>
import layout from '~/middleware/layouts'

export default {
  auth: false,
  layout,
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    },
    background(){
      return this.$vuetify.theme.isDark ? 'black' : 'white'
    }
  },
  data() {
    return {
      form: {},
      list: [],
      departments: []
    }
  },

  methods: {

  },
  created() {

  }

}
</script>

<style lang="sass">
.index
  text-align: center
  img
    width: 200px

//img
  height: 70vh
.index-logo
  //border: 1px solid red
  //background: v-bind(background)
  width: 100%
  height: 80vh
  display: flex
  align-items: center
  justify-content: center
</style>
