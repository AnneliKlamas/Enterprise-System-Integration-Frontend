import { Backend } from "../axios-config"

export const getProducts = () => Backend.get("products")
