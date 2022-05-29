<template>
  <table class="table">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{$t("products.columns."+column)}}
      </th>
    </tr>
    <tr v-for="(product, index) in order.productEntry" :key="index">
      <td>{{ product.id }}</td>
      <td>{{ product.productId }}</td>
      <td>{{ product.quantity }}</td>
    </tr>
  </table>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapGetters} = createNamespacedHelpers("orderStore")
export default {
  name: "CartView",

  data() {
    return {
      columns: ["ID", "PRODUCT_ID", "QUANTITY"],
    }
  },

  computed: {
    ...mapGetters({
      order: "getOrder",
    })
  },

  async beforeMount() {
    await this.fetchOrder(this.$route.params.orderID)
  },

  methods:{
    ...mapActions({
      fetchOrder: "fetchOrder"
    }),
  }
}
</script>

<style scoped>

</style>
