<template>
  <h2>{{$t("products.productsList")}}</h2>
  <table class="table">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{$t("products.columns."+column)}}
      </th>
    </tr>
    <tr v-for="(product, index) in products" :key="index">
      <td>{{ product.id }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.category }}</td>
      <td>{{ product.price }}</td>
    </tr>
  </table>
</template>

<script>
import { createNamespacedHelpers } from "vuex"

const { mapGetters, mapActions } = createNamespacedHelpers("productStore")
export default {
  name: "ProductsView",

  data() {
    return {
      columns: ["ID", "NAME", "CATEGORY", "PRICE"]
    }
  },

  computed: {
    ...mapGetters({
      products: "getProducts",
    })
  },

  beforeMount() {
    this.fetchProducts()
  },

  methods:{
    ...mapActions({
      fetchProducts: "fetchProducts"
    })
  }
}
</script>

<style scoped>

</style>
