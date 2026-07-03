import {Schema, model} from "mongoose";

  const postSchema = new Schema({
    name: { type: String},
    description: { type: String},
    dimensions: { type: String},
    weight: { type: String},
    price: { type: Number},
    color: { type: String},
    image: { type: String},
    stock: { type: Number},
    isActive: { type: Boolean},
},{
    timestamps: true,
    strict: false
});

export default model("Post", postSchema);