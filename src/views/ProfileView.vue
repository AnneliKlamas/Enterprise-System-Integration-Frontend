<template>
  <h1 class="m-4" v-text="$t('client.profile')"></h1>
  <div class="ms-4" id="clientNameForm">
    <div class="form-group">
      <label>{{$t("client.name")}}</label>
      <input v-model="clientName" type="text" class="form-control" :placeholder="getClientName">
    </div>
    <button @click="submit" class="btn btn-primary mt-3">{{ $t("client.submit") }}</button>
  </div>
  <div class="m-4" id="ordersTableHeader">
    <h2 v-text="$t('client.order')"></h2>
  </div>
  <div id="ordersTableBody" v-for="order in getOrders" :key="order.id">
    <table class="styled-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Location</th>
          <th>Delivery Time</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-text="order.id"></td>
          <td v-text="order.location"></td>
          <td v-text="order.deliveryTime"></td>
        </tr>
      </tbody>
    </table>
    <table class="styled-table">
      <thead>
      <tr>
        <th>Product</th>
        <th>Quantity</th>
        <th>Price</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="entry in order.productEntry" :key="entry.id">
        <td >{{getProduct(entry.productId).name}}</td>
        <td v-text="entry.quantity"></td>
        <td >{{getProduct(entry.productId).price}}</td>
      </tr>
      </tbody>
    </table>
    <br>
  </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import * as clientApi from "../stores/client-api";
import auth from "../_helpers/auth";
import {getProduct} from "../_helpers/products";

const { mapGetters, mapActions} = createNamespacedHelpers("clientStore")
const { mapGetters: mapAuthGetters} = createNamespacedHelpers("authStore")
import * as productApi from "../stores/product-api.js"

export default {
  name: "ProfileView",

  data() {
    return {
      clientName: "",
      clientOrders: []
    }
  },

  computed: {
    ...mapGetters({
      getClientName: "getName",
      getOrders: "getOrders"
    }),
    ...mapAuthGetters({
      clientId: "getClientId"
    })
  },

  async beforeMount() {
    await this.getClient()
    this.clientOrders = await productApi.getClientOrders(this.clientId)
  },

  methods:{
    ...mapActions({
      fetchClient: "fetchClient"
    }),

    getClient: async function() {
      await clientApi.getClient(auth.getClientId()).then(response => {
          this.fetchClient({
            name: response.data.name,
            orderList: response.data.orderList
          })
        })
      },
    async submit() {
      await clientApi.updateClient(this.clientName)
      location.reload()
    },
    getProduct
  }
}
</script>

<style scoped>
.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
}

.styled-table th,
.styled-table td {
  padding: 12px 15px;
}

.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

</style>
