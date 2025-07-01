const { userModel } = require("../Models/userModel")
const httpErrors = require("http-errors");

const getUserProfile = async(req,res,next) =>{
    const userId = req.params.id;
    
    try {
        const user = await userModel.findById(userId);

        if(!user) return next(httpErrors(404,"user not found"));

        res.status(200).json({
            message:"Success",
            user:user,
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