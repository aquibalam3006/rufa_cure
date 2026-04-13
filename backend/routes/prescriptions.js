const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// 1. SAVE & SEND PRESCRIPTION (Doctor Dashboard se aayega)
router.post('/send', async (req, res) => {
  try {
    const { patientId, doctorId, doctorName, clinicName, medicines } = req.body;

    const newPrescription = new Prescription({
      patientId,
      doctorId,
      doctorName,
      clinicName,
      medicines
    });

    await newPrescription.save();
    res.json({ ok: true, message: 'Prescription sent to patient successfully!', prescription: newPrescription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: 'Failed to send prescription' });
  }
});

// 2. GET PRESCRIPTIONS FOR PATIENT (Patient Dashboard ke liye)
router.get('/patient/:patientId', async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patientId: req.params.patientId })
      .sort({ createdAt: -1 });
    res.json({ ok: true, prescriptions });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Error fetching prescriptions' });
  }
});

module.exports = router;