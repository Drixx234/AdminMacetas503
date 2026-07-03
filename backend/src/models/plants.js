import {Schema, model} from "mongoose";

  const plantsSchema = new Schema({
    name: { type: String},
    care: { type: String},
    size: { type: String},
    price: { type: Number},
    stock: { type: Number},
    image: { type: String},
    product_id: { type: String},
       
},{
    timestamps: true,
    strict: false
});

export default model("Plants", plantsSchema);