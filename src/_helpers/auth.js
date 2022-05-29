import store from "../stores/store-config";

export default {
    getHeader() {
        const userToken = store.getters['authStore/getToken'];

        if (userToken) {
            return {'Authorization': 'Basic ' + userToken};
        } else {
            return {};
        }
    },
    getClientId(){
        return store.getters['authStore/getClientId']
    },
    getUser(){
        return store.getters['authStore/getUser']
    }
}
