import { Backend } from "../axios-config"

export const getProducts = () => {
    return Backend.get("products", {
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('user-token')
        }
    })
};

export const addProduct = (itemId, orderId, quantity) => {
    return Backend.post("product-entry/add", { },{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('user-token')
        },
        params: { itemId: itemId, orderId: orderId, quantity: quantity }
    })
};

export const createOrder = () => {
    return Backend.post("order/create", {} ,{
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('user-token')
        },
        params: { address: "fake address", deliveryTime: "2007-12-03T10:15:30+01:00" }
    })
};

export const getOrder = (orderId) => {
    return Backend.get(`order/${orderId}`, {
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('user-token')
        },
        params: { address: "fake address", deliveryTime: "2007-12-03T10:15:30+01:00" }})
}




