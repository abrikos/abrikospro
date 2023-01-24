<template>
  <v-toolbar-items class="hidden-sm-and-down">
    <v-menu rounded="true" open-on-hover offset-y transition="slide-x-transition" bottom right v-if="user?.isAdmin">
      <template v-slot:activator="{ on, attrs }">
        <v-btn id v-bind="attrs" v-on="on">
          Admin
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item to="/admin/users">
          <v-list-item-title>Users list</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-btn to="/cabinet/settings" v-if="user">
      {{ user.email || user.fullName }} &nbsp;
      <v-img :src="user.photo" max-width="30" max-height="30" v-if="user.photo"/>
    </v-btn>
    <v-btn to="/user/signup" v-if="!user" id>{{$t('Signup')}}</v-btn>
    <v-btn to="/user/login" v-if="!user" id>{{$t('Login')}}</v-btn>
    <v-btn @click="logout" v-if="user" id>{{$t('Logout')}}</v-btn>
    <v-btn icon @click="switchTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <LangSwitcher/>
  </v-toolbar-items>
</template>

<script>
export default {
  name: "CommonMenu",
  computed: {
    user() {
      return this.$store.getters.getLoggedUser
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
    }
  },

}
</script>

<style scoped>

</style>