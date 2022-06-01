<template>
  <div id="nav">
    <router-link to="/" class="nav-item">Home</router-link>
    <router-link to="/products" class="nav-item" v-if="isClient">Products</router-link>
    <router-link to="/warehouse" class="nav-item" v-if="isAdmin||isManager">Warehouse</router-link>
    <router-link to="/logout" class="nav-item" v-if="isLoggedIn">Logout</router-link>
    <router-link to="/profile" class="nav-item" v-if="isLoggedIn">Profile</router-link>
    <router-link to="/login" class="nav-item" v-else>Login</router-link>
    <router-link to="/admin/users" class="nav-item" v-if="isAdmin">Users</router-link>
    <router-link to="/register" class="nav-item" v-if="!isLoggedIn">Register</router-link>
    <router-link to="/cart" class="nav-item" v-if="getOrderProducts.length!==0&&isClient">Cart</router-link>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      isLoggedIn: 'authStore/isAuthenticated',
      isAdmin: 'authStore/isAdmin',
      isClient: 'authStore/isClient',
      isManager: 'authStore/isManager',
      getOrderProducts: 'productStore/getOrderProducts',
      })
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
