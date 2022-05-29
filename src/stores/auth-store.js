export const authStore = {
    namespaced: true,

    state() {
        return {
            username: "",
            token: "",
            roles: "",
            id: null,
            clientId: null
        }
    },

    mutations: {
        setLoggedIn(state, user) {
          state.username = user.username,
          state.token = user.token,
          state.roles = user.roles,
          state.id = user.id,
          state.clientId = user.clientId
        },
        setLoggedOut(state) {
          state.username = null,
          state.token = null,
          state.roles = null,
          state.id = null,
          state.clientId = null
        }
    },

    actions: {
        logIn({commit}, user) {
          commit("setLoggedIn", user);
        },
        logOut({commit}) {
          commit("setLoggedOut");
        }
    },

    getters: {
        getUsername(state) {
          return state.username;
        },
        getToken(state) {
          return state.token;
        },
        getRoles(state) {
          return state.roles;
        },
        getId(state){
            return state.id
        },
        getClientId(state){
            return state.clientId
        },
        isAuthenticated(state) {
          return !!state.token;
        },
        isAdmin(state) {
          return state.roles == 'ADMIN'
        }
    }
}
