import * as userApi from "./user-api"

export const userStore = {
    namespaced: true,

    state() {
        return {
            users: []
        }
    },

    mutations: {
        setUsers(state, users) {
            state.users = users
        },
    },

    actions: {
        async fetchUsers({commit}) {
            let response = await userApi.getUsers()
            commit("setUsers", response.data)
        }
    },

    getters: {
        getUsers(state){
            return state.users
        }
    }
}
