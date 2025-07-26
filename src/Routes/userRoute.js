const express = require('express');
const router = express.Router();
const { getUserProfile, addAddress, deleteAddressById } = require("../Controllers/userController")
const { getUserOrders, addToOrder, deleteOrderById } = require("../Controllers/orderController");
const { getUserCart, addToCart, deleteFromCart, increamentQuantityofCartItem } = require("../Controllers/cartController");

router
//core user routes
.get('/profile/:id',getUserProfile)
.post('/addresses/:id',addAddress)
.delete('/addresses/:id',deleteAddressById)

//cart routes
.get('/:id/cart',getUserCart)
.post('/:id/cart',addToCart)
.patch('/:id/cart',increamentQuantityofCartItem)
.delete('/:id/cart',deleteFromCart)

//order routes
.get('/:id/orders',getUserOrders)
.post('/:id/order',addToOrder)
.delete(':id/order',deleteOrderById)


module.exports = router;