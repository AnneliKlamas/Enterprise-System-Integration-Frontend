import { Backend } from "../axios-config"
import auth from "../_helpers/auth";

export const getClient = (clientId) => {
    return Backend.get(`client/${clientId}`, {
        headers: auth.getHeader()
    })

};
export const updateClient = (newName) => {
    return Backend.post("/client/update", {}, {
        headers: auth.getHeader(),
        params: {
            id: parseInt(auth.getClientId()),
            newName: newName
        }
    })

};
