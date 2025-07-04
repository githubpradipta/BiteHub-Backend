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
    try {
        const restaurants = await restaurantModel.find();
        res.status(200).json(restaurants);

    } catch (err) {
        next(err);
    }
}

const getResturentById = async(req,res,next) =>{
    const resId = req.params.id;

    try {
        const restaurant = restaurantModel.findById(resId);
        if(!restaurant) return next(httpError(404,"Restaurant not found"));

        res.status(200).json(restaurant);
        
    } catch (err) {
        next(err);
    }
}

const addDish = async(req,res,next)=>{
    const resId = req.params.id;
    const dishData = req.body;

    try {
        const restaurant = await restaurantModel.findById(resId);

        if(!restaurant) return next(httpError(404,"restaurent not found"));

        //checking for dish redundancies
        const checkDish = await dishModel.findOne({
            $and:[
                {name:dishData.name},
                {restaurant:resId}
            ]
        })
        if(checkDish) return next(httpError(409,"Dish is already exist"));


        //creating a dish
        const newDish = new dishModel({...dishData,restaurant:resId});
        newDish.save();
        const dishId = newDish._id;

        //adding dishId into the dishes of restaurant
        restaurant.dishes.push(dishId);
        restaurant.save();

        res.status(200).json({
            message:"Dish is successfully added",
        })

        
    } catch (err) {
        next(err);
    }
}

const updateRestaurent = async(req, res, next)=>{

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
    addDish,
    updateRestaurent,
    deleteRestaurent
}