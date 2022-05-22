import { createStore } from "vuex";
import { authStore } from "./auth-store";
import { productStore } from "./product-store";

export default createStore({
    modules: {
        productStore: productStore,
        authStore: authStore
    },
})
