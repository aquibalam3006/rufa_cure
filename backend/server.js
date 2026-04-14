const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Dotenv sabse upar hona chahiye taaki process.env load ho sake
dotenv.config();

// 2. Import Routes
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const prescriptionRoutes = require('./routes/prescriptions');
const patientRoutes = require('./routes/patients');
const adminRoutes = require('./routes/admin');
const app = express();



// ==========================================
// 🚀 1. BULLETPROOF CORS SETUP FOR VERCEL
// ==========================================
const frontendUrl = process.env.FRONTEND_URL || 'https://rufa-cure-wwzk.vercel.app';

app.use(cors({
  origin: frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Vercel par Preflight (OPTIONS) request ko handle karne ke liye fallback
app.options('*', cors());

// 3. Middlewares
// CORS ko allow kar rahe hain frontend (3000 ya 5173) ke liye
app.use(cors()); 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/patients', patientRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/appointments', appointmentRoutes);

// 4. Database Connection
// Connection options add kiye hain taaki connection reset na ho
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ RuFa Cure MongoDB Connected Successfully!'))
  .catch((error) => {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1); // Agar DB connect na ho toh server stop kar do
  });

// 5. API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/appointments', appointmentRoutes);

// 6. Test Route
app.get('/', (req, res) => {
  res.status(200).send("RuFa Cure Backend Server is Live and Healthy! 🚀");
});

// 7. Error Handling Middleware (Ye crash hone se bachayega)
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({ ok: false, message: "Something went wrong on the server!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});