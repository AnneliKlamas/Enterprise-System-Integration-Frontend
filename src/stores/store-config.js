import { createStore } from "vuex";
import { productStore } from "./product-store";

export default createStore({
    modules: {
        productStore: productStore,
    },
})
