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
};

export const updateUser = (id, user) => {
  return Backend.post(`users/${id}`, user, {
    headers: auth.getHeader()
  })
};

export const createUser = (user) => {
  return Backend.post('users', user, {
    headers: auth.getHeader()
  })
}
