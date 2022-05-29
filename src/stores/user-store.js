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
        setLoggedOut(state) {
            state.users = null
        }
    },

    actions: {
        async fetchUsers({commit}) {
            let response = await userApi.getUsers()
            commit("setUsers", response.data)
        },
        logOut({commit}) {
            commit("setLoggedOut");
        }
    },

    getters: {
        getUsers(state){
            return state.users
        }
    }
}
