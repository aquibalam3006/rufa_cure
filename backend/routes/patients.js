const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Patient = require('../models/Patient');

// ==========================================
// 🚀 MULTER CONFIGURATION FOR VERCEL
// ==========================================
// Vercel serverless hai (read-only system), isliye diskStorage ki jagah memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1. Get Profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.params.userId }).populate('userId', 'name email phone');
    res.json({ ok: true, patient });
  } catch (err) { res.status(500).json({ ok: false }); }
});

// 2. Update Profile & Vitals (Age calculate hoke aayegi frontend se)
router.post('/update', async (req, res) => {
  try {
    const { userId, ...updateData } = req.body;
    const patient = await Patient.findOneAndUpdate({ userId }, { $set: updateData }, { new: true, upsert: true });
    res.json({ ok: true, patient });
  } catch (err) { res.status(500).json({ ok: false }); }
});

// 3. Upload Medical Record (Multer API)
router.post('/upload-record/:userId', upload.single('recordFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, message: "No file uploaded" });
    }

    // Kyunki hum memoryStorage use kar rahe hain, req.file.filename nahi hoga.
    // Temporary Vercel fix ke liye originalname use kar rahe hain bina localhost ke.
    const fileUrl = `Temp-Vercel-${req.file.originalname}`;
    
    const newRecord = {
      title: req.body.title || req.file.originalname,
      type: req.body.type || 'Lab Report',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      doctor: 'Self Uploaded',
      fileUrl: fileUrl,
      fileName: req.file.originalname
    };

    const patient = await Patient.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { medicalRecords: newRecord } },
      { new: true, upsert: true }
    );
    res.json({ ok: true, record: newRecord });
  } catch (err) { 
    res.status(500).json({ ok: false, message: err.message }); 
  }
});

module.exports = router;