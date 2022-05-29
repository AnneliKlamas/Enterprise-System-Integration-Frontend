import store from "../stores/store-config";

export function getProduct(id) {
    let products = store.getters['productStore/getProducts']
    return products.find(x => x.id === id)
}