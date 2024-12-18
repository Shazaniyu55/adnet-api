// const cloudinary = require('../config/cloudinaryConfig'); // Cloudinary config
const BusinessRegistration = require('../model/business'); // Business model
const cloudinary = require('../cloudinary');
const streamifier = require('streamifier');
const multer = require('multer')


const upload = multer.memoryStorage()
const storage = multer(upload)

// Controller for handling business registration
const registerBusiness = async (req, res) => {
  try {
    const {userId, businessName, businessType, businessAddress, contactEmail } = req.body;

    // Check if required fields are provided
    if (!userId ||!businessName || !businessType || !businessAddress || !contactEmail) {
      return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    if(!userId){
      res.status(400).json({satus:"failed", message: "invalid user try to login..."})
    }

    // Check if the business already exists
    const existingBusiness = await BusinessRegistration.findOne({
      $or: [{ businessName }, { contactEmail }],
    });

    if (existingBusiness) {
      return res.status(409).json({ message: 'Business with this name or email already exists.' });
    }

    // Upload company documents to Cloudinary
    if(req.file){
      const result = cloudinary.uploader.upload_stream((err, result)=>{

      });

      
    }

  

   

    const newBusiness = new BusinessRegistration();
    await newBusiness.save();

    res.status(201).json({ message: 'Business registered successfully', data: newBusiness });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerBusiness,
 
};
