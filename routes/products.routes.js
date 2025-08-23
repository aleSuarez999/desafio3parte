import express from "express"
import { getProducts, getProductsById } from "../controllers/productsController.js"

const route = express.Router()

route
    .get("/", getProducts)
    .get("/:id", getProductsById)

export default route