<template>
  <v-app>
    <v-app-bar fixed app dense class="main-menu">
      <v-app-bar-title>
        {{$t('Games')}}
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
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
  name:'default',
  components: {CommonMenu},
}
</script>

<style lang="sass">

</style>
