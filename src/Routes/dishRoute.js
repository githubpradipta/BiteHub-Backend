const express = require('express');
const router = express.Router();
const{ getDishesByRestaurant,
    createDish,
    getDishs,
    getDishesByResAndCategory,
    getDishesByType,
    updateDish,
    deleteDish,
    getDishesByCategory } = require("../Controllers/dishController");

router
.get('/restaurant/:id',getDishesByRestaurant)
.get('/',getDishs)
.get('/filter/',getDishesByResAndCategory)
.get('/type/:type',getDishesByType)
.get('/:category',getDishesByCategory)
.post('/:id',createDish)
.put('/:id',updateDish)
.delete('/:id',deleteDish)

module.exports = router;