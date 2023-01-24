<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="15"
        class="row-pointer"
        style="cursor: pointer"
    >
      <template v-slot:no-data>
        Ни чего не найдено
      </template>
      <template v-slot:item.controls="{item}">
        <div style="text-align: right">
        <v-btn class="mx-2" small :color="item.isAdmin ? 'red' : 'silver' " @click="switchRole(item)">
          {{ item.isAdmin ? $t('Revoke admin') : $t('Make admin') }}
        </v-btn>
        <v-btn class="mx-2" small :color="item.blocked ? 'warning' : 'silver' " @click="block(item)">
          {{ item.blocked ? $t('Unblock') : $t('Block') }}
        </v-btn>
        <v-btn class="mx-2" small @click="deleteUser(item)" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        </div>
      </template>
      <template v-slot:header="props">
        <tr>
          <td>
            <v-text-field
                hide-details
                :label="$t('Search email')"
                outlined flat dense class="table-filter"
                v-model="filter"
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import layout from '~/middleware/layouts'
export default {
  layout,
  name: "users",
  data() {
    return {
      filter:'',
      usersFound: [],
      headers: [
        {text: 'e-mail', value: 'email'},
        {text: this.$t('Full name'), value: 'fullName'},
        {text: this.$t('Registration date'), value: 'date'},
        {text: this.$t('Last login'), value: 'loggedDate'},
        {text: '', value: 'controls'},
      ]
    }
  },
  computed:{
    users(){
      return this.usersFound.filter(u=>u.email ? u.email.match(this.filter) : true)
    }
  },
  created() {
    this.reloadList()
  },
  methods: {
    async reloadList() {
      this.usersFound = await this.$axios.$get('/admin/users')

    },
    handleClick(e) {
      console.log(e)
    },
    switchRole(user) {
      this.$axios.$post('/admin/switch-role', user)
          .then(this.reloadList)
    },
    block(user) {
      this.$axios.$get(`/admin/user/${user.id}/block`)
          .then(this.reloadList)
    },
    deleteUser(user) {
      if(!confirm(`Удалить пользователя ${user.email}`)) return
      this.$axios.$get(`/admin/user/${user.id}/delete`)
          .then(this.reloadList)
    }
  }
}
</script>

<style scoped>

</style>