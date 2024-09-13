import mongoose, { model } from "mongoose";


const orderSchema = new mongoose.Schema ({
    userId : {
        type:String,
        required:true
    },

    items : {
        type:String,
        required:true
    },

    amount : {
        type:String,
        required:true
    },

    address : {
        type:String,
        required:true
    },

    status : {
        type:String,
        default:"Food Processing"
    },

    date : {
        type:Date,
        default:Date.now()
    },

    payment : {
        type:Boolean,
        default:false
    },

   
})


const order = mongoose.model("order", orderSchema);
module.exports = order;