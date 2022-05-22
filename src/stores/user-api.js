import { Backend } from "../axios-config"
import auth from "../_helpers/auth";

export const getUsers = () => {
    return Backend.get("users", {
        headers: auth.getHeader()
    })
};
