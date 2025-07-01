const express = require('express');
const router = express.Router();
const { getUserProfile, createUser, loginUser } = require("../Controllers/userController")

router
.get('/profile/:id',getUserProfile)
.post('/register', createUser)
.post('/login',loginUser)

module.exports = router;