import { Backend } from "../axios-config"
import auth from "../_helpers/auth";

export const getProducts = () => {
    return Backend.get("products", {
        headers: auth.getHeader()
    })
};

export const addProduct = (itemId, orderId, quantity) => {
    return Backend.post("product-entry/add", { },{
        headers: auth.getHeader(),
        params: { itemId: itemId, orderId: orderId, quantity: quantity }
    })
};

export const createOrder = (products, deliveryDate, clientId, address ) => {
    return Backend.post("order/create", { products: products } ,{
        headers: auth.getHeader(),
        params: {
            deliveryTime: deliveryDate,
            clientId: clientId,
            address: address
        }
    })
};

export const updateProduct = (id, product) => {
    return Backend.post(`products/${id}`, product,{
        headers: auth.getHeader(),
    })
};

export const createProduct = (product) => {
    return Backend.post("products/",  product,{
        headers: auth.getHeader(),
    })
};


export const getOrder = (orderId) => {
    return Backend.get(`order/${orderId}`, {
        headers: auth.getHeader(),
        params: { address: "fake address", deliveryTime: "2007-12-03T10:15:30+01:00" }})
}

export const getClientOrders = (id) => {
    return Backend.get(`order/client/${id}`, {
        headers: auth.getHeader()
    })
}





