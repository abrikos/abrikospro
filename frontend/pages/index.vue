<template>
  <div class="index-logo">
    <img src="/logo.svg"/>
  </div>
</template>

<script>


export default {
  auth: false,
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
img
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
