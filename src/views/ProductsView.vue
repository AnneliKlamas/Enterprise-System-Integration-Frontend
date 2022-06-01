<template class="m-4">
  <h2 class="m-4">{{$t("products.productsList")}}</h2>
  <router-link class="m-4" v-if="orderProducts.length!==0"  :to="'/cart'"> Click here to see your cart</router-link>
  <table class="table m-4">
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
        <button class="btn btn-outline-success" @click="addProduct(product)" >{{$t("products.add")}}</button>
      </td>
    </tr>
  </table>
</template>

<script>
import { createNamespacedHelpers } from "vuex"

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers("productStore")
export default {
  name: "ProductsView",

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
      orderId: "getOrderId",
      orderProducts: "getOrderProducts"
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
      setOrderId: "setOrderId",
      addProductToOrderProducts: "addProductToOrderProducts"
    }),


    addProduct(product) {
      const productWithQuantity = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: this.quantity
      };
      this.addProductToOrderProducts(productWithQuantity)
      this.quantity=1
    }
  }
}
</script>

<style scoped>

</style>
