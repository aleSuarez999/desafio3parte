import { faSlash } from "@fortawesome/free-solid-svg-icons"
import { Products } from "../models/Products.js"


export const getProducts = async (req, res) => {
    const { query }  = req
    // obtengo el query para la busqueda
    try {
        // si no viene nada trae todo, el regexp permite busquedas tipo que contenga x
        const QueryRegExp = query.name ? {name: new RegExp(query.name, "i")} : undefined
        //console.info("Se recibe params: ", query)
        const products = await Products.find(QueryRegExp)

        res.json({
            ok: true,
            products
        })

    } catch (error) {
            res.status(404).json({
                ok: true,
                msg: "Producto no encontrado"             
            })
    }
}

export const getProductsById = async (req, res) => {
    //console.log(req.query.params)
    const { params: {id}, body } = req;
    // obtengo el id para la busqueda
    try {
        console.info("Se recibe id: ", id)
        const Query = id 
        console.info("Se recibe params: ", Query)
        const products = await Products.findById(Query)

        res.json({
            ok: true,
            products
        })

    } catch (error) {
            res.status(404).json({
                ok: true,
                msg: "Producto no encontrado"             
            })
    }
}

export const createProduct = async (req, res) => {

    const { body }  = req
    //console.info("createProduct: ", body)
    try {

        const prod = await Products.findOne({name: body.name})
        if (prod) {
            console.error("Producto duplicado")
             return res.status(409).json({
                ok: false,
                msg: "El producto ya existe"
            })
        }

        const newProd = await Products.create(body)

        return res.json({
            ok: true,
            msg: "Producto creado Correctamente",
            newProd
        })

    } catch (error) {
          return res.status(500).json({
                ok: false,
                msg: `createProduct ${error}`
            })
    }
}

export const updateProduct = async (req, res) => {

    const { params: {id}, body } = req;
    //console.info("Id: ", id)
    try {
        const existsProduct = Products.findById(id)
       // console.log("existe?", existsProduct)
      //  console.info("Id: ", id)
        if (!existsProduct || existsProduct.deletedAt)
        { // si no existe o si está borrado
            console.info("El producto no existe o está borrado")
            res.status(404).json({
                ok: false,
                msg: "El producto no existe o está borrado"
            })
        }

        const modProd = await Products.findByIdAndUpdate(
            id, 
            body,
            { new: true }
        )

        res.json({
            ok: true,
            msg: "Producto modificado",
            product: modProd
        })

    } catch (error) {
        
        res.status(400).json({
            ok: false,
            msg: "Error en el servidor",
            error
        })
    }

}