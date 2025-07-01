//import packages
const express = require('express');
const httpErrors = require('http-errors');
const connectDB = require("./DB/connect_DB");
const errMiddleWare = require("./Middlewares/errorMiddleware")
require('dotenv').config();

const app = express();
connectDB(); //DB connection method call













//middleware calls
app.use(errMiddleWare);

//Server listing
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server is running on port ${PORT}`);
    
})