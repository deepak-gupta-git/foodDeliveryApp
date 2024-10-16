const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth-controller")
const foodStore = require("../controllers/food-controller")
const myorder = require("../controllers/order-controller")


router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/food").post(foodStore);
router.route("/myorder").post(myorder);


module.exports = router;