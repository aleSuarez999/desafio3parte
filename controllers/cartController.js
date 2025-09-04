import { Cart } from "../models/Cart.js"

export const createCart = async  (req, res) => {

    const {body} = req
    // quantity , prod  el ejercicio pide mostrar el carrito
    try {
        console.log("createCart -> ", body)
        const cart = await Cart.create(body)
        res.json({
            ok: true, 
            msg: "Producto agregado al carrito",
            cart
        })
    } catch (error) {
        res.status(500).json({
            ok: false, 
            msg: "Error del servidor"
        })
    }
   
}