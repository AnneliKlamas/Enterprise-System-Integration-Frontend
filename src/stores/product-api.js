import { Backend } from "../axios-config"
import auth from "../_helpers/auth";

export const getProducts = () => {
    return Backend.get("products", {
        headers: auth.getHeader()
    })
};

export const createOrder = (order) => {
    return Backend.post("order/create", order ,{
        headers: auth.getHeader()
    })
};

export const getOrder = (orderId) => {
    return Backend.get(`order/${orderId}`, {
        headers: auth.getHeader(),
        params: { address: "fake address", deliveryTime: "2007-12-03T10:15:30+01:00" }})
}




