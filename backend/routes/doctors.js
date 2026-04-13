const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Models Import
const DoctorProfile = require('../models/DoctorProfile');
const Medicine = require('../models/Medicine');
const PatientReport = require('../models/PatientReport');

// --- MULTER CONFIGURATION FOR FILE UPLOADS ---
const storage = multer.diskStorage({
  destination: './uploads/docs/',
  filename: (req, file, cb) => {
    cb(null, `FILE-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });


// ==========================================
// 1. DOCTOR PROFILE APIs
// ==========================================

// Get Single Doctor Profile (Dashboard ke top right nav ke liye)
router.get('/detail/:userId', async (req, res) => {
  try {
    const profile = await DoctorProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ ok: false, message: "Profile not found" });
    
    res.json({ ok: true, profile });
  } catch (err) { 
    res.status(500).json({ ok: false, message: err.message }); 
  }
});

// Create/Update Profile (DoctorProfileForm se data yahan aayega)
router.post('/setup-profile', upload.fields([
  { name: 'aadharCard' }, { name: 'panCardDoc' }, { name: 'medicalDegree' }, { name: 'mciCertificate' }, { name: 'clinicRegProof' }
]), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    
    const existing = await DoctorProfile.findOne({ userId: data.userId });
    
    const updateData = {
      ...data,
      specialization: data.specialization ? data.specialization.split(',') : [],
      languagesSpoken: data.languagesSpoken ? data.languagesSpoken.split(',') : [],
      documents: files ? {
        aadharCard: files.aadharCard ? files.aadharCard[0].path : existing?.documents?.aadharCard,
        panCardDoc: files.panCardDoc ? files.panCardDoc[0].path : existing?.documents?.panCardDoc,
        medicalDegree: files.medicalDegree ? files.medicalDegree[0].path : existing?.documents?.medicalDegree,
        mciCertificate: files.mciCertificate ? files.mciCertificate[0].path : existing?.documents?.mciCertificate,
        clinicRegProof: files.clinicRegProof ? files.clinicRegProof[0].path : existing?.documents?.clinicRegProof
      } : existing?.documents,
      banking: {
        accountHolderName: data.accountHolderName,
        accountNumber: data.accountNumber,
        ifscCode: data.ifscCode,
        panCardNumber: data.panCardNumber,
        upiId: data.upiId
      }
    };

    const profile = await DoctorProfile.findOneAndUpdate(
      { userId: data.userId },
      updateData,
      { upsert: true, new: true }
    );

    res.json({ ok: true, message: "Profile saved successfully! Waiting for admin approval.", profile });
  } catch (err) { 
    res.status(500).json({ ok: false, message: err.message }); 
  }
});


// ==========================================
// 2. MEDICATIONS INVENTORY APIs
// ==========================================

// Add New Medicine
router.post('/medicine/add', async (req, res) => {
  try {
    const { doctorId, name, category, stock, price, status } = req.body;
    const newMedicine = new Medicine({ doctorId, name, category, stock, price, status });
    await newMedicine.save();
    res.json({ ok: true, message: "Medicine added successfully", medicine: newMedicine });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

// Get All Medicines for a specific doctor
router.get('/medicines/:doctorId', async (req, res) => {
  try {
    const medicines = await Medicine.find({ doctorId: req.params.doctorId }).sort({ createdAt: -1 });
    res.json({ ok: true, medicines });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});


// ==========================================
// 3. PATIENT LAB REPORTS APIs
// ==========================================

// Upload a Lab Report
router.post('/report/upload', upload.single('reportFile'), async (req, res) => {
  try {
    const { doctorId, patientName, title, date } = req.body;
    if (!req.file) return res.status(400).json({ ok: false, message: "No file uploaded" });

    const newReport = new PatientReport({
      doctorId,
      patientName,
      title,
      date,
      fileUrl: req.file.path // File ka raasta save kar rahe hain
    });

    await newReport.save();
    res.json({ ok: true, message: "Report uploaded successfully", report: newReport });
  } catch (err) {
    res.status(500).json({ ok: false, message: err.message });
  }
});

module.exports = router;