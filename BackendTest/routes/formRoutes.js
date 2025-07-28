const express = require('express');
const { basicDetails, cardDetails, verifyOtp, getAllUserDetails } = require('../controller/detailsController');
const router = express.Router();
router.get('/home' , (req , res)=>{
    console.log('Connected to The routed');
    res.send('hello keshu')
});
router.post('/basic' , basicDetails);
router.post('/card' , cardDetails);
router.post('/otp' , verifyOtp);
router.get('/users' , getAllUserDetails)
module.exports = router;