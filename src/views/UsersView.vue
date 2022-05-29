<template>
  <h2>{{$t("users.usersList")}}</h2>
  <table class="table">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{$t("users.columns."+column)}}
      </th>
    </tr>
    <tr v-for="(user, index) in users" :key="index">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.role }}</td>
      <router-link :to="`/admin/users/${user.id}`">Edit</router-link>
    </tr>
  </table>
  <router-link to="/admin/users/create">Create user</router-link>
</template>

<script>
import { createNamespacedHelpers } from "vuex"

const { mapGetters, mapActions } = createNamespacedHelpers("userStore")

export default {
  name: "UsersView",

  data() {
    return {
      columns: ["id", "name", "role"]
    }
  },

  computed: {
    ...mapGetters({
      users: "getUsers",
    })
  },

  beforeMount() {
    this.fetchUsers()
  },

  methods:{
    ...mapActions({
      fetchUsers: "fetchUsers"
    })
  }
}
</script>

<style scoped>

</style>
