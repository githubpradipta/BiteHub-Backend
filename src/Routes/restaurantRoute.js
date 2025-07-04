const express = require('express');
const router = express.Router();
const{ createRestaurant, getResturents, getResturentById, updateRestaurent, deleteRestaurent} = require("../Controllers/restaurantController");

router
.get('/',getResturents)
.get('/:id',getResturentById)
.post('/',createRestaurant)
.put('/:id',updateRestaurent)
.delete('/:id',deleteRestaurent)

module.exports = router;
