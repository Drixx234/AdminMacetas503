/*
campos client:
name
lastName
email
password
isActive
phone
address
*/
import {Schema, model} from "mongoose";

const clientSchema = new Schema({
    name: { type: String},
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    isActive: { type: Boolean},
    isVerified: { type: Boolean, default: false},
    phone: { type: String},
    address: { type: String},
    loginAttempts: { type: Number},
    timeOut: { type: Date}
},{
    timestamps: true,
    strict: false
});

export default model("Client", clientSchema);