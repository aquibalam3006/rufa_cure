const mongoose = require('mongoose');

const doctorProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  
  // Basic Identity
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  
  // Professional Verification
  medicalRegNumber: { type: String },
  stateMedicalCouncil: { type: String },
  registrationYear: { type: String },
  highestQualification: { type: String },
  specialization: [{ type: String }], 
  totalExperience: { type: String },
  bio: { type: String },

  // Clinic & Availability
  clinicName: { type: String },
  clinicAddress: { type: String },
  cityPincode: { type: String },
  consultationFee: { type: String },
  languagesSpoken: [{ type: String }],
  morningSlot: { type: String },
  eveningSlot: { type: String },
  consultationType: [{ type: String }], 

  // Documents (Stored as local paths)
  documents: {
    aadharCard: String,
    panCardDoc: String,
    medicalDegree: String,
    mciCertificate: String,
    clinicRegProof: String
  },

  // Banking & Payouts (UPI included)
  banking: {
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
    panCardNumber: String,
    upiId: String
  },

  // Stats & Flags
  rating: { type: String, default: "5.0" },
  imageColor: { type: String, default: "bg-[#008985]" },
  isVerified: { type: Boolean, default: false }, 
  editCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('DoctorProfile', doctorProfileSchema);