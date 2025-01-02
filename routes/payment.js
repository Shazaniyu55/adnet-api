const express = require('express');
const router = express.Router();
const 
{
    subscriptionFee,
    verifyPayment,
} = require("../controller/payment");

router.post("/subscription", subscriptionFee);
router.get('/verify-payment', verifyPayment);


module.exports = router