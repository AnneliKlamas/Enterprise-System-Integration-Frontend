import * as productApi from "./product-api"

export const productStore = {
    namespaced: true,

    state() {
        return {
            products: []
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },
    },

    actions: {
        async fetchProducts({commit}) {
            let products = await productApi.getProducts()
            commit("setProducts", products)
        }
    },

    getters: {
        getProducts(state){
            return state.products
        }
    }
}
