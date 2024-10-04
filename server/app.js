const express = require("express");
require("dotenv").config();
const app = express();
const router = require("../server/router/auth-router");
const ConnectDb = require("../server/Utils/utils");
const cors = require("cors");
const Razorpay = require("razorpay");

const corsOptions = {
    origin: "food-delivery-app-tgyc.vercel.app",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 2000; 

app.get("/", (req, res) => {
    res.status(200).send("Hello from root");
});
app.use("/api/auth", router);

app.post("/order", async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        if(!req.body){
            return res.status(400).send("Bad Request");

        }
        const options = req.body;

        const order = await razorpay.orders.create(options);

        if(!order){
            return res.status(400).send("Bad Request");
        }

        res.json(order);
        
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

// Uncomment and use if needed for payment validation
// app.post("/validate", async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
//     sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

//     const digest = sha.digest("hex");

//     if (digest !== razorpay_signature) {
//         return res.status(400).json({ msg: "Transaction is not legit!" });
//     }
//     res.json({ msg: "Transaction is legit!", orderId: razorpay_order_id, paymentId: razorpay_payment_id });
// });




ConnectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
});
