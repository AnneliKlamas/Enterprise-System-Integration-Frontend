<template>
  <h2>{{$t("products.productsList")}}</h2>
  <router-link v-if="orderId"  :to="'/cart/' + orderId"> Click here to see your cart</router-link>
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
      <td>
        <input v-model="quantity" class="form-control" type="number"/>
      </td>
      <td>
        <button @click="addProduct(product.id)" >{{$t("products.add")}}</button>
      </td>
    </tr>
  </table>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import * as productsApi from "../stores/product-api";

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers("productStore")
export default {
  name: "WarehouseView",

  data() {
    return {
      columns: ["ID", "NAME", "CATEGORY", "PRICE"],
      quantity: 1,
      product: null,
    }
  },

  computed: {
    ...mapGetters({
      products: "getProducts",
      orderId: "getOrderId"
    })
  },

  beforeMount() {
    this.fetchProducts()
  },

  methods:{
    ...mapActions({
      fetchProducts: "fetchProducts"
    }),

    ...mapMutations({
      setOrderId: "setOrderId"
    }),


    async addProduct(id) {
      if(this.orderId === null) {
        await productsApi.createOrder().then((response) =>
            this.setOrderId(response.data))
      }
      await productsApi.addProduct(id, this.orderId, this.quantity)
      this.quantity=1
    }
  }
}
</script>

<style scoped>

</style>
