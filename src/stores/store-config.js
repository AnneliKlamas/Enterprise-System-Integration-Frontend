import { createStore } from "vuex";
import { authStore } from "./auth-store";
import { productStore } from "./product-store";
import createPersistedState from 'vuex-persistedstate';
import {orderStore} from "./order-store";

export default createStore({
    modules: {
        productStore: productStore,
        orderStore: orderStore,
        authStore: authStore
    },
    plugins: [createPersistedState()]
});
