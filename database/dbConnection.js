import mongoose from "mongoose"

export const dbConnection = async() => {
    try {
        console.info("Abriendo base de datos")
        const mongoDB = await mongoose.connect(process.env.BASE_URL_DB)
        console.info("Conectado a: ", mongoDB.connection.name)
    } catch (error) {
        console.error("Error al abrir conectarse a la DB")
        throw Error(error)
    }
}