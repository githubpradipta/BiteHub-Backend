const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid'],
    },
    contact: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    addresses: [{
        tag: String,
        address: {
            house: String,
            city: String,
            zip: String,
            
        },
        isActive:Boolean,
    }],
    profileImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        min: [8, "Password should be greater then 7"],
    },
    refresh_token: {
        type: String,
    },
    cart: [
        {
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish'
            },
            quantity: {
                type: Number,
            }
        }
    ],
    orders: [
        {
            dish: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dish'
            },
            Quantity: {
                type: Number,
            }
        }
    ]
},
    { timestamps: true }
);

userSchema.pre('save', async function (next) {

    try {
        this.password = await bcrypt.hash(this.password, 12);
        next();
    }
    catch (err) {
        next(err);
    }


})

const userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel,
}