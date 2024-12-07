const captainModel = require('../models/Captain.model');


module.exports.createCaptain = async ({
    firstName,lastName,email,password,color,plate,capacity,vehicleType
})=>{
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error("All fields are required");
    }

    const captain = captainModel.create({
        firstName,
        lastName,
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}