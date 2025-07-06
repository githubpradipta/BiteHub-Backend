const { userModel } = require("../Models/userModel")
const httpErrors = require("http-errors");


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

const deleteOrderById = async(req,res,next)=>{
    const userId = req.params.id;
    const orderId = req.body;
    try {
        const user = await userModel.findById(userId);
        if(!user) return next(httpErrors(404,"User not found"));

        user.orders.forEach(order=>{
            if(order.dish == orderId){
                user.orders.pull(order);
            }
        })
        user.save();

        res.status(200).json({
            message:"Order deleted"
        })

    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserOrders,
    addToOrder,
    deleteOrderById,
}