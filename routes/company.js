const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createCompany } = require('../controller/companycontroller');


const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage }).fields([
    { name: 'moa', maxCount: 1 },
    { name: 'additionalCacDocs', maxCount: 1 },
    { name: 'additionalDocs', maxCount: 1 },
    { name: 'foc', maxCount: 1 }
  ]);
  
router.post('/create-company', upload, createCompany)



module.exports = router; // Export the router
