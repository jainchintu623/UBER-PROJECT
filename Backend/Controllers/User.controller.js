const userModel = require('../models/User.model');
 const userService = require('../Services/User.Service');
  const{validationResult} = require('express-validator');


module.exports.registerUser = async(req,res,next) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

    
  

  const { firstName, lastName, email , password} = req.body;
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