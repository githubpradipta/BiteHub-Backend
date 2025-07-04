const express = require('express');
const router = express.Router();
const{ createRestaurant, getResturents, getResturentById, addDish, updateRestaurent, deleteRestaurent} = require("../Controllers/restaurantController");

router
.get('/',getResturents)
.get('/:id',getResturentById)
.post('/',createRestaurant)
.patch('/:id/dish',addDish)
.put('/:id',updateRestaurent)
.delete('/:id',deleteRestaurent)

module.exports = router;
