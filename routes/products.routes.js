import express from "express"
import {body} from "express-validator"
import { validationErrorResponse } from "../middleware/validateResponse.js"
import { createProduct, deleteProduct, getProducts, getProductsById, updateProduct } from "../controllers/productsController.js"
import upload from "../utils/storage.js"

const route = express.Router()

route
    .get("/", getProducts)
    .delete("/:id", deleteProduct)
    .get("/:id", getProductsById)
    .post("/", upload.single("image"), createProduct)
    .put("/:id", upload.single("image"), updateProduct)
    /*
       .post("/", [
        body("name").isString()
                .isLength({min: 5, max: 50})
                .withMessage("Ingrese entre 5 y 50 Caracteres"),
        body("amount").isNumeric({min: 0}).withMessage("El valor es requerido"),
        body("stock").isNumeric({min: 0}).withMessage("el stock no puede ser negativo"),
        body("brand").isString().isLength({min: 2 }).withMessage("Marca requerida"),
        body("category").isString().isLength({min: 3}).withMessage("Complete la Categoria"),
        body("shortDescription").isString().isLength({min: 3, max: 50}).withMessage("Ingrese un texto entre 3 y 50 caracteres"),
        body("ageFrom").isNumeric().isLength({min:0, max: 99}).withMessage("Ingrese una edad valida"),
        body("ageTo").isNumeric().isLength({min:0, max: 99}).withMessage("Ingrese una edad valida"),
       
        validationErrorResponse
    ], createProduct)
*/
/*
    .put("/:id", [
        body("name").isString()
                .isLength({min: 5, max: 50})
                .withMessage("Ingrese entre 5 y 50 Caracteres"),
        body("amount").isNumeric({min: 0}).withMessage("El valor es requerido"),
        body("stock").isNumeric({min: 0}).withMessage("el stock no puede ser negativo"),
        body("brand").isString().isLength({min: 2 }).withMessage("Marca requerida"),
        body("category").isString().isLength({min: 3}).withMessage("Complete la Categoria"),
        body("shortDescription").isString().isLength({min: 3, max: 150}).withMessage("Ingrese un texto entre 3 y 50 caracteres"),
        body("ageFrom").isNumeric().isLength({min:0, max: 99}).withMessage("Ingrese una edad valida"),
        body("ageTo").isNumeric().isLength({min:0, max: 99}).withMessage("Ingrese una edad valida"),
        validationErrorResponse
    ], updateProduct)
    */
    
export default route