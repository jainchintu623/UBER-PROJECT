const userModel = require('../models/User.model');
 const userService = require('../Services/User.Service');
  const{validationResult} = require('express-validator');
const blackListTokenModel= require('../models/BlackListToken.model');

module.exports.registerUser = async(req,res,next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

    
  

  const { firstName, lastName, email , password} = req.body;

  const existUser = await userModel.findOne({email});
  if(existUser){
    return res.status(400).json({message: 'User already exist'})
    }

  const hashPassword = await userModel.hashPassword(password);

  const user= await userService.createUser({
    firstName,
    lastName,
    email,
    password: hashPassword
  });
  

  const token = user.generateAuthToken();

  res.status(201).json({token,user});
}

module.exports.loginUser = async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email and Password'});
    }
   const isMatch = await user.comparePassword(password);
   if(!isMatch){
    return res.status(401).json({message: 'Invalid email and Password'});
   }
   const token = user.generateAuthToken();

   res.cookie('token',token);

   res.status(200).json({token,user});
}


module.exports.getUserProfile = async (req,res,next) =>{
  res.status(200).json(req.user);
    
}

module.exports.logoutUser = async (req,res,next)=>{

    res.clearCookie('token');
    const token = req.cookies.token || (req.headers.authorization 
        ? req.headers.authorization.split(' ')[1] 
        : undefined);

        await blackListTokenModel.create({token});
         
    res.status(200).json({message: 'Logged out successfully'});
}