import express from "express"
import { getProducts } from "../controllers/productsController.js"

const route = express.Router()

route
    .get("/", getProducts)

export default route