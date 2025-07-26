const mongoose = require('mongoose');

const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    unique:true
  },
  description: {
    type: String,
    maxlength: 500
  },
  address: {
    street: String,
    city: String,
    area: String,
    zip: String,
    country: {
      type: String,
      default: 'India'
    },
    
  },
  categories:[String],
  // contact: {
  //   type: String,
  //   trim: true,
  //   unique:true,
  // },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    unique:true,
  },
  img: {
    type: String,
    trim: true,
  },
  dishes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish'
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0,
    max:5,
  },
},
{ timestamps:true }
);

const restaurantModel = mongoose.model('Restaurant',restaurantSchema);

module.exports = {
    restaurantModel,
}