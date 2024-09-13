const User = require("../model/User-model")


const signUp = async (req, res) => {
    try {
        const {email, password , username} = req.body;

        const userExist = await User.findOne({email});
        if(userExist) {
         return res.status(400).json({msg : "Email Already Exist"})
        }
 
       const UserData =  await User.create ({username, email, password});
       res.status(200).json({msg : "SignUp Successfully", 
        token: await UserData.generateToken(),
        userId: UserData._id.toString(),
       })

     
    } catch (error) {
        console.log(error)
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await user.comparePassword(password);
        // console.log("password match", isMatch)

        if (isMatch) {
            res.status(200).json({
                msg: "Login Successful",
                token: await user.generateToken(),
                userId: user._id.toString(),
            });
        } else {
            res.status(400).json({ msg: "Invalid Email or Password" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};



module.exports = {signUp, login}