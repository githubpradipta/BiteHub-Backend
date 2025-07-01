const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
   name: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Chinise', 'Indian', 'Continantal', 'Desserts', 'Drinks', 'Burgers', 'Pizzas','Others'],
    default: 'Others'
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isVeg:{
    type:Boolean,
  },
  isBest:{
    type:Boolean,
  },
  Quantity:{
    type:Number,
    min:[0,"Quantity must be a positive number"],
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: [true, 'Dish must belong to a restaurant'],
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String,
        maxlength: 300
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
},
{ timestamps:true }
);

const dishModel = mongoose.model('Dish',dishSchema);

module.exports = {
    dishModel,
}