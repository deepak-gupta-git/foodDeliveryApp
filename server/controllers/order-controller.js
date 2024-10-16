const Order = require("../model/Order-model")

const myOrder = async (req, res) => {
    try {
        const orders = await Order.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

module.exports = myOrder;
