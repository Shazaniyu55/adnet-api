const Company = require('../model/company');
const cloudinary = require('../cloudinary');
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


    let moaUrl = "";
    let additionalCacDocsUrl = "";
    let additionalDocsUrl = "";
    let focUrl = "";


      // Function to handle the file uploads to Cloudinary
        const uploadFile = async (file) => {
          return new Promise((resolve, reject) => {
            if (!file) return resolve("");
            const uploaderStream = cloudinary.uploader.upload_stream(
              { resource_type: 'auto' },
              (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(result.secure_url);
                }
              }
            );
            streamifier.createReadStream(file.buffer).pipe(uploaderStream);
          });
        };
    
        // Upload documents if they exist
        if (req.files) {
          if (req.files.moa) moaUrl = await uploadFile(req.files.moa);
          if (req.files.additionalCacDocs) additionalCacDocsUrl = await uploadFile(req.files.additionalCacDocs);
          if (req.files.additionalDocs) additionalDocsUrl = await uploadFile(req.files.additionalDocs);
          if (req.files.foc) focUrl = await uploadFile(req.files.foc);
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

    });

    await newCompany.save();

    res.status(201).json({ message: 'Company created successfully!', data: newCompany });
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createCompany };
