const mongoose = require ("mongoose");


const foodSchema = new mongoose.Schema({
    
    name : {
        type:String,
        require:true
    },
    desciption : {
        type:String,
        require:true
    },

    price : {
        type:Number,
        require:true
    },


    category : {
        type:String,
        require:true
    },

  
    image: {
        type:String,
        require:true
    }
})

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;