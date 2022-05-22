import { createStore } from "vuex";
import { productStore } from "./product-store";
import {orderStore} from "./order-store";

export default createStore({
    modules: {
        productStore: productStore,
        orderStore: orderStore,
    },
})
