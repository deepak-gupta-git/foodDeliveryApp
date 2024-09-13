const mongoose = require("mongoose")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema ({
    username : {
        type:String,
        require:true
    },

    email : {
        type:String,
        require:true
    },

    password : {
        type:String,
        require:true
    },
})


//? secure the password with the bcrypt
userSchema.pre("save", async function (next) {
    // console.log("pre method", this);
    const user = this;
  
    if (!user.isModified("password")) {
      next();
    }
  
    try {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
    } catch (error) {
      next(error);
    }
  });
  
  // compare the password
  userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

userSchema.methods.generateToken = async function () {
    try {
      return jwt.sign(
        {
          userId: this._id.toString(),
          email: this.email,
          isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30d",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };




const User = mongoose.model("User", userSchema);
module.exports = User ;