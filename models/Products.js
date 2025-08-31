import { model, Schema } from "mongoose";

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    largeDescription: {
        type: String,

    },
    freeDelivery: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        required: true
    },

    ageFrom: {
        type: Number
    },
    ageTo: {
        type: Number
    }
    ,
    deletedAt: {
        type: Date
    }

}, {timestamps: true})

export const Products = model("Product", ProductSchema)
