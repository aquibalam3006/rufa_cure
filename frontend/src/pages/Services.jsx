import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// 🚀 Yahan humne bestDr.jpg ko import kiya hai
import bestDrImage from '../assets/bestDr.jpg';

function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-20 px-8 text-center text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-teal-200 font-extrabold tracking-wider uppercase text-sm mb-4 block">Center of Excellence</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Comprehensive Care,<br />Tailored for You.
          </h1>
          <p className="text-lg md:text-xl text-teal-100 font-medium leading-relaxed max-w-3xl mx-auto">
            From instant online consultations and AI-powered health scanners to premium memberships and international care. Discover the full spectrum of medical services at RuFa Cure.
          </p>
        </div>
      </div>

      {/* --- PRIMARY DIGITAL SERVICES --- */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Digital Health Services</h2>
          <p className="text-gray-500 font-medium mt-4 max-w-2xl mx-auto">Access world-class healthcare from the comfort of your home with our advanced digital solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Service 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 group cursor-pointer">
            <div className="w-16 h-16 bg-[#e6f4f4] rounded-2xl flex items-center justify-center text-3xl mb-6 text-[#008985] group-hover:bg-[#008985] group-hover:text-white transition">💻</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Online Doctor Consultation</h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Connect with top-tier specialists instantly via highly secure video, audio, or chat consultations. Get expert medical advice anywhere, anytime.
            </p>
            <span className="text-[#008985] font-bold group-hover:underline">Book Now ➔</span>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100 group cursor-pointer">
            <div className="w-16 h-16 bg-[#e6f4f4] rounded-2xl flex items-center justify-center text-3xl mb-6 text-[#008985] group-hover:bg-[#008985] group-hover:text-white transition">💊</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Online Medicines</h3>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Order genuine prescription drugs, over-the-counter medicines, and wellness products with fast, reliable, and trackable doorstep delivery.
            </p>
            <span className="text-[#008985] font-bold group-hover:underline">Order Now ➔</span>
          </div>

          {/* Service 3 - Highlighted Tech Feature */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-gray-700 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-extrabold px-3 py-1 rounded-bl-lg rounded-tr-2xl z-10">AI FEATURE</div>
            <div className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition">🎙️</div>
            <h3 className="text-xl font-extrabold text-white mb-3">Cough Scanner</h3>
            <p className="text-gray-400 font-medium leading-relaxed mb-6">
              Use our breakthrough AI technology to analyze your cough audio. Detect potential respiratory anomalies instantly before booking a consultation.
            </p>
            <span className="text-[#b3e5e1] font-bold group-hover:underline">Try Scanner ➔</span>
          </div>

        </div>
      </div>

      {/* --- SPECIALIZED HEALTH PROGRAMS --- */}
      <div className="bg-[#f8fdfc] py-20 border-y border-[#b3e5e1]/30">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Specialized Programs</h2>
              <p className="text-gray-500 font-medium mt-4 max-w-2xl">Clinically proven, structured programs designed for long-term wellness and chronic disease management.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center hover:border-[#008985] transition group">
              <div className="w-24 h-24 shrink-0 bg-red-50 rounded-full flex items-center justify-center text-4xl text-red-500 group-hover:scale-110 transition">🩸</div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">RuFa Cure Diabetes Reversal</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-4">
                  A comprehensive, science-backed program focusing on diet, lifestyle, and medical monitoring to help manage and potentially reverse Type 2 Diabetes.
                </p>
                <button className="text-[#008985] font-bold hover:underline">Explore Program ➔</button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center hover:border-[#008985] transition group">
              <div className="w-24 h-24 shrink-0 bg-blue-50 rounded-full flex items-center justify-center text-4xl text-blue-500 group-hover:scale-110 transition">🛡️</div>
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3">RuFa Cure Pro Health Program</h3>
                <p className="text-gray-600 font-medium leading-relaxed mb-4">
                  Preventive healthcare at its best. Get personalized full-body checkups, genetic risk profiling, and an annual wellness roadmap by senior doctors.
                </p>
                <button className="text-[#008985] font-bold hover:underline">View Packages ➔</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FIND EXPERTS & DIRECTORY --- */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-[#008985] rounded-3xl overflow-hidden shadow-xl flex flex-col lg:flex-row">
          <div className="p-10 md:p-16 lg:w-1/2 flex flex-col justify-center text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Find Your Expert</h2>
            <p className="text-teal-100 font-medium text-lg mb-10 leading-relaxed">
              Our extensive network spans across multiple cities and medical disciplines. Locate the exact specialist you need with our comprehensive doctor directory.
            </p>
            <div className="space-y-4">
              <button onClick={() => navigate('/doctors')} className="w-full bg-white/10 hover:bg-white text-white hover:text-[#008985] px-6 py-4 rounded-xl font-bold transition flex justify-between items-center border border-white/20 hover:border-white">
                <span>Doctors by Specialty</span> <span>➔</span>
              </button>
              <button className="w-full bg-white/10 hover:bg-white text-white hover:text-[#008985] px-6 py-4 rounded-xl font-bold transition flex justify-between items-center border border-white/20 hover:border-white">
                <span>Doctors by City</span> <span>➔</span>
              </button>
              <button onClick={() => navigate('/doctors')} className="w-full bg-white/10 hover:bg-white text-white hover:text-[#008985] px-6 py-4 rounded-xl font-bold transition flex justify-between items-center border border-white/20 hover:border-white">
                <span>All Doctors List</span> <span>➔</span>
              </button>
            </div>
          </div>
          
          {/* 🚀 Yahan Image Placeholder ki jagah bestDr.jpg lagaya hai */}
          <div className="lg:w-1/2 relative min-h-[300px]">
            <img 
              src={bestDrImage} 
              alt="Best Doctors Network" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
          </div>
          
        </div>
      </div>

      {/* --- MEMBERSHIP & INTERNATIONAL CARE --- */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* RuFa Circle Membership */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-10 rounded-3xl border border-yellow-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20 text-6xl">👑</div>
            <span className="bg-yellow-400 text-yellow-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Premium</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-6 mb-4">RuFa Cure Circle Membership</h3>
            <p className="text-gray-700 font-medium leading-relaxed mb-8">
              Join our exclusive health network. Enjoy benefits like zero-wait priority bookings, free routine tele-consultations, heavily discounted lab tests, and 24/7 premium support.
            </p>
            <button className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
              Explore Circle Benefits
            </button>
          </div>

          {/* International Patients */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-3xl border border-blue-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-20 text-6xl">🌍</div>
            <span className="bg-blue-200 text-blue-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">Global Care</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-6 mb-4">International Patients Login</h3>
            <p className="text-gray-700 font-medium leading-relaxed mb-8">
              Traveling for medical care? Access our dedicated international portal for visa assistance, language interpreters, seamless payment options, and premium guest relations.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
              Access Global Portal
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Services;