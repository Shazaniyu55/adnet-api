const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Standard', 'Premium'], // Define the available plans
    required: true,
  },
  price: {
    type: Number,
    required: true, // Price of the subscription plan
  },
  emailLimit: {
    type: Number,
    required: true, // Maximum number of emails allowed per month
  },
});

const subscribeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPlan', // Referencing the subscription plan
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'canceled', 'expired'],
    default: 'active',
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now, // Date when the subscription starts
  },
  endDate: {
    type: Date,
    required: true, // Date when the subscription expires
  },
  remainingEmails: {
    type: Number,
    required: true, // Tracks remaining email quota for the user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = { Subscribe, SubscriptionPlan };
