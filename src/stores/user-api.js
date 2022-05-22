import { Backend } from "../axios-config"
import auth from "../_helpers/auth";

export const getUsers = () => {
    return Backend.get("users", {
        headers: auth.getHeader()
    })
};

export const getUserById = (id) => {
  return Backend.get(`users/${id}`, {
    headers: auth.getHeader()
  })
}
