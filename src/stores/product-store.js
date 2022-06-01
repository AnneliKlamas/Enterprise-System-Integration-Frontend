import * as productApi from "./product-api"

export const productStore = {
    namespaced: true,

    state() {
        return {
            products: [],
            orderId: null,
            orderProducts: [],
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },
        setOrderId(state, id) {
            state.orderId = id
        },
        setLoggedOut(state) {
            state.products = null,
            state.orderId = null
        },
        addProductToOrderProducts(state, product) {
            let hasAlreadyThatItem = false;
            state.orderProducts.forEach((p) => {
                if(p.id === product.id) {
                    p.quantity += product.quantity
                    hasAlreadyThatItem = true
                }
            })
            if (!hasAlreadyThatItem) {
                state.orderProducts.push(product)
            }
        },
        removeProductFromOrder(state, id) {
            state.orderProducts = state.orderProducts.filter((p) => p.id!==id)
        },
        changeOrderProductQuantity(state, {id, quantity}) {
            state.orderProducts.forEach((p) => {
                if(p.id === id) {
                    p.quantity = quantity
                }
            })
        },
        removeAllOrderProducts(state) {
            state.orderProducts = []
        }
    },

    actions: {
        async fetchProducts({commit}) {
            let response = await productApi.getProducts()
            commit("setProducts", response.data)
        },
        logOut({commit}) {
            commit("removeAllOrderProducts")
            commit("setLoggedOut");
        }
    },

    getters: {
        getProducts(state){
            return state.products
        },
        getOrderId(state) {
            return state.orderId;
        },
        getOrderProducts(state) {
            return state.orderProducts
        },
        getTotalPrice(state) {
            let total = 0;
            state.orderProducts.forEach((p) => total += p.price * p.quantity )

            return Math.round(total*100)/100
        }
    }
}
