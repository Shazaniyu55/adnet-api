const mongoose = require('mongoose');

const businessRegistrationSchema = new mongoose.Schema({
    businessName: {
        type: String,
        required: true,
        trim: true
    },
    businessType: {
        type: String,
        required: true,
        enum: [
            'sole proprietorship', 
            'partnership', 
            'corporation', 
            'limited liability company'
        ]
    },
    businessAddress: {
        type: String,
        required: true,
        trim: true
    },
    
    contactEmail: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    
    additionalCacDocs: {
        type: String,

    },
    moa: {
        type: String,
      
    },
    foc: {
        type: String,
      
    },
    shareholderAgreement: {
        type: String,
      
    },
    additionalDocs:{
        type: String
    },

    verificationDocs:{
        type: String
    },
    
   
    bussOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BusinessRegistration', businessRegistrationSchema);
