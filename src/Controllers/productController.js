const { dishModel } = require("../Models/dishModel");
const httpError = require('http-errors')

const createDish = async(req,res,next)=>{
    const dish = req.body;
    
    try{
        
    }
    catch(err){
        next(err);
    }
}