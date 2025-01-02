const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  amount: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// // Pre-save hook to calculate the total automatically
// salesSchema.pre('save', function (next) {
//   if (!this.total) {
//     this.total = this.quantity * this.amount;
//   }
//   next();
// });

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
