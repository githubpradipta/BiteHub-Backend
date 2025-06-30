const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/BiteHub`);
        console.log("MongoDB connected");
        
    } catch (error) {
        next(error);
        console.log("DB Error");
        
        
    }
}

module.exports = connectDB;
