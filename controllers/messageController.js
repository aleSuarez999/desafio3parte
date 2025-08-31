
import { Messages } from "../models/Messages.js"

export const sendMessage = async (req, res) => {
    const {body} = req
   // console.info(body)
    try {
        const message = await Messages.create(body)
            res.json({
            ok: true, 
            msg: "Mensaje enviado"
        })      
       
    } catch (error) {
       // console.error("NO SE GRABA" + error)
            res.status(500).json({
            ok: false, 
            msg: "Error al enviar mensaje",
            error
        }) 
    }



}