const { userModel } = require("../Models/userModel")
const httpErrors = require("http-errors");
const bcrypt = require("bcrypt");

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
        
        const machedPassword = await bcrypt.compare(password.toString(),user.password);
        if(!machedPassword) return next(httpErrors(401,"Email or Password is incorrect"))
        
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
    createUser,
    loginUser,
}