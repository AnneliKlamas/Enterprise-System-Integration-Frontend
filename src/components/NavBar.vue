<template>
  <div id="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/products" class="nav-item">Products</router-link>
    <router-link to="/logout" class="nav-item" v-if="isLoggedIn">Logout</router-link>
    <router-link to="/login" class="nav-item" v-else>Login</router-link>
  </div>

</template>

<script>
import auth from '../_helpers/auth'

export default {
  name: 'NavBar',
  computed: {
    isLoggedIn: function(){return auth.isAuthenticated()}
  }
}
</script>

<style>
.nav {
  display: flex;
  flex-direction: row;
}
.nav-item {
  margin: 10px;
}
</style>