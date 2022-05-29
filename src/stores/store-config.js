import { createStore } from "vuex";
import { authStore } from "./auth-store";
import { productStore } from "./product-store";
import { userStore } from "./user-store";
import createPersistedState from 'vuex-persistedstate';
import {orderStore} from "./order-store";
import {clientStore} from "./client-store";

export default createStore({
    modules: {
        productStore: productStore,
        authStore: authStore,
        userStore: userStore,
        orderStore: orderStore,
        clientStore: clientStore
    },
    plugins: [createPersistedState()]
});
