const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to User model
  companyName: { type: String, required: true },
  businessStructure: { type: String, required: true },
  address: { type: String, required: true },
  cacNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  additionalCacDocs: String,
  moa: String,
  foc: String,
  shareholderAgreement: String,
  additionalDocs: String,
  verificationDocs: String,
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
