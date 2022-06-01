<template>
  <h2>Warehouse</h2>
  <router-link v-if="orderId"  :to="'/cart/' + orderId"> Click here to see your cart</router-link>
  <table class="table">
    <tr>
      <th v-for="(column, index) in columns" :key="index">
        {{$t("products.columns."+column)}}
      </th>
    </tr>
    <tr v-if="newProduct">
      <td></td>
      <td>
        <input v-model="newProductName" type="text" class="form-control">
      </td>
      <td>
        <input v-model="newProductCategory" type="text" class="form-control">
      </td>
      <td>
        <input v-model="newProductPrice" type="number" class="form-control">
      </td>
      <td>
        <button @click="submitNewProduct" class="btn btn-outline-success" >Add</button>
      </td>
    </tr>
    <tr v-for="(product, index) in products" :key="index">
      <td>{{ product.id }}</td>
      <td v-if="updateIndex!==index">{{ product.name }}</td>
      <td v-else>
        <input v-model="updateProductName" type="text" class="form-control">
      </td>
      <td v-if="updateIndex!==index">{{ product.category }}</td>
      <td v-else>
        <input v-model="updateProductCategory" type="text" class="form-control">
      </td>
      <td v-if="updateIndex!==index">{{ product.price }}</td>
      <td v-else>
        <input v-model="updateProductPrice" type="number" class="form-control">
      </td>
      <td v-if="updateIndex!==index">
        <button  @click="updateProduct(index, product)" class="btn btn-outline-success" >Update</button>
      </td>
      <td v-else>
        <button  @click="updateProductInfo(product.id)" class="btn btn-outline-success" >Update</button>
      </td>
    </tr>
  </table>
  <button v-if="!newProduct" @click="addProduct()" class="btn btn-outline-success" >Add</button>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
import * as productApi from "../stores/product-api"

const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers("productStore")
export default {
  name: "WarehouseView",

  data() {
    return {
      columns: ["ID", "NAME", "CATEGORY", "PRICE"],
      product: null,
      newProduct: false,
      newProductName: null,
      newProductCategory: null,
      newProductPrice: null,
      updateIndex: null,
      updateProductName: null,
      updateProductCategory: null,
      updateProductPrice: null,
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

    addProduct() {
      this.newProduct = true
    },

    async submitNewProduct() {

      const product = {
        name: this.newProductName,
        category: this.newProductCategory,
        price: this.newProductPrice
      }

      await productApi.createProduct(product)
      await this.fetchProducts()

      this.newProduct = false
      this.newProductName = null
      this.newProductCategory = null
      this.newProductPrice = null
    },

    updateProduct(index, product) {
      this.updateProductName = product.name
      this.updateProductCategory = product.category
      this.updateProductPrice = product.price
      this.updateIndex = index
    },

    async updateProductInfo(id) {
      const product = {
        name: this.updateProductName,
        category: this.updateProductCategory,
        price: this.updateProductPrice
      }

      await productApi.updateProduct(id, product)
      await this.fetchProducts()

      this.updateIndex = null
      this.updateProductName = null
      this.updateProductCategory = null
      this.updateProductPrice = null

    }
  }
}
</script>

<style scoped>

</style>
