const { restaurantModel } = require("../Models/restaurantModel");
const { dishModel } = require("../Models/dishModel");
const httpError = require('http-errors')

const createRestaurant = async(req, res, next)=>{
    const newRestaurant = req.body;

    try {
        // const restaurant = restaurantModel.findOne({
        //     $or:[
        //         {name:newRestaurant.name}, 
        //         {address: newRestaurant.address}
        //     ]
        // });
        // console.log(restaurant);
        
        // if(restaurant) return next(httpError(409,"Restaurant already exists."));

        await restaurantModel.create(newRestaurant);

        res.status(200).json({
            message:"Restaurant successfully registered"
        })

    } catch (err) {
        next(err);
    }
}

const getResturents = async(req,res,next)=>{
    const {category} =  req.query;
    try {
        let restaurants = null;
        if(category){
            restaurants = await restaurantModel.find({categories:category})
        }
        else{
            restaurants = await restaurantModel.find();
        }

        res.status(200).json(restaurants);

    } catch (err) {
        next(err);
    }
}



const getResturentById = async(req,res,next) =>{
    const resId = req.params.id;
    
    try {
        const restaurant = await restaurantModel.findById(resId);
        if(!restaurant) return next(httpError(404,"Restaurant not found"));

        res.status(200).json(restaurant);
        
    } catch (err) {
        next(err);
    }
}

const updateRestaurent = async(req, res, next)=>{
    const resID = req.params.id;
    const newData = req.body;

    try {

        const updatedRes = await restaurantModel.findByIdAndUpdate(
            resID,
            { $set : {...newData} },
            { new : true },
        )

        res.status(200).json({
            message: "Restaurant Updated",
            restaurant: updatedRes,
        })
        
    } catch (err) {
        next(err);
    }
}

const deleteRestaurent = async(req,res,next)=>{
    const resId = req.params.id;

    try {
        const restaurant = await restaurantModel.findById(resId);

        if(!restaurant) return next(httpError(404,"Restauranr not found"));

        await restaurantModel.findByIdAndDelete(resId);
        res.status(200).json({
            message:"Restaurant deleted",
        })
        
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createRestaurant,
    getResturents,
    getResturentById,
    updateRestaurent,
    deleteRestaurent
}