import * as productApi from "./product-api"

export const orderStore = {
    namespaced: true,

    state() {
        return {
            order: null,
            orderProducts: []
        }
    },

    mutations: {
        setOrder(state, order) {
            state.order = order
        },
        setLoggedOut(state) {
            state.order = null
        },
    },

    actions: {
        async fetchOrder({commit}, orderId) {
            let response = await productApi.getOrder(orderId)
            commit("setOrder", response.data)
        },
        logOut({commit}) {
            commit("setLoggedOut");
        }
    },

    getters: {
        getOrder(state){
            return state.order
        },
    }
}
