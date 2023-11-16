const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require("dotenv").config();
app.use(cors());

// conect mongodb to server
mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;

// routes
app.use(express.json());
// userAuth routes
const userAuth = require("./src/routes/useAuthroutes")
app.use("/",userAuth)

// product
const productsRoutes = require("./src/routes/useProdRoutes")
app.use("/",productsRoutes)

// student routes
const studentsRoutes = require("./src/routes/useStdRoutes")
app.use("/",studentsRoutes)
// set contion server connect and not connect

db.on("error", (error) => {
    console.error("error", error);
})

db.once("open", () => {
    console.log("Successfully connected db");
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`server run on ${port} port`);
    });
})

