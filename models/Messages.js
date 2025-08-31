import { Schema, model } from "mongoose";


const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {timestamps: true})

export const Messages = model("Message", MessageSchema)