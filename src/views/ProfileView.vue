<template>
  <div id="clientNameForm">
    <div class="form-group">
      <label>{{$t("clients.name")}}</label>
      <input v-model="clientName" type="text" class="form-control" :placeholder="getClientName">
    </div>
    <button @click="submit" class="btn btn-primary">{{ $t("clients.submit") }}</button>
  </div>
</template>

<script>
import {createNamespacedHelpers} from "vuex";
import * as clientApi from "../stores/client-api";
import auth from "../_helpers/auth";

const { mapGetters, mapActions} = createNamespacedHelpers("clientStore")
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
    })
  },

  beforeMount() {
    this.getClient()
  },

  methods:{
    ...mapActions(["fetchClient"]),
    getClient: async function() {
      await clientApi.getClient(auth.getClientId()).then(response => {
          this.fetchClient({
            name: response.data.name,
            orderList: response.data.orderList
          })
        })
      },
    async submit() {
      console.log(this.clientName)
      await clientApi.updateClient(this.clientName)
      location.reload()
    }
  }
}
</script>

<style scoped>

</style>