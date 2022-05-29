export const clientStore = {
    namespaced: true,

    state() {
        return {
            name: "",
            orderList: []
        }
    },

    mutations: {
        setClient(state, client) {
            state.name = client.name,
            state.orderList = client.orderList
        },
        setLoggedOut(state) {
            state.name = "",
            state.orderList = []
        }
    },

    actions: {
        async fetchClient({commit}, client) {
            commit("setClient", client)
        },
        logOut({commit}) {
            commit("setLoggedOut");
        }
    },

    getters: {
        getName(state){
            return state.name
        },
        getOrders(state) {
            return state.orderList;
        }
    }
}