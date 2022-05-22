<template>
    <div class="form-group">
      <label>{{$t("register.name")}}</label>
      <input v-model="name" type="text" class="form-control" :placeholder="$t('register.enterName')">
    </div>
    <div class="form-group">
      <label>{{$t("register.password")}}</label>
      <input v-model="password" type="password" class="form-control" :placeholder="$t('register.enterPassword')">
    </div>
    <div class="form-group">
      <label>{{$t("register.role")}}</label>
      <input v-model="role" type="text" class="form-control" :placeholder="$t('register.enterRole')">
    </div>
    <button @click="submit" class="btn btn-primary">{{ $t("register.submit") }}</button>
</template>

<script>
import * as registrationApi from "../stores/registration-api"

export default {
  name: "RegistrationView",

  data() {
    return {
      name: null,
      password: null,
      role: null,
    }
  },

  methods: {
    async submit() {
      const user = {
        password: this.password,
        name: this.name,
        role: this.role
      }
      await registrationApi.createUser(user).then(() => this.$router.push("/login"))
    }
  }
}
</script>

<style scoped>

</style>
