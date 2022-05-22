<template>
  <div class="form-group">
      <label>Id</label>
      <input v-model="id" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Username</label>
      <input v-model="name" type="text" class="form-control">
    </div>
    <div class="form-group">
      <label>Role</label>
      <input v-model="role" type="text" class="form-control">
    </div>
    <button @click="submit" class="btn btn-primary">Submit</button>
</template>

<script>
import { createNamespacedHelpers } from "vuex"

const { mapGetters, mapActions } = createNamespacedHelpers("userStore")

export default {
  name: "UserView",

  data() {
    return {
      id: 0,
      name: "",
      role: ""
    }
  },

  computed: {
    ...mapGetters({
      user: "getUser",
    })
  },

  beforeMount() {
    
  },

  methods:{
    ...mapActions({
      fetchUserById: "fetchUserById"
    })
  }
}
</script>

<style scoped>

</style>
