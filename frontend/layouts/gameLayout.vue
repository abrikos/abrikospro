<template>
  <v-app>
    <v-app-bar fixed app dense class="main-menu">
      <v-app-bar-title>
        {{title}}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <!--        <v-btn id to="/game">
                  {{$t('Games')}}
                </v-btn>-->
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <CommonMenu/>

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
  components: {CommonMenu},
  head() {
    return {
      title: this.title
    };
  },
  computed:{
    title(){
      return this.$t("Games")
    },
  }

}
</script>

<style lang="sass">

</style>
