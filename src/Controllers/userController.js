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



module.exports = {
    getUserProfile,
}