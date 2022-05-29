<template>
  <div class="form-group">
    <label>Username</label>
    <input v-model="user.name" type="text" class="form-control">
  </div>
  <div class="form-group">
    <label>Password</label>
    <input v-model="user.password" type="text" class="form-control">
  </div>
  <div class="form-group">
    <label>Role</label><br>
    <select v-model="user.role">
      <option v-for="role in roles" :value="role">{{role}}</option>
    </select>
  </div>
  <button @click="createUser(this.user)" class="btn btn-primary">Submit</button>
</template>

<script>
import { createUser } from "../stores/user-api"
import { Role } from "../_helpers/role"

export default {
  name: "CreateUserView",

  data() {
    return {
      user: {id: 0, name: "", password: "", role: ""},
      roles: Role
    }
  },

  methods:{
    async createUser(user){
      await createUser(user)
        .then(response => this.$router.push('/admin/users'))
        .catch(error => console.log(error));
    }
  }
}
</script>

<style scoped>

</style>
