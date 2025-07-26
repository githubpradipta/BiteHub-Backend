const { default: mongoose } = require("mongoose");
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

const addAddress = async(req,res,next)=>{
    const userId = req.params.id;
    const {tag,address} = req.body;

    try {
        const user = await userModel.findById(userId);
        console.log(user);
        
        if(!user) return next(httpErrors(404,"User not found"));

        const newAddress = {
            address,
            tag,
            isActive:true, //by default
        }

        user.addresses.push(newAddress);
        user.save();

        res.status(200).json({
            message:"Address added",
        })
    } catch (err) {
        next(err);
    }
}

const deleteAddressById = async(req,res,next)=>{
    const userId = req.params.id;
    const {addressId} = req.body;

    try {
        const user = await userModel.findById(userId);
        if(!user) return next(httpErrors(404,"User not found"));
        if(user.addresses.length==0) return next(httpErrors("Address not exist"))

        const address = user.addresses.id(addressId);
        
        user.addresses.pull(address);
        user.save();

        res.status(200).json({
            message:"Address deleted",
        })
    } catch (err) {
        next(err);
    }
}



module.exports = {
    getUserProfile,
    addAddress,
    deleteAddressById,
}