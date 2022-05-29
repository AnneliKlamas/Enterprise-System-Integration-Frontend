<template>
  <div class="form-group">
      <label>Id</label>
      <input v-model="user.id" type="text" disabled class="form-control">
    </div>
    <div class="form-group">
      <label>Username</label>
      <input v-model="user.name" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Role</label><br>
      <select v-model="user.role">
        <option v-for="role in roles" :value="role">{{role}}</option>
      </select>
    </div>
    <button @click="updateUser(this.user.id, this.user)" class="btn btn-primary">Submit</button>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import { getUserById, updateUser } from "../stores/user-api"
import { Role } from "../_helpers/role"

const { mapGetters, mapActions } = createNamespacedHelpers("userStore")

export default {
  name: "UserView",

  data() {
    return {
      user: {id: 0, name: "", role: ""},
      roles: Role
    }
  },

  async beforeMount() {
    await getUserById(this.$route.params.id)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.log(error);
      })
    
  },

  methods:{
    async updateUser(id, user){
      await updateUser(id, user)
        .then(response => this.$router.push('/admin/users'))
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped>

</style>
