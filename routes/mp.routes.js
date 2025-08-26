import express from "express"
import {body} from "express-validator"
import { validationErrorResponse } from "../middleware/validateResponse.js"
import { createPreference } from "../controllers/mpController.js"
//import { getPaymentMethods } from "../controllers/mpController.js"

const route = express.Router()

//route.get("/", getPaymentMethods)
route.post("/preference", createPreference)



export default route