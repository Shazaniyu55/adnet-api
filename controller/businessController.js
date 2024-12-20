// const cloudinary = require('../config/cloudinaryConfig'); // Cloudinary config
const BusinessRegistration = require('../model/business'); // Business model
const cloudinary = require('../cloudinary');
const streamifier = require('streamifier');
const multer = require('multer')



const registerBusiness = async (req, res) => {
  try {
    const { userId, businessName, businessType, businessAddress, contactEmail } = req.body;

    // Check if required fields are provided
    if (!userId || !businessName || !businessType || !businessAddress || !contactEmail) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    if (!userId) {
      return res.status(400).json({ status: "failed", message: "Invalid user, try to login..." });
    }

    // Check if the business already exists
    const existingBusiness = await BusinessRegistration.findOne({
      $or: [{ businessName }, { contactEmail }],
    });

    if (existingBusiness) {
      return res.status(409).json({ message: 'Business with this name or email already exists.' });
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

    // Create new business entry in the database
    const newBusiness = new BusinessRegistration({
      bussOwner: userId,
      businessName,
      businessAddress,
      contactEmail,
      businessType,
      moa: moaUrl,
      additionalCacDocs: additionalCacDocsUrl,
      additionalDocs: additionalDocsUrl,
      foc: focUrl,
    });

    // Save the new business to the database
    await newBusiness.save();

    res.status(201).json({ message: 'Business registered successfully', data: newBusiness });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


module.exports = {
  registerBusiness,
 
};
