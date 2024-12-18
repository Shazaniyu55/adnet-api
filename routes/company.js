const express = require('express');
const router = express.Router();
const multer = require('multer');
// const { uploadCompanyDocs } = require('../config/multerConfig'); // Import multer configuration
const { createCompany } = require('../controller/companycontroller');


const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });


router.post('create-company', upload.single('image'), createCompany)



// Upload middleware for company documents
// const uploadCompanyDocs = multer({
//     storage: companyDocStorage,
//     fileFilter: (req, file, cb) => {
//       const allowedTypes = [
//         'application/pdf',
//       ];
//       if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//       } else {
//         cb(new Error('Unsupported file type for documents'), false);
//       }
//     },
//   });

// router.post(
//   '/create-company',
//   uploadCompanyDocs.fields([
//     { name: 'additionalCacDocs', maxCount: 1 },
//     { name: 'moa', maxCount: 1 },
//     { name: 'foc', maxCount: 1 },
//     { name: 'shareholderAgreement', maxCount: 1 },
//     { name: 'additionalDocs', maxCount: 1 },
//     { name: 'verificationDocs', maxCount: 1 },
//   ]),
//   createCompany
// );

module.exports = router; // Export the router
