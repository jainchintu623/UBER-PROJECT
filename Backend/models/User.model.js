const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String ,
        required: true,
        minlength:[3, 'First name must be a least 3 characters long'],
    },
    lastName:{
        type:String,
        required: false,
        minlength:[3, 'First name must be a least 3 characters long'],
    },
    email:{
        type:String,
        required: true,
        unique:true,
        minlength:[5. ,'Email must be at least 5 Characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
})

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

UserSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,13);
}

const userModel = mongoose.model('user',UserSchema);

module.exports = userModel;
