const mongoose = require("mongoose");
const URI = process.env.URI


const ConnectDb = async (req, res) => {
    try {
        mongoose.connect(URI)
        console.log("DB Connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDb ; 