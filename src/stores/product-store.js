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
            let response = await productApi.getProducts()
            commit("setProducts", response.data)
        }
    },

    getters: {
        getProducts(state){
            return state.products
        }
    }
}
