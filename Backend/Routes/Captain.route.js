const express = require('express');
const router =  express.Router();
const {body} = require('express-validator');
const captainController = require('../Controllers/Captain.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('firstName').isLength({min:3}).withMessage('First name must be at least 3 characters'),
    body('lastName').isLength({min:3}).withMessage('Last name must be at least 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters'),
    body('vehicle.color').isLength({min: 3}).withMessage('color must be at least 3 characters'),
    body('vehicle.plate').isLength({min: 3}).withMessage('model must be at least 3 characters'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('model must be at least 1 characters'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid VehicleType'),
],
 captainController.registerCaptain
)


module.exports = router;