import axios from "axios";

export const Backend = axios.create({
    // baseURL: 'https://esisupermarket.herokuapp.com/'
    baseURL: 'http://localhost:8081'
})
