const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'admin'], 
    default: 'patient' 
  },
  // Verification aur Security ke liye fields
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationCode: { 
    type: String 
  },
  resetPasswordToken: { 
    type: String 
  }
}, { timestamps: true }); // Isse automatically 'createdAt' aur 'updatedAt' ban jayega

module.exports = mongoose.model('User', userSchema);