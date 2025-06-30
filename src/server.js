const express = require('express');
require('dotenv').config();
const app = express();






console.log(process.env.PORT);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Backend server is running on port ${PORT}`);
    
})