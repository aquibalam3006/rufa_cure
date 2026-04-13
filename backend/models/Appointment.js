const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true },
  patientMobile: { type: String, required: true },
  patientEmail: { type: String },
  speciality: { type: String, required: true },
  doctorName: { type: String, required: true },
  dateTime: { type: String, required: true },
  message: { type: String },
  fee: { type: Number },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
  paymentStatus: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);