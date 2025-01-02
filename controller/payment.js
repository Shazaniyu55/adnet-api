const Payment = require('../model/payment');
const User = require("../model/user");
const Subscribe = require('../model/subscribe');
const axios = require("axios");
require("dotenv").config();



const subscriptionFee = async (req, res) => {``
  const { email, name, package, userId } = req.body;

  const paymentData = {
    public_key: process.env.PUBLIC_KEY,
    email: email,
    name: name,
    subscription: package,
    currency: 'NGN',
    source: 'docs-html-test',
    user: userId,
    amount: package 
  };

  try {
    // Make the API request to Paystack
    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      amount: package * 100,
      currency: 'NGN',
      callback_url: `http://localhost:4200/api/payment/verify-payment?userId=${userId}`,
      email: email,
      name: name,
    }, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRETE}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.data.status) {
      const paymentLink = response.data.data.authorization_url; // This link is where you should redirect the user to
      const tx_ref = response.data.data.reference; // Use the Paystack reference as tx_ref

      // Update paymentData to include the tx_ref from Paystack
      paymentData.tx_ref = tx_ref;
        console.log(paymentLink)
      // Save the payment data to your database
      // const payment = new Subscribe(paymentData);
      // await payment.save();
      
      res.status(200).json({status: "success", message: paymentLink}); // Redirect user to the payment page
    } else {
      res.status(400).json({ success: false, message: 'Payment initialization failed' });
    }
  } catch (error) {
    console.error('Error preparing payment redirect:', error);
    res.status(500).json({ success: false, message: 'Failed to prepare payment redirect' });
  }
};


const verifyPayment = async (req, res) => {
  const { reference, userId, plan} = req.query;

  if (!reference || !userId) {
    return res.status(400).json({ success: false, message: 'Missing required parameters' });
  }

  try {
    // Verify payment with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRETE}`, // Replace with your Paystack secret key
        },
      }
    );

    if (response.data.status && response.data.data.status === 'success') {
      // Payment verified; update user's subscription
      const planDetails = {
        Standard: { price: 1000, emailLimit: 1000 }, // Define your plans
        Premium: { price: 5000, emailLimit: 5000 },
      };

      const selectedPlan = planDetails[plan];

      await User.findByIdAndUpdate(userId, {
        subscription: {
          plan,
          startDate: new Date(),
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1-month duration
          remainingEmails: selectedPlan.emailLimit,
          status: 'active',
        },
      });

      return res.status(200).json({ message: 'Payment verified and subscription updated' });
    } else {
      return res.status(400).json({ message: 'Payment verification failed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred during verification' });
  }
};





module.exports = 
{

  subscriptionFee, 
  verifyPayment,
 
}
