const Company = require('../model/company');
// const cloudinary = require('../config/cloudinaryConfig');
// const uploadToCloudinary = require('../config/multerConfig').uploadToCloudinary; // Ensure this is correctly imported
const streamifier = require('streamifier');

const createCompany = async (req, res) => {
  try {
    const {
        id,
      companyName,
      businessStructure,
      address,
      cacNumber,
      incorporationDate,
      taxId,
      shareholderAgreement,
      email,
      phone,
    } = req.body;

    // Validate required fields
    if (
        !id ||
      !companyName ||
      !businessStructure ||
      !address ||
      !cacNumber ||
      !incorporationDate ||
      !taxId ||
      !shareholderAgreement ||
      !email ||
      !phone
    ) {
      return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    // Check if the company already exists
    const existingCompany = await Company.findOne({
      $or: [{ cacNumber }, { email }],
    });

    if (existingCompany) {
      return res.status(400).json({
        message: 'A company with this CAC number or email already exists',
      });
    }

    // Upload company documents to Cloudinary
    const uploadedFiles = {};
    const fileFields = [
      'additionalCacDocs',
      'moa',
      'foc',
      'shareholderAgreement',
      'additionalDocs',
      'verificationDocs'
    ];

    for (const field of fileFields) {
      if (req.files && req.files[field]) {
        const file = req.files[field][0]; // Multer stores the file in an array
        const uploadedFile = await uploadToCloudinary(file.buffer, 'company_docs');
        uploadedFiles[field] = uploadedFile.secure_url;
      }
    }

    // Save company data in the database
    const newCompany = new Company({
        user: id,
      companyName,
      businessStructure,
      address,
      cacNumber,
      incorporationDate,
      taxId,
      shareholderAgreement,
      email,
      phone,
    //   user: req.userId, // Ensure `userId` is correctly passed from middleware or session
      ...uploadedFiles,
    });

    await newCompany.save();

    res.status(201).json({ message: 'Company created successfully!', data: newCompany });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createCompany };
