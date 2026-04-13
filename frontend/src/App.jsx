
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerificationPage from './pages/VerificationPage';

import PatientProfile from './pages/PatientProfile';
import DoctorProfile from './pages/DoctorProfile';
// -------------------------


import AppointmentPage from './pages/AppointmentPage';
import PaymentPage from './pages/PaymentPage';
import DoctorsList from './pages/DoctorsList'; 
import DoctorProfileForm from './pages/DoctorProfileForm';
import DoctorDashboard from './pages/DoctorDashboard';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Blog from './pages/Blog';


import AskRufa from './pages/AskRufa';


import LegalHub from './pages/LegalHub';
import HelpSupport from './pages/HelpSupport';
import CorporatePortal from './pages/CorporatePortal';
import LabTests from './pages/LabTests';
import Momverse from './pages/Momverse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        
        
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/set-new-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<VerificationPage />} />
        
        <Route path="/profile" element={<PatientProfile />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
        
        <Route path="/appointment" element={<AppointmentPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/doctors" element={<DoctorsList />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />


        <Route path="/ask-rufa" element={<AskRufa />} />

        
       <Route path="/doctor/setup-profile" element={<DoctorProfileForm />} />
       <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

       <Route path="/legal" element={<LegalHub />} />
       <Route path="/support" element={<HelpSupport />} />
       <Route path="/corporate" element={<CorporatePortal />} />
       <Route path="/lab-tests" element={<LabTests />} />
       <Route path="/momverse" element={<Momverse />} />

        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;