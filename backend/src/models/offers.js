import {Schema, model} from "mongoose";

const offersSchema = new Schema({
    title: { type: String},
    description: { type: String},
    discount: { type: Number},
    ofert_price: { type: Number},
    stock: { type: Number},
    status: { type: Boolean},
    image: { type: String},
},{
    timestamps: true,
    strict: false
});

export default model("Offers", offersSchema);