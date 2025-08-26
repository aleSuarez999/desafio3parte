import axios from "axios"
// SDK de Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Agrega credenciales


const BASE_URL_MP = process.env.BASE_URL_MP
const API_TOKEN_MP = process.env.API_TOKEN_MP

const client = new MercadoPagoConfig({ accessToken: API_TOKEN_MP });

export const createPreference = async (req, res) => {

    console.log("bodyP: ", req.body)
    const itemsData = req.body.body?.items || [];

    const body = {
        items: itemsData.map(obj => ({
            title: obj.title,
            quantity: obj.quantity,
            unit_price: obj.unit_price,
            currency_id: "ARS"

        }) ),
        back_urls: {
            success: "https://desafiointegrador2.vercel.app/",
            failure: "https://desafiointegrador2.vercel.app/failure",
            pending: "https://desafiointegrador2.vercel.app/"
            },
            auto_return: "approved",
    }


    try {
        
        const preference = new Preference(client);
        console.log("pref: ", preference)
        const result = await preference.create( req.body )

        console.log("result: ", result.id)
        if (result.id)
        {
            return res.json({
                ok: true,
                msg: "id obtenido",
                id: result.id,
                init_point: result.init_point 
            })
        }
    } catch (error) {
        console.error("Errorid", error)
         res.status(500).json({ 
            error: 'Failed to create preference',
             msg: error.message 
         });
    }

}