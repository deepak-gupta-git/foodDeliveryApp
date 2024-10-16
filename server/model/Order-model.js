const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, // You can make it ObjectId if it references your User model
    required: true,
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  amount: {
    type: Number, // Store amount as a number
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Food Processing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
