const mongoose = require('mongoose');

const patientReportSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  patientName: { type: String, required: true }, // Future me patientId se replace kar sakte hain
  title: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Server path jahan file save hogi
  date: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PatientReport', patientReportSchema);