<template>
  <h2 class="m-4">Checkout</h2>
  <h5 class="ms-4">Add address: </h5>
  <input v-model="address" class="form-control ms-4" type="text" />
  <h5 class="ms-4">Pick a date: </h5>
  <Datepicker class="ms-4" v-model="date" />
  <button class="m-4 btn btn-success" @click="createOrder">Confirm</button>
</template>

<script>
import { computed, ref, defineAsyncComponent } from 'vue';
const MonthYear = defineAsyncComponent(() => import('./CheckoutView.vue'));
import { createNamespacedHelpers } from "vuex";
const { mapGetters} = createNamespacedHelpers("productStore")
const { mapGetters: mapAuthGetters} = createNamespacedHelpers("authStore")
const { mapGetters: mapProductGetters, mapMutations: mapProductMutations } = createNamespacedHelpers("productStore")

import * as productApi from "../stores/product-api.js"

export default {
  name: "CheckoutView",

  setup() {
    const date = ref();

    // Return from computed as it is imported
    const monthYear = computed(() => MonthYear);

    return {
      date,
      monthYear
    }
  },

  data() {
    return {
      address: null,
    }
  },

  computed: {
    ...mapGetters({
      products: "getOrderProducts",
    }),
    ...mapAuthGetters({
      clientId: "getClientId"
    }),
    ...mapProductGetters({
      orderProducts: "getOrderProducts",
      totalPrice: "getTotalPrice",
    }),
  },

  methods: {
    ...mapProductMutations({
      cleanup: "removeAllOrderProducts",
    }),
    createOrder() {
      productApi.createOrder(this.products, this.date, this.clientId, this.address )
      this.cleanup()
    }
  }
}
</script>

<style scoped>

</style>
