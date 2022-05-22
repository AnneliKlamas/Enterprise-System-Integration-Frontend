import * as userApi from "./user-api"

export const userStore = {
    namespaced: true,

    state() {
        return {
            users: [],
            user: []
        }
    },

    mutations: {
        setUsers(state, users) {
            state.users = users
        },
        setUser(state, user) {
          state.user = user
        }
    },

    actions: {
        async fetchUsers({commit}) {
            let response = await userApi.getUsers()
            commit("setUsers", response.data)
        },
        async fetchUserById({commit}, id) {
          console.log(id)
          let response = await userApi.getUserById(id)
          commit("setUser", response.data)
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
