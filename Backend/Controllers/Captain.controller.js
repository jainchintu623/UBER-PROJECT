const captainModel = require('../models/Captain.model');
const captainService = require('../Services/Captain.service');
const {validationResult } = require('express-validator');
const blackListTokenModel = require('../models/BlackListToken.model');

module.exports.registerCaptain = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        }

        const {firstName,lastName,email,password,vehicle} = req.body;

        const existingCaptain = await captainModel.findOne({email});

        if(existingCaptain){
            return res.status(400).json({message: 'Captain already exists'});
        }

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainService.createCaptain({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType:vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        res.status(201).json({token,captain});
}

module.exports.loginCaptain = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain){
        return res.status(401).json({message: 'Invalid email and Password'});
    }
   const isMatch = await captain.comparePassword(password);
   if(!isMatch){
    return res.status(401).json({message: 'Invalid email and Password'});
   }
   const token = captain.generateAuthToken();

   res.cookie('token',token);

   res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async (req,res,next) =>{
    res.status(200).json(req.captain);
    
  }


module.exports.logoutCaptain = async (req,res,next)=>{

    res.clearCookie('token');
    const token = req.cookies.token || (req.headers.authorization 
        ? req.headers.authorization.split(' ')[1] 
        : undefined);

        await blackListTokenModel.create({token});
         
    res.status(200).json({message: 'Captain Logged out successfully'});
}


