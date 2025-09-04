
import { Messages } from "../models/Messages.js"

export const sendMessage = async (req, res) => {
    const {body} = req
   // graba el mensaje de contactUs que manda el cliente
    try {
        const message = await Messages.create(body)
            res.json({
            ok: true, 
            msg: "Mensaje enviado"
        })      
       
    } catch (error) {
            //console.error("NO SE GRABA" + error)
            res.status(500).json({
            ok: false, 
            msg: "Error al enviar mensaje",
            error
        }) 
    }
}

export const getMessages = async (req, res) => {

    try {
        const messages = await Messages.find()

        if (messages)
        {
            res.json({
                ok: true,
                msg: "Mensajes obtenidos",
                messages
            })
        }
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al obterner los mensajes"
        })
    }
}