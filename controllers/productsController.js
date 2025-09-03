import { Products } from "../models/Products.js"
import { Images } from "../models/Images.js"
import fs from "fs"


//console.log(BASE_URL_API)
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
        //console.info("Se recibe id: ", id)
        const Query = id 
        //console.info("Se recibe params: ", Query)
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
    const {body, file} = req

    try {
        console.log(file)
        if (!file) {
            return res.status(400).json({
                ok: false,
                msg: "La imagen no se guardó correctamente."
            })
        }

        const prod = await Products.findOne({name: body.name})

        if (prod) {
            return res.status(400).json({
                ok: false,
                msg: `Ya existe un producto con este nombre id: ${prod._id}`
            })
        }

        const imageBuffer = fs.readFileSync("./" + file.path)

        const image = await Images.create({
            fileName: file.filename,
            img: {
                data: imageBuffer,
                contentType: "image/png"
            }
        })

        if (!image) {
            return res.status(400).json({
                ok: false,
                msg: "La imagen no se guardó correctamente."
            })
        }

        const newProd = await Products.create({
            ...body,
            img: `${BASE_URL_API}/images/${image._id}`
        })

        fs.rm("./" + file.path, error => {
            if (error) console.log("Lo sentimos, no hemos podido eliminar la imagen temporal")
            else console.log("El archivo se eliminó correctamente.")
        })

        res.json({
            ok: true,
            msg: "Producto creado correctamente.",
            product: newProd
        }) 
    } catch (error) {
        //console.log("Error interno:", error)
        res.status(500).json({
            ok: false,
            msg: "Error de servidor.",
            error
        })
    }
}

/*
export const updateProduct = async (req, res) => {

    const { params: {id}, body, file } = req;

    console.info("Id: ", id)
    try {
        const existsProduct = await Products.findById(id)
        console.log("existe?", existsProduct)
        console.info("Id: ", id)
        if (!existsProduct || existsProduct.deletedAt)
        { // si no existe o si está borrado
            console.info("El producto no existe o está borrado")
            res.status(404).json({
                ok: false,
                msg: "El producto no existe o está borrado"
            })
        }
        if (file)
        {
            const imageBuffer = fs.readFileSync("./" + file.path)

            const image = await Images.create({
                fileName: file.filename,
                img: {
                    data: imageBuffer,
                    contentType: "image/png"
                }
            })
        }
        const modProd = await Products.findByIdAndUpdate(
            id, 
            body,
            { new: true }
        )

          
        const newProd = await Products.create({
            ...body,
            img: `${BASE_URL_API}/images/${image._id}`
        })

        fs.rm("./" + file.path, error => {
            if (error) console.log("Lo sentimos, no hemos podido eliminar la imagen temporal")
            else console.log("El archivo se eliminó correctamente.")
        })
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
*/



export const deleteProduct = async (req, res) => {
   // console.info("llega a Delete")
    const { params: {id}, body } = req;
    
    try {
        const existsProduct = Products.findById(id)

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
            {deletedAt: new Date()},
            // le agrego fecha de borrado
            { new: true }
        )

        res.json({
            ok: true,
            msg: "Producto eliminado",
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

// nuevo con el file

export const updateProduct = async (req, res) => {

    //se desestructura file 
const { params: {id}, body, file } = req;


try {
    
    const existsProduct = await Products.findById(id)
    console.log("existe", existsProduct)

    if (!existsProduct || existsProduct.deletedAt) { 
            // si no existe o si está borrado
            console.info("El producto no existe o está borrado");
            return res.status(404).json({
                ok: false,
                msg: "El producto no existe o está borrado"
            });
    }

    // prueba intermedia
    /*
        return res.json({
            ok: true,
            msg: "El producto existe . validando modificacion"
        });
      */  
        ///////////////////////////////////////////////////
        // datos para actualizacion
        const updateData = { ...body };

        if (file) {
            try {
                const imageBuffer = fs.readFileSync("./" + file.path);
                // Crear nueva imagen en la base de datos
                // ver mas adelante array de imagenes como se hace
                const image = await Images.create({
                
                    fileName: file.filename,
                    img: {
                        data: imageBuffer,
                        contentType: "image/png"
                    }
                });

                if (!image) {
                    return res.status(400).json({
                        ok: false,
                        msg: "La imagen no se guardó correctamente."
                    });
                }
                // si la imagen se guardó en el temporal
                updateData.img = `${BASE_URL_API}/images/${image._id}`;
                console.log("Nueva imagen guardada con ID:", image._id);

                fs.rm("./" + file.path, error => {
                    if (error) console.log("Lo sentimos, no hemos podido eliminar la imagen temporal");
                    else console.log("El archivo se eliminó correctamente.");
                });

            } catch (error) {
                
                console.log("Error procesando imagen:", imageError);
                return res.status(400).json({
                    ok: false,
                    msg: "La imagen no se guardó correctamente."
                });


            }
        }
        else // del if file
        {
            console.log("No se envió nueva imagen - se mantiene la existente");
        }

       // actualizar
        console.log("Datos a actualizar:", updateData);

        const updatedProduct = await Products.findByIdAndUpdate(
            id, 
            { $set: updateData }, // set actualiza y deja los que estaban
            {
                new: true, // devuelve el nuevo
            }
        )
        // si no va al catch pero da error
        if (!updatedProduct) {
            return res.status(500).json({
                ok: false,
                msg: "Error al actualizar el producto."
            });
        }

        console.log("Producto actualizado exitosamente");
        if (existsProduct.img) // para no perder los productos anteriors con image
        {
            const previousImageId = existsProduct.img.split('/').at(-1); // la ultima parte del url

            if (previousImageId) {
                Images.findByIdAndDelete(previousImageId)
                    .then(deleted => {
                    if (deleted) console.log("Imagen anterior eliminada:", previousImageId);
                    })
                    .catch(err => console.log("Error eliminando imagen anterior:", err));
            }
        }
        res.json({
            ok: true,
            msg: "Producto actualizado.",
            product: updatedProduct
        });

} catch (error) {
   // console.log("Error interno:", error);
        res.status(500).json({
            ok: false,
            msg: "Error de servidor."
        });
}

}