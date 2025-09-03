import { Schema, model } from "mongoose";


const ImageSchema = new Schema({
    fileName:{
        type: String,
        required: true,
        unique: true
    },
    img: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

export const Images = model("Image", ImageSchema)