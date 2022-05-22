export const authStore = {
    namespaced: true,

    state() {
        return {
            username: "",
            token: "",
            roles: ""
        }
    },

    mutations: {
        setLoggedIn(state, user) {
          state.username = user.username,
          state.token = user.token,
          state.roles = user.roles
        },
        setLoggedOut(state) {
          state.username = null,
          state.token = null,
          state.roles = null
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
        isAuthenticated(state) {
          return !!state.token;
        },
        isAdmin(state) {
          return state.roles == 'ADMIN'
        }
    }
}
