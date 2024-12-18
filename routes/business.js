const express = require('express');
const router = express.Router();
const {  registerBusiness } = require('../controller/businessController');

router.post('/business',  registerBusiness);

module.exports = router;
