const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// API: Naya appointment book karne ke liye
router.post('/book', async (req, res) => {
  try {
    const { patientId, name, mobile, email, speciality, doctor, dateTime, message, fee } = req.body;

    const newAppointment = new Appointment({
      patientId,
      patientName: name,
      patientMobile: mobile,
      patientEmail: email,
      speciality,
      doctorName: doctor,
      dateTime,
      message,
      fee
    });

    const savedAppointment = await newAppointment.save();
    res.json({ ok: true, appointmentId: savedAppointment._id, message: "Appointment initiated!" });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Booking error" });
  }
});

// 2. API: Payment confirm karne ke liye
router.post('/confirm-payment', async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // Database mein appointment update karo
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { 
        paymentStatus: 'Paid', 
        status: 'Confirmed' 
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ ok: false, message: "Appointment not found" });
    }

    res.json({ ok: true, message: "Payment updated in database!" });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Server Error" });
  }
});

// 3. API: Status check karne ke liye (Polling ke liye)
router.get('/status/:id', async (req, res) => {
  try {
    const apt = await Appointment.findById(req.params.id);
    res.json({ ok: true, paymentStatus: apt.paymentStatus });
  } catch (err) {
    res.status(500).json({ ok: false });
  }
});

module.exports = router;