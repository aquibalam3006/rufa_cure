import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function LegalHub() {
  const location = useLocation();
  // Default tab 'Terms' set kiya hai
  const [activeTab, setActiveTab] = useState('Terms');

  // Agar URL mein koi specific state (jaise Privacy Policy) pass ki gayi ho, toh wo tab khulega
  useEffect(() => {
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
    window.scrollTo(0, 0);
  }, [location]);

  const tabs = [
    { id: 'Terms', label: 'Terms & Conditions', icon: '📄' },
    { id: 'Privacy', label: 'Privacy Policy', icon: '🔒' },
    { id: 'Refund', label: 'Cancellation & Refund', icon: '💸' },
    { id: 'Returns', label: 'Pharmacy Returns', icon: '📦' },
    { id: 'Consent', label: 'Telemedicine Consent', icon: '🩺' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-16 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-20 -mr-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-gray-400 font-extrabold tracking-wider uppercase text-sm mb-4 block">RuFa Cure Trust Center</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Legal & Policies
          </h1>
          <p className="text-lg text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Transparency and trust are at the core of our services. Please read our policies carefully to understand your rights and our obligations.
          </p>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full py-12 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDEBAR (Navigation) */}
        <div className="lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-28">
            <h3 className="text-sm font-extrabold text-gray-400 uppercase tracking-wider mb-4 px-4 pt-2">Legal Hub</h3>
            <div className="flex flex-col space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${
                    activeTab === tab.id 
                      ? 'bg-[#008985] text-white shadow-md' 
                      : 'hover:bg-gray-50 text-gray-600'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span> 
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="mt-8 px-4 pb-4">
              <p className="text-xs text-gray-500 font-medium mb-3">Need clarification on any policy?</p>
              <button className="w-full bg-[#e6f4f4] text-[#008985] py-2.5 rounded-lg font-bold text-sm hover:bg-[#b3e5e1] transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT AREA (Policy Text) */}
        <div className="lg:w-3/4 bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 min-h-[600px]">
          
          {/* Last Updated Tag */}
          <div className="flex items-center gap-2 mb-8 pb-6 border-b border-gray-100">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <p className="text-sm font-bold text-gray-500">Last Updated: <span className="text-gray-800">March 25, 2026</span></p>
          </div>

          {/* POLICY CONTENT SWITCHER */}
          <div className="prose prose-teal max-w-none">
            
            {/* TERMS & CONDITIONS */}
            {activeTab === 'Terms' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Terms & Conditions</h2>
                
                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Introduction</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  Welcome to RuFa Cure. These Terms of Use ("Terms") govern your access to and use of the RuFa Cure website, mobile applications, and services (collectively, the "Platform"). By accessing or using the Platform, you agree to be bound by these Terms.
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Medical Disclaimer</h3>
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg mb-6">
                  <p className="text-orange-800 font-medium text-sm m-0">
                    <strong>CRITICAL NOTICE:</strong> The content on RuFa Cure is for informational purposes only. Our telemedicine services and digital health tools (including the Cough Scanner) do not replace professional physical medical diagnosis or emergency care. In case of a medical emergency, please call your local emergency number immediately.
                  </p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. User Accounts & Responsibilities</h3>
                <ul className="list-disc pl-5 text-gray-600 space-y-2 font-medium mb-6">
                  <li>You must be at least 18 years old to create an account.</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                  <li>You agree to provide accurate, current, and complete information during registration.</li>
                  <li>RuFa Cure reserves the right to suspend or terminate accounts that violate these terms.</li>
                </ul>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Doctor-Patient Relationship</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  The Platform facilitates communication between you and registered medical practitioners. The doctor-patient relationship is solely between you and the respective practitioner. RuFa Cure acts only as an intermediary technology platform and does not assume liability for the medical advice provided.
                </p>
              </div>
            )}

            {/* PRIVACY POLICY */}
            {activeTab === 'Privacy' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Privacy Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-8 font-medium">
                  Your privacy is paramount. This Privacy Policy outlines how RuFa Cure collects, uses, and safeguards your Personal Health Information (PHI) in compliance with global healthcare data protection standards (such as HIPAA guidelines).
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Data We Collect</h3>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6">
                  <ul className="space-y-4 text-gray-600 font-medium">
                    <li className="flex gap-3"><span className="text-[#008985]">✓</span> <strong>Personal Details:</strong> Name, age, gender, contact information.</li>
                    <li className="flex gap-3"><span className="text-[#008985]">✓</span> <strong>Health Data:</strong> Medical history, lab reports, prescriptions, and consultation notes.</li>
                    <li className="flex gap-3"><span className="text-[#008985]">✓</span> <strong>Technical Data:</strong> IP address, device type, and app usage analytics.</li>
                  </ul>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">How We Protect Your Data</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  All data transmitted between your device and our servers is encrypted using industry-standard 256-bit AES encryption. Our databases are secured within private networks with strict access controls. We do NOT sell your personal health data to third-party advertisers.
                </p>
              </div>
            )}

            {/* CANCELLATION & REFUND */}
            {activeTab === 'Refund' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Cancellation & Refund Policy</h2>
                
                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Consultation Cancellations</h3>
                <table className="w-full text-left mb-8 border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-sm">
                      <th className="py-3 px-4 font-bold text-gray-700">Cancellation Time</th>
                      <th className="py-3 px-4 font-bold text-gray-700">Refund Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-medium text-gray-600">
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">Up to 2 hours before appointment</td>
                      <td className="py-3 px-4 text-green-600 font-bold">100% Full Refund</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">Within 2 hours of appointment</td>
                      <td className="py-3 px-4 text-orange-500 font-bold">50% Partial Refund</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">No-show by patient</td>
                      <td className="py-3 px-4 text-red-500 font-bold">No Refund</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 px-4">Doctor cancels / Unavailable</td>
                      <td className="py-3 px-4 text-green-600 font-bold">100% Full Refund</td>
                    </tr>
                  </tbody>
                </table>

                <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">Refund Processing</h3>
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  Approved refunds are processed automatically to the original payment method. Depending on your bank or credit card provider, it may take 5-7 business days for the amount to reflect in your account.
                </p>
              </div>
            )}

            {/* PHARMACY RETURNS */}
            {activeTab === 'Returns' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Pharmacy Returns Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  For hygiene and safety reasons, medications purchased through the RuFa Cure Online Pharmacy are subject to strict return guidelines.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-green-200 bg-green-50 p-6 rounded-2xl">
                    <h4 className="font-extrabold text-green-800 mb-2 flex items-center gap-2"><span>✅</span> Returnable Items</h4>
                    <p className="text-sm text-green-700 font-medium">Wrong medicines delivered, expired medicines received, or damaged packaging at the time of delivery.</p>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-6 rounded-2xl">
                    <h4 className="font-extrabold text-red-800 mb-2 flex items-center gap-2"><span>❌</span> Non-Returnable Items</h4>
                    <p className="text-sm text-red-700 font-medium">Opened blister packs, injections, vaccines, temperature-sensitive drugs, and unsealed syrups.</p>
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-4 font-medium">
                  Return requests must be initiated within 48 hours of delivery. Our delivery partner will collect the items, and a refund will be processed post-quality check.
                </p>
              </div>
            )}

            {/* TELEMEDICINE CONSENT */}
            {activeTab === 'Consent' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Telemedicine Consent</h2>
                <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                  By booking an online video, audio, or chat consultation on RuFa Cure, you acknowledge and provide explicit consent to the following:
                </p>

                <ul className="list-decimal pl-5 text-gray-600 space-y-4 font-medium mb-6">
                  <li><strong>Nature of Telemedicine:</strong> I understand that telemedicine involves the use of electronic communications to enable healthcare providers to share individual patient medical information for the purpose of improving patient care.</li>
                  <li><strong>Limitations:</strong> I understand that physical examination is not possible during a tele-consultation. Therefore, the diagnosis relies heavily on the accuracy of the information and symptoms I provide.</li>
                  <li><strong>Technical Failures:</strong> I understand that in rare cases, information transmitted may not be sufficient (e.g., poor resolution of images) or technological failures may cause delays in medical evaluation.</li>
                  <li><strong>Recording:</strong> I consent to the secure recording of audio/video sessions solely for quality assurance, medical record keeping, and legal compliance purposes, accessible only by authorized personnel.</li>
                </ul>
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LegalHub;