import express from "express"
import {body} from "express-validator"
import { validationErrorResponse } from "../middleware/validateResponse.js"
import { createCart } from "../controllers/cartController.js"

const route = express.Router()

route.post("/", createCart)

export default route