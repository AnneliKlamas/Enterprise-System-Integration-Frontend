import { createStore } from "vuex";
import { authStore } from "./auth-store";
import { productStore } from "./product-store";
import createPersistedState from 'vuex-persistedstate';

export default createStore({
    modules: {
        productStore: productStore,
        authStore: authStore
    },
    plugins: [createPersistedState()]
});
