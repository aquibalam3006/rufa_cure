const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorName: { type: String }, // Doctor ka naam (Display ke liye)
  clinicName: { type: String }, // Clinic ka naam (Rx Pad se)
  medicines: [
    {
      medicine: { type: String, required: true }, // Tumhare frontend mein 'medicine' key hai
      dosage: { type: String },
      duration: { type: String },
      instruction: { type: String } // 'Notes' ya instructions
    }
  ],
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);