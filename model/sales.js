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
    type:String
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




const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
