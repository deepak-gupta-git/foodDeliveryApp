const mongoose = require("mongoose");

const URI = process.env.URI;

const ConnectDb = async () => {
    try {
      
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
       
        throw error;
    }
};

module.exports = ConnectDb;
