/**
  name
  description
  scent
  size
  price
  stock
  color
  image
  isActive
 */

  import {Schema, model} from "mongoose";

  const candleSchema = new Schema({
    name: { type: String},
    description: { type: String},
    scent: { type: String},
    size: { type: String},
    price: { type: Number},
    stock: { type: Number},
    color: { type: String},
    image: { type: String},
    public_id: { type: String},
    isActive: { type: Boolean},
},{
    timestamps: true,
    strict: false
});

export default model("Candle", candleSchema);