import { Backend } from "../axios-config"
import auth from "../_helpers/auth";

export const getProducts = () => {
    return Backend.get("products", {
        headers: auth.getHeader()
    })
};
