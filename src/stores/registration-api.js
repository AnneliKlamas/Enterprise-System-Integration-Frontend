import {Backend} from "../axios-config";

export const createUser = (user) => {
    return Backend.post("users", user, {auth: { username: "admin", password: "admin"}})
};
