import express from "express"
import 'dotenv/config'
import { dbConnection } from "./database/dbConnection.js"

import productRoutes from "./routes/products.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import messageRoutes from "./routes/message.routes.js"


import cors from "cors"

const server = express()

const api = async() => {

    const API_PORT = process.env.API_PORT 
   
    
    // defino puerto en el .env
    server.use(cors())
    server.use(express.json()) 
    // conexion a la db
    await dbConnection()

    server.use("/api/products", productRoutes)
   
    server.use("/api/cart", cartRoutes)

    server.use("/api/contacts", messageRoutes)
  

    server.listen(API_PORT, () => {
        console.log(`el servidor está corriendo en el puerto ${API_PORT}`)
        console.log(`http://localhost:${API_PORT}/api`)
    })

}

api()