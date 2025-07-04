//import packages
const express = require('express');
const httpErrors = require('http-errors');
const connectDB = require("./DB/connect_DB");
const userRouter = require("./Routes/userRoute");
const restaurantRouter = require("./Routes/restaurantRoute");
const dishRouter = require("./Routes/dishRoute");
const errMiddleWare = require("./Middlewares/errorMiddleware")
require('dotenv').config();

const app = express();
app.use(express.json());
connectDB(); //DB connection method call


//routes
app.use('/api/users',userRouter);
app.use('/api/restaurants',restaurantRouter);
app.use('/api/dishes',dishRouter);










//middleware calls
app.use(errMiddleWare);

//Server listing
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server is running on port ${PORT}`);
    
})