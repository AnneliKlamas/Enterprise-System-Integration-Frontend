import * as userApi from "./user-api"

export const userStore = {
    namespaced: true,

    state() {
        return {
            users: [],
            user: {}
        }
    },

    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        setUser(state, user) {
          state.user = user
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
        async fetchUserById({commit}, id) {
          let response = await userApi.getUserById(id)
          commit("setUser", response.data)
        },
        logOut({commit}) {
            commit("setLoggedOut");
        }
    },

    getters: {
        getUsers(state){
          return state.users
        },
        getUser(state){
          return state.user
        }
    }
}
