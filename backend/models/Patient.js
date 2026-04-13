const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uhid: { type: String, unique: true },
  dob: { type: String },
  gender: { type: String },
  bloodGroup: { type: String },
  height: { type: String },
  weight: { type: String },
  bp: { type: String },
  heartRate: { type: String },
  emergencyContact: {
    name: { type: String },
    relation: { type: String },
    phone: { type: String }
  },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String }
  },
  profilePic: { type: String },
  medicalRecords: [
    {
      title: { type: String },
      type: { type: String },
      date: { type: String },
      doctor: { type: String },
      fileUrl: { type: String },
      fileName: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Patient', patientSchema);