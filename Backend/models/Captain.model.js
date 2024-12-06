const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
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
        lowercase:true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be at least 3 characters long'],
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be at least 3 characters long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1'], 
        },
        vehicleType:{
            type:String,
            required:false,
            enum:['car','motorcycle','auto'],
        },
        location:{
            lat:{
                type:Number,
            },
            len:{
                type:Number,
            }
        }

    }
})

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET,{ expiresIn: '24h' });
    return token;
}


captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain',captainSchema)

module.exports = captainModel;  