import {Schema, model} from "mongoose";

  const wishlistSchema = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    macetas: { type: String},
    creation_date: { type: String},
    isActive: { type: Boolean},
},{
    timestamps: true,
    strict: false
});

export default model("WhishList", wishlistSchema);