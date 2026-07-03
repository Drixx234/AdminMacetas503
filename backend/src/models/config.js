import {Schema, model} from "mongoose";

const configSchema = new Schema({
    stockMin: { type: Number},
    temporarilyOutOfStock: {type : Date},

},{
    timestamps: true,
    strict: false
});

export default model("Config", configSchema);