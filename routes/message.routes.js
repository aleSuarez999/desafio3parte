import express from "express"
import {body} from "express-validator"
import { validationErrorResponse } from "../middleware/validateResponse.js"
import { getMessages, sendMessage } from "../controllers/messageController.js"

const route = express.Router()

route
    .post("/", [
    
        body("name").isString().isLength({min: 2}),
        body("email").isEmail(),
        body("message").isString().isLength({min: 10}),
        validationErrorResponse
    ]
    , sendMessage)
    .get("/", getMessages)

export default route