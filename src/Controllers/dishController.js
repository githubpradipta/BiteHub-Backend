const { dishModel } = require("../Models/dishModel");
const { restaurantModel } = require("../Models/restaurantModel");
const httpError = require('http-errors')

const createDish = async(req,res,next)=>{
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

const getDishesByRestaurant = async(req,res,next)=>{
    const resId = req.params.id;
    
    try{
        const dishes = await dishModel.find({restaurant:resId});
        res.status(200).json(dishes);
    }
    catch(err){
        next(err);
    }
}

const getDishesByCategory = async(req,res,next)=>{
    const category = req.params.category;

    try {
        const dishes = await dishModel.find({
            category:{ $regex:category,$options: 'i' }
        });
        res.status(200).json(dishes);
    } catch (err) {
        next(err);
    }
}

const getDishs = async(req,res,next)=>{
    try {
        const dishes = await dishModel.find();
        res.status(200).json(dishes);
        
    } catch (err) {
        next(err);
    }
}

const getDishesByResAndCategory = async(req,res,next)=>{
    const {restaurant,category} = req.query;

    try {
        const dishes = await dishModel.find({
            $and:[
                {restaurant:restaurant},
                {category:category}
            ]
        })

        res.status(200).json(dishes);

    } catch (err) {
        next(err);
    }
}

//veg or nonveg type
const getDishesByType = async(req,res,next)=>{
    const type = req.params.type; //Veg or Nonveg
    
    try {
        let dishes = [];
        if(type=='veg'){
            dishes = await dishModel.find({isVeg:true});
        }
        else if(type=='nonveg'){
            dishes = await dishModel.find({isVeg:false});
        }
        else return next(httpError(400))

        res.status(200).json(dishes);
    } catch (err) {
        next(err);
    }
}

const updateDish = async(req,res,next)=>{

}

const deleteDish = async(req,res,next)=>{
    const dishId = req.params.id;

    try {
        const dish = await dishModel.findById(dishId);
        if(!dish) return next(httpError(404,"Dish is already not exists"));

        //delete dish from restaurant
        const restaurant = await restaurantModel.findById(dish.restaurant);
        restaurant.dishes.pull(dishId);
        restaurant.save();

        //delete the dish itself
        await dishModel.findByIdAndDelete(dishId);

        res.status(200).json({
            message:"Dish successfully deleted"
        })

    } catch (err) {
        next(err);
    }
}
module.exports = {
    createDish,
    getDishesByRestaurant,
    getDishs,
    getDishesByResAndCategory,
    getDishesByType,
    updateDish,
    deleteDish,
    getDishesByCategory,
}
