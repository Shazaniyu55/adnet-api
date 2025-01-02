const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
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
    type:Number
  },

  description:{
    type: String
  },

  amount:{
    type:Number
  },

  total:{
    type: Number
  },



  createdAt: {
      type: Date,
      default: Date.now
  }
});




const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
