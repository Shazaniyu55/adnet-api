const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  amount: {
      type: Number,
      required: true
  },
  bankDetails: {
      accountNumber: String,
      accountName: String,
      bankName: String,
  },
  status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
  },

  createdAt: {
      type: Date,
      default: Date.now
  }
});




const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
