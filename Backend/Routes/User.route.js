const express = require('express');
const router =express.Router();
const {body} = require('express-validator');
const userController = require('../Controllers/User.controller');
const authMiddleWare = require('../Middlewares/Auth.middleware');


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').isLength({min:3}).withMessage
    ('First Name must be at least 3 character long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character long'),
    userController.registerUser
])


  router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 character'),
],
        userController.loginUser
  );


  router.get('/profile',authMiddleWare.authUser, userController.getUserProfile);
  router.get('/logout',authMiddleWare.authUser,userController.logoutUser);
module.exports = router;
