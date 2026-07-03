/*
clientId
Productd[{
    postID,
    quantity
    subtotal
    },
    {
    plantsID,
    quantity
    subtotal},
    {
    candleID,
    quantity
    subtotal
    }
    ]
total
status
*/

import mongoose, {Schema, model} from 'mongoose';

const cartSchema = new Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    products: [{
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        },
        quantity: {
            type: Number,
        },
        subtotal: {
            type: Number,
        },
    
        candleId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Candle'
        },
        quantity: {
            type: Number,
        },
        subtotal: {
            type: Number,
        },
    
        plantsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plants'
        },
        quantity: {
            type: Number,
        },
        subtotal: {
            type: Number,
        }
    }],
    total: {type: Number,},
    status: {type: String}
},{
    timestamps: true,
    strict: false
});

export default model('Cart', cartSchema);