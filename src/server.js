const express = require('express');
const httpErrors = require('http-errors');
const connectDB = require("./DB/connect_DB");
require('dotenv').config();

const app = express();
connectDB();




// Error handling middleware
app.use((err,req,res,next)=>{
    const status = err.status;
    res.status(status).json({
        message:err.message,
        status: status
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server is running on port ${PORT}`);
    
})