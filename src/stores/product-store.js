import * as productApi from "./product-api"

export const productStore = {
    namespaced: true,

    state() {
        return {
            products: [],
            orderId: null
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        setOrderId(state, id) {
            state.orderId = id
        },
        setLoggedOut(state) {
            state.products = null,
            state.orderId = null
        }
    },

    actions: {
        async fetchProducts({commit}) {
            let response = await productApi.getProducts()
            commit("setProducts", response.data)
        },
        logOut({commit}) {
            commit("setLoggedOut");
        }
    },

    getters: {
        getProducts(state){
            return state.products
        },
        getOrderId(state) {
            return state.orderId;
        }
    }
}
