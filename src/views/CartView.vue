<template v-if="orderProducts" >
  <table class="table m-4">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{$t("products.columns."+column)}}
      </th>
    </tr>
    <tr v-for="(product, index) in orderProducts" :key="index">
      <td>{{ product.id }}</td>
      <td>{{ product.name }}</td>
      <td>{{ product.category }}</td>
      <td>
        <input v-model="product.quantity" class="form-control" type="number" @blur="changeQuantity(product.id, product.quantity)"/>
      </td>
      <td>{{ product.price }}</td>
      <td>
        <button @click="removeProduct(product.id)" class="btn btn-outline-danger">Remove</button>
      </td>
    </tr>
  </table>
  <h2 class="m-4" v-if="totalPrice">Total: {{totalPrice}}  </h2>
  <button @click="cancel" class="btn btn-danger ms-4">Cancel order</button>
  <button @click="goToCheckout" class="btn btn-success mx-3">Proceed to checkout</button>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters} = createNamespacedHelpers("orderStore")
const { mapGetters: mapProductGetters, mapMutations: mapProductMutations } = createNamespacedHelpers("productStore")

export default {
  name: "CartView",

  data() {
    return {
      columns: ["PRODUCT_ID", "NAME", "CATEGORY", "QUANTITY", "PRICE"],
    }
  },

  computed: {
    ...mapGetters({
      order: "getOrder",
    }),
    ...mapProductGetters({
      orderProducts: "getOrderProducts",
      totalPrice: "getTotalPrice",
    }),
  },

  methods:{
    ...mapActions({
      fetchOrder: "fetchOrder"
    }),

    ...mapProductMutations({
      removeProductFromOrder: "removeProductFromOrder",
      changeOrderProductQuantity: "changeOrderProductQuantity",
      cancelOrder: "removeAllOrderProducts",
    }),

    removeProduct(id) {
      this.removeProductFromOrder(id)
    },

    changeQuantity(id, quantity) {
      this.changeOrderProductQuantity({ id:id, quantity:quantity })
    },

    goToCheckout() {
      this.$router.push("/checkout")
    },

    cancel() {
      this.cancelOrder()
    }
  }
}
</script>

<style scoped>

</style>
