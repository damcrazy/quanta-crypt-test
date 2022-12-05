const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./auth");

dotenv.config();
app.use(express.json());

var cors = require('cors');
app.use(cors({origin: "*"}));

app.get('/', (req, res) => {
    res.send('Hello World!')
})


mongoose 
 .connect(process.env.MONGO_URL)   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});