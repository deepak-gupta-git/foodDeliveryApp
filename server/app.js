const express = require("express");
require("dotenv").config();
const app = express();
const router = require("../server/Router/auth-router");
const ConnectDb = require("../server/Utils/utils");
const listingRouter = require("../server/Router/newListings-router");
const cors = require("cors");

const corsOptions = {
    origin: "http://wander-lust-frontend.vercel.app",
    methods: "GET, POST, PUT, PATCH, DELETE, HEAD",
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("Hello From root");
});

app.use("/api/auth", router);
app.use("/api/listings", listingRouter);


ConnectDb()
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection error:", error.message);
    });


module.exports = app;
