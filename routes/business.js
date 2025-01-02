const express = require('express');
const router = express.Router();
const {  registerBusiness } = require('../controller/businessController');

const multer = require('multer');

// Set up multer storage configuration
const storage = multer.memoryStorage(); // Store files in memory for Cloudinary upload
const upload = multer({ storage }).fields([
  { name: 'moa', maxCount: 1 },
  { name: 'additionalCacDocs', maxCount: 1 },
  { name: 'additionalDocs', maxCount: 1 },
  { name: 'foc', maxCount: 1 }
]);




router.post('/create-business', upload,  registerBusiness);

module.exports = router;
