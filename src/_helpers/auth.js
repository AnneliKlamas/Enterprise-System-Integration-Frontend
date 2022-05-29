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
    getId(){
        return store.getters['authStore/getId']
    }
}
