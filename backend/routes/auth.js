const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const DoctorProfile = require('../models/DoctorProfile');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'rufacure_secret_key_2026';

// 1. REGISTER & SEND REAL OTP (ZeptoMail)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ ok: false, message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🚀 Generate Real 6-Digit OTP & Set Expiry (10 mins)
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user = new User({ 
      name, 
      email, 
      phone, 
      password: hashedPassword, 
      role: role || 'patient', 
      verificationCode, // Naya Random OTP
      resetPasswordToken: otpExpires // Temporary field used for expiry check
    });

    await user.save();

    // 🚀 Send Email via ZeptoMail API
    const zeptoUrl = "https://api.zeptomail.in/v1.1/email";
    const zeptoOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": process.env.ZEPTO_MAIL_TOKEN // Make sure this is in your .env
      },
      body: JSON.stringify({
        "from": { "address": "support@rufacure.in", "name": "RuFa Cure Team" }, 
        "to": [{ "email_address": { "address": email, "name": name } }],
        "subject": "RuFa Cure - Email Verification OTP",
        "htmlbody": `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; background-color: #f4f7f9; border-radius: 10px;">
            <h2 style="color: #008985;">Welcome to RuFa Cure!</h2>
            <p style="color: #555; font-size: 16px;">Hi ${name},</p>
            <p style="color: #555; font-size: 16px;">Your OTP for email verification is:</p>
            <h1 style="font-size: 40px; letter-spacing: 5px; color: #333; background: #fff; padding: 10px; border-radius: 8px; border: 1px dashed #008985; display: inline-block;">${verificationCode}</h1>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          </div>
        `
      })
    };

    const emailResponse = await fetch(zeptoUrl, zeptoOptions);
    if(emailResponse.ok) {
       res.json({ ok: true, message: 'Registration successful! Verification code sent to your email.' });
    } else {
       await User.findByIdAndDelete(user._id); // Delete user if email fails
       res.status(500).json({ ok: false, message: 'Failed to send OTP email.' });
    }

  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server Error' });
  }
});

// 2. VERIFY EMAIL (Check Real OTP)
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
    
    // Check if OTP matches
    if (user.verificationCode !== code) return res.status(400).json({ ok: false, message: 'Invalid OTP!' });
    
    // Check Expiry (Stored temporarily in resetPasswordToken)
    if (user.resetPasswordToken < Date.now()) return res.status(400).json({ ok: false, message: 'OTP Expired! Please register again.' });

    user.isVerified = true;
    user.verificationCode = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      ok: true, 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// 3. LOGIN (With Smart Redirect Flag)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ ok: false, message: 'Invalid Credentials' });
    if (!user.isVerified) return res.status(400).json({ ok: false, message: 'Please verify your email first' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ ok: false, message: 'Invalid Credentials' });

    let hasProfile = false;
    if (user.role === 'doctor') {
      const profile = await DoctorProfile.findOne({ userId: user._id });
      if (profile) hasProfile = true;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      ok: true,
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        hasProfile 
      }
    });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});


// 4. FORGOT PASSWORD (Real OTP via ZeptoMail)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ ok: false, message: 'User not found with this email.' });
    }

    // 🚀 Generate 6-Digit Reset OTP
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = resetOtp; // Saving OTP temporarily
    await user.save();

    // 🚀 Send Email via ZeptoMail API
    const zeptoUrl = "https://api.zeptomail.in/v1.1/email";
    const zeptoOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": process.env.ZEPTO_MAIL_TOKEN 
      },
      body: JSON.stringify({
        "from": { "address": "support@rufacure.in", "name": "RuFa Cure Support" }, 
        "to": [{ "email_address": { "address": email, "name": user.name } }],
        "subject": "RuFa Cure - Password Reset OTP",
        "htmlbody": `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px; background-color: #f4f7f9; border-radius: 10px;">
            <h2 style="color: #008985;">Password Reset Request</h2>
            <p style="color: #555; font-size: 16px;">Hi ${user.name},</p>
            <p style="color: #555; font-size: 16px;">We received a request to reset your password. Here is your OTP:</p>
            <h1 style="font-size: 40px; letter-spacing: 5px; color: #333; background: #fff; padding: 10px; border-radius: 8px; border: 1px dashed #008985; display: inline-block;">${resetOtp}</h1>
            <p style="color: #888; font-size: 14px; margin-top: 20px;">If you did not request this, please ignore this email.</p>
          </div>
        `
      })
    };

    const emailResponse = await fetch(zeptoUrl, zeptoOptions);
    if(emailResponse.ok) {
       res.json({ ok: true, message: 'OTP has been sent to your email.' });
    } else {
       res.status(500).json({ ok: false, message: 'Failed to send OTP email.' });
    }

  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// 5. RESET PASSWORD (Verifying Real OTP)
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ ok: false, message: 'User not found.' });
    }

    // 🚀 OTP MATCH CHECK
    if (!user.resetPasswordToken || user.resetPasswordToken !== otp) {
      return res.status(400).json({ ok: false, message: 'Invalid or Expired OTP.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // OTP remove kardo successful hone ke baad
    await user.save();

    res.json({ ok: true, message: 'Password has been reset successfully! You can now login.' });
  } catch (err) {
    res.status(500).json({ ok: false, message: 'Server error while resetting password.' });
  }
});

module.exports = router;