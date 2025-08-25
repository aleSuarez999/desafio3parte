import { model, Schema } from "mongoose";

const cartProduct = {
     // del frontend viene product , quantity
    productId: {
        type: Schema.Types.ObjectId, // solo el Id 
        ref: "Products"
    } ,
    quantity: {
        type: Number,
        required: true
    }
}

const cartSchema = new Schema({
    cart: {
        type: [cartProduct],
        required: true
    }
})

export const Cart = model("Cart", cartSchema)