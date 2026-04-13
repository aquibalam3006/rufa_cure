const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const DoctorProfile = require('../models/DoctorProfile'); // Doctor data fetch karne ke liye

// 1. Admin Login API (Ye aapka pehle se hai)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const adminUser = await Admin.findOne({ email: email });
    if (!adminUser) return res.status(401).json({ ok: false, message: 'Invalid Admin Email!' });

    const isPasswordValid = await bcrypt.compare(password, adminUser.password);
    if (!isPasswordValid) return res.status(401).json({ ok: false, message: 'Invalid Password!' });

    const token = jwt.sign(
      { id: adminUser._id, role: adminUser.role, email: adminUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({
      ok: true, token: token,
      admin: { name: 'Super Admin', role: adminUser.role, email: adminUser.email }
    });
  } catch (error) {
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// ==========================================
// 🚀 NAYE ADMIN APIs (Dashboard ke liye)
// ==========================================

// 2. Pending Doctors List lana (Jo Verify nahi hue)
router.get('/pending-doctors', async (req, res) => {
  try {
    const pendingDoctors = await DoctorProfile.find({ isVerified: false }).sort({ createdAt: -1 });
    res.json({ ok: true, doctors: pendingDoctors });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// 3. Active Doctors List lana (Jo Verify ho chuke hain)
router.get('/active-doctors', async (req, res) => {
  try {
    const activeDoctors = await DoctorProfile.find({ isVerified: true }).sort({ createdAt: -1 });
    res.json({ ok: true, doctors: activeDoctors });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// 4. Approve Doctor API (Verify True karna)
router.put('/approve-doctor/:id', async (req, res) => {
  try {
    await DoctorProfile.findByIdAndUpdate(req.params.id, { isVerified: true });
    // Yahan aage chal kar hum Email bhejne ka code bhi dal sakte hain
    res.json({ ok: true, message: "Doctor Approved Successfully!" });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

// 5. Reject Doctor API (Data Delete karna ya status change karna)
router.delete('/reject-doctor/:id', async (req, res) => {
  try {
    await DoctorProfile.findByIdAndDelete(req.params.id);
    res.json({ ok: true, message: "Doctor Application Rejected & Removed." });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
});

module.exports = router;