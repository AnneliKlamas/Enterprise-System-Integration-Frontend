<template>
  <div>
    <form @submit.prevent="login">
        <h3>Log in</h3>
        <div class="form-group">
            <label>Username</label>
            <input type="username" v-model="username" class="form-control"/>
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="password" class="form-control"/>
        </div>
        <button type="submit" class="btn">Log in</button>
    </form>
  </div>
</template>
<script>
import auth from '../_helpers/auth';
export default {
  name: 'Login',
  data: function() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login:  function() {
      auth.login(this, this.username, this.password, this.$route.query.returnUrl || '/');
    }
  }
}
</script>