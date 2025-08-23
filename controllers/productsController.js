import { Products } from "../models/Products.js"


export const getProducts = async (req, res) => {
    const { query }  = req
    // obtengo el query para la busqueda
    try {
        // si no viene nada trae todo, el regexp permite busquedas tipo que contenga x
        const QueryRegExp = query.name ? {name: new RegExp(query.name, "i")} : undefined
        console.info("Se recibe params: ", query)
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
    const { params: {id}, body } = req;
    // obtengo el id para la busqueda
    try {
        
        const Query = id ? id : undefined
        console.info("Se recibe params: ", id)
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