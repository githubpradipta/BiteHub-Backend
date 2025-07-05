const { userModel } = require("../Models/userModel")
const httpErrors = require("http-errors");

const getUserProfile = async(req,res,next) =>{
    const userId = req.params.id;
    
    try {
        const user = await userModel.findById(userId);

        if(!user) return next(httpErrors(404,"user not found"));

        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
const getUserCart = async(req,res,next)=>{
    const userID = req.param.id;

    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        const cartDishes = user.cart;
        res.status(200).json(cartDishes);
    } catch (err) {
        next(err);
    }
}
const getUserOrders = async(req,res,next)=>{
    const userID = req.param.id;

    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        const Orders = user.orders;
        res.status(200).json(Orders);
    } catch (err) {
        next(err);
    }
}
const addToCart = async(req,res,next)=>{
    const userID = req.params.id;
    const cartData = res.body;
    
    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        user.cart.push(cartData);
        user.save();

        res.status(200).json({
            message:"Item added to your cart",
        })
    } catch (err) {
        next(err);
    }
}
const addToOrder = async(req,res,next)=>{
    const userID = req.params.id;
    const orderData = res.body;
    
    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        user.orders.push(orderData);
        user.save();

        res.status(200).json({
            message:"Thank you, Order placed successfully",
        })
    } catch (err) {
        next(err);
    }
}
const deleteFromCart = async(req,res,next)=>{
    const userID = req.params.id;
    const cartData = res.body;
    
    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        if(cartData.quantity > 1){
            user.cart.forEach(item=>{
                if(item.dish==cartData.dish){
                    item.quantity = item.quantity-1;
                } 
            })
            user.save();
        }
        else {
            user.pull(cartData);
            user.save();
        }

        res.status(200).json({
            message:"Cart item deleted",
        })
    } catch (err) {
        next(err);
    }
}
const createUser = async(req,res,next) =>{
    const newUser = req.body;

    try {
        const user = await userModel.findOne({email:newUser.email})
        if(user) return next(httpErrors(409,"User already exists"));

        await userModel.create(newUser);
        res.status(200).json({
            message:"User is successfully created"
        })

    } catch (err) {
        next(err);
        
    }
}
const loginUser = async(req,res,next) =>{
    const { email,password } = req.body;

    try{
        const user = await userModel.findOne({email});
        if(!user) return next(httpErrors(401,"Email or Password is incorrect"));
        if(user.password != password) return next(httpErrors(401,"Email or Password is incorrect"))
        
        res.status(200).json({
            message:"Succesfully logged in",
            user: user,
        })
    }
    catch(err){
        next(err);
    }
}

module.exports = {
    getUserProfile,
    createUser,
    loginUser,
}