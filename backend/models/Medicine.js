const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  category: { type: String },
  stock: { type: String },
  price: { type: String },
  status: { type: String, default: 'In Stock' }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);