import * as productApi from "./product-api"

export const orderStore = {
    namespaced: true,

    state() {
        return {
            order: null
        }
    },

    mutations: {
        setOrder(state, order) {
            state.order = order
        },
    },

    actions: {
        async fetchOrder({commit}, orderId) {
            let response = await productApi.getOrder(orderId)
            commit("setOrder", response.data)
        }
    },

    getters: {
        getOrder(state){
            return state.order
        }
    }
}
