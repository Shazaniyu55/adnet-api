const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: { type: String,
         required: true
     },
        lastName: { type: String,
         required: true 
        },
     bio: { type: String

      },
     profileImageUrl: { 
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

      },
     portfolioUrl: { type: String

      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
     phone: { type: String,
         required: true
         },
     altPhone: { type: String

      },
     password: { type: String,
         required: true
         },
     streetAddress: { type: String
        , required: true
     },
     city: { type: String,
         required: true
         },
     state: { type: String,
         required: true
         },
     country: { type: String,
         required: true
         },
     zipCode: { type: String,
         required: true
         },
 
    isAdmin: {
        type: Boolean,
        default: false
    },
   
    notificationsCount: {
        type: Number,
        default: 0
    },
   
    resetToken: {
        type: String,
        default: null
    },
    resetTokenExpiry: {
        type: Date,
        default: null
    },
    subscription: {
        plan: {
          type: String,
          enum: ['Standard', 'Premium'],
          required: false,
        },
        startDate: {
          type: Date,
          required: false,
        },
        endDate: {
          type: Date,
          required: false,
        },
       
        status: {
          type: String,
          enum: ['active', 'inactive', 'canceled', 'expired'],
          default: 'inactive',
        },
      },

    firebaseUID:{
        type: String,
       default: null
    } 
   
}, {
    timestamps: true
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare hashed passwords
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};


module.exports = mongoose.model('User', userSchema);
