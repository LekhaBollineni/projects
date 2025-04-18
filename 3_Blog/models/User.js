const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password:{
        type: String,
        required: true,
        minlength: 6
    }
});

// Hash password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }catch(err){
        next(err);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

