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

export const createOrder = () => {
    return Backend.post("order/create", {} ,{
        headers: auth.getHeader(),
        params: { address: "fake address", deliveryTime: "2007-12-03T10:15:30+01:00", clientId: auth.getClientId()}
    })
};

export const getOrder = (orderId) => {
    return Backend.get(`order/${orderId}`, {
        headers: auth.getHeader(),
        params: { address: "fake address", deliveryTime: "2007-12-03T10:15:30+01:00" }})
}




