const Food = require("../model/Food-model")

const foodStore = async (req, res) => {
    try {
        const {name, description, price, category, image} = req.body;

        const userExist = await Food.findOne({name});
        if(userExist) {
         return res.status(400).json({msg : "Product Already Exist"})
        }
 
       const foodData =  await Food.create ({name, description, price, category, image});
       res.status(200).json({msg : "Food Store Successfully", 
       })

       console.log(foodData)
     
    } catch (error) {
        console.log(error)
    }
}

module.exports = foodStore;