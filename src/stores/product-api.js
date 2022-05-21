import { Backend } from "../axios-config"

export const getProducts = () => {
    return Backend.get("products", {
        headers: {
            'Authorization': 'Basic ' + localStorage.getItem('user-token')
        }
    })
};
