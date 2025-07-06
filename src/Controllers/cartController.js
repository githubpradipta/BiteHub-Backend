const { userModel } = require("../Models/userModel")
const httpErrors = require("http-errors");

const getUserCart = async(req,res,next)=>{
    const userID = req.params.id;

    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        const cartDishes = user.cart;
        res.status(200).json(cartDishes);
    } catch (err) {
        next(err);
    }
}

const addToCart = async(req,res,next)=>{
    const userID = req.params.id;
    const cartData = req.body;
    
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
const increamentQuantityofCartItem = async(req,res,next)=>{
    const userID = req.params.id;
    const dishId = req.body.dish;
    
    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));

        user.cart.forEach(item=>{
            if(item.dish==dishId){
                console.log(item);
                
                item.quantity = item.quantity+1;
            }
        })
        user.save();

        res.status(200).json({
            message:"Cart has been updated",
        })
    } catch (err) {
        next(err);
    }
}

const deleteFromCart = async(req,res,next)=>{
    const userID = req.params.id;
    const {productId} = req.body;
    
    try {
        const user = await userModel.findById(userID);
        if(!user) return next(httpErrors(404,"User not found"));
        if(user.cart.length==0) return next(httpErrors(404,"Cart is already empty"));

        let product = user.cart.find(item => item._id.toString() == productId );
        
        if(!product) return next(httpErrors(404,"Item not found"));


        if(product.quantity > 1){
            product.quantity--;
        }
        else {
            user.cart.pull(product);
        }
        user.save();

        res.status(200).json({
            message:"Cart item deleted",
        })
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getUserCart,
    addToCart,
    deleteFromCart,
    increamentQuantityofCartItem,
}
