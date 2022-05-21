import axios from "axios";

export const Backend = axios.create({
    baseURL: 'https://esisupermarket.herokuapp.com/',
    auth: {
        username: 'manager',
        password: 'manager'
    }
})
