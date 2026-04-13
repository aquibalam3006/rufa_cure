import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// 🚀 Yahan humne trust.jpg ko import kiya hai
import trustImage from '../assets/trust.jpg';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-20 px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-20 -mb-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Healing with Compassion.<br />Driven by Technology.
          </h1>
          <p className="text-lg md:text-xl text-teal-100 font-medium leading-relaxed">
            At RuFa Cure, we don't just treat symptoms; we care for people. Our mission is to bridge the gap between world-class medical experts and patients who need them, making quality healthcare accessible, transparent, and hassle-free.
          </p>
        </div>
      </div>

      {/* --- OUR STORY / MISSION --- */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#008985] font-extrabold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Why We Built RuFa Cure</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We realized that finding the right doctor and managing medical appointments was often stressful and confusing. Patients spent hours waiting, and doctors struggled with inefficient clinic management. 
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              RuFa Cure was born out of a simple idea: <strong className="text-gray-800">Healthcare should be focused on healing, not administration.</strong> We built a smart, secure, and patient-first platform where you can find highly verified specialists, book appointments instantly, and manage your health records seamlessly.
            </p>
            
            <div className="flex gap-6">
              <div className="border-l-4 border-[#008985] pl-4">
                <p className="text-3xl font-extrabold text-gray-900">5M+</p>
                <p className="text-sm font-bold text-gray-500 mt-1">Patients Trusted Us</p>
              </div>
              <div className="border-l-4 border-[#008985] pl-4">
                <p className="text-3xl font-extrabold text-gray-900">1200+</p>
                <p className="text-sm font-bold text-gray-500 mt-1">Verified Doctors</p>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-[#e6f4f4] rounded-full absolute -top-4 -left-4 w-full h-full z-0"></div>
            {/* 🚀 Yahan image set ki gayi hai aur 'object-cover' se fit kiya gaya hai */}
            <div className="aspect-square bg-gray-200 rounded-3xl relative z-10 overflow-hidden shadow-2xl border-8 border-white flex items-center justify-center">
              <img 
                src={trustImage} 
                alt="RuFa Cure Hospital Trust" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- CORE VALUES (Trust Building) --- */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[#008985] font-extrabold tracking-wider uppercase text-sm mb-2 block">Our Pillars of Trust</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">What We Stand For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition">🛡️</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">Strict Verification</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Every doctor on RuFa Cure goes through a rigorous multi-step background check. We verify their medical licenses, qualifications, and track records so you are always in safe hands.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-[#e6f4f4] p-10 rounded-3xl border border-[#b3e5e1] hover:shadow-xl transition duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition text-[#008985]">🤝</div>
              <h3 className="text-xl font-extrabold text-[#008985] mb-4">Patient-First Approach</h3>
              <p className="text-[#005a57] leading-relaxed font-medium">
                From transparent consultation fees to secure management of your private medical data, every feature we build is designed keeping your comfort, privacy, and health as our top priority.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition">⚡</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">Seamless Technology</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                No more waiting in long queues or dealing with lost paper prescriptions. Our smart dashboard keeps your appointments, lab reports, and doctor communications all in one secure place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MANAGEMENT / LEADERSHIP MESSAGE --- */}
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="bg-gray-900 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[#008985] opacity-20 text-[200px] leading-none -mt-10 -mr-10">"</div>
          
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 bg-gray-700 rounded-full border-4 border-[#008985] overflow-hidden flex items-center justify-center z-10">
             <p className="text-gray-400 text-xs italic">Founder Image</p>
          </div>
          
          <div className="z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-6 leading-snug">
              "We don't just manage hospitals; we manage hopes. When you book an appointment on RuFa Cure, you are trusting us with your life, and we take that responsibility very seriously."
            </h3>
            <div>
              <p className="text-[#008985] font-extrabold text-lg">MD AQUIB ALAM</p>
              <p className="text-gray-400 font-medium">Founder & CEO, RuFa Cure</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="bg-[#008985] py-16 text-center text-white px-8 mt-auto">
        <h2 className="text-3xl font-extrabold mb-4">Ready to prioritize your health?</h2>
        <p className="text-teal-100 font-medium mb-8 max-w-2xl mx-auto">
          Join millions of patients who trust RuFa Cure for their daily healthcare needs. Find your specialist and book a consultation today.
        </p>
        <button 
          onClick={() => navigate('/doctors')}
          className="bg-white text-[#008985] px-8 py-3.5 rounded-xl font-bold text-lg hover:bg-gray-100 transition shadow-lg"
        >
          Find a Doctor
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;