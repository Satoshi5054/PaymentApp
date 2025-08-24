const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://**.pfj4nck.mongodb.net/PaymentApp");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

// Create a User Schema model 
const User = mongoose.model('User', userSchema);

//Create a Schema for balsnce
const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
})

// Create a Balance Schema model 
const Account = mongoose.model('Account',balanceSchema)

module.exports = {
	User,
    Account
};