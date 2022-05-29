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
import { createNamespacedHelpers } from 'vuex';
import { Backend } from '../axios-config';

const { mapActions} = createNamespacedHelpers('authStore');

export default {
  name: 'Login',
  data: function() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapActions(['logIn']),
    login:  function() {
      let token = btoa(this.username + ":" + this.password);

        // do not forget to change the port to the right one, where your Spring Boot Application is running
      Backend.get("login", { headers: { 'Authorization': `Basic ${token}` } })
        .then(response => {

            this.logIn({
              username: this.username,
              token: token,
              roles: response.data[0],
              id: response.data[1][0],
              clientId: response.data[1][1]
            });

            this.$router.push({path: this.$route.query.returnUrl || '/'});
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
}
</script>