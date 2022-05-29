export const authStore = {
    namespaced: true,

    state() {
        return {
            user: {},
            token: ""
        }
    },

    mutations: {
        setLoggedIn(state, {user, token}) {
          state.user = user,
          state.token = token
        },
        setLoggedOut(state) {
          state.user = {},
          state.token = ""
        }
    },

    actions: {
        logIn({commit}, payload) {
          commit("setLoggedIn", payload);
        },
        logOut({commit}) {
          commit("setLoggedOut");
        }
    },

    getters: {
        getUsername(state) {
          return state.user.username;
        },
        getToken(state) {
          return state.token;
        },
        getRole(state) {
          return state.user.role;
        },
        getId(state){
          return state.user.id
        },
        isAuthenticated(state) {
          return !!state.token;
        },
        isAdmin(state) {
          return state.user.role == 'ADMIN'
        }
    }
}
