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
    image: {
        type: String,
        required: false
    },

    ageFrom: {
        type: Number,
        required: false
    },
    ageTo: {
        type: Number,
        required: false
    }
    ,
    deletedAt: {
        type: Date
    }

}, {timestamps: true})

export const Products = model("Product", ProductSchema)
