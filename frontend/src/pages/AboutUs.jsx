import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 🚀 Yahan humne trust.jpg ko import kiya hai
import trustImage from '../assets/trust.jpg';
import aquibImage from '../assets/Aquib.png';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      {/* Mobile me padding kam (py-12 px-6), Laptop me zyada (py-20 px-8) */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-12 sm:py-16 md:py-20 px-6 sm:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-white opacity-5 rounded-full -ml-10 -mt-10 md:-ml-20 md:-mt-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white opacity-5 rounded-full -mr-10 -mb-10 md:-mr-20 md:-mb-20"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Text scale karega: 3xl se 6xl tak */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
            Healing with Compassion.<br />Driven by Technology.
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 font-medium leading-relaxed px-2 sm:px-0">
            At RuFa Cure, we don't just treat symptoms; we care for people. Our mission is to bridge the gap between world-class medical experts and patients who need them, making quality healthcare accessible, transparent, and hassle-free.
          </p>
        </div>
      </div>

      {/* --- OUR STORY / MISSION --- */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-20">
        {/* Grid mobile me 1 column, Laptop me 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <span className="text-[#008985] font-extrabold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Our Story</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6">Why We Built RuFa Cure</h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
              We realized that finding the right doctor and managing medical appointments was often stressful and confusing. Patients spent hours waiting, and doctors struggled with inefficient clinic management.
            </p>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              RuFa Cure was born out of a simple idea: <strong className="text-gray-800">Healthcare should be focused on healing, not administration.</strong> We built a smart, secure, and patient-first platform where you can find highly verified specialists, book appointments instantly, and manage your health records seamlessly.
            </p>

            {/* Stats mobile me upar-neeche, tablet/laptop me aaju-baaju */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="border-l-4 border-[#008985] pl-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">5M+</p>
                <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1">Patients Trusted Us</p>
              </div>
              <div className="border-l-4 border-[#008985] pl-4">
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">1200+</p>
                <p className="text-xs sm:text-sm font-bold text-gray-500 mt-1">Verified Doctors</p>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0 px-4 sm:px-0">
            <div className="aspect-square bg-[#e6f4f4] rounded-full absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full z-0"></div>
            <div className="aspect-square bg-gray-200 rounded-2xl sm:rounded-3xl relative z-10 overflow-hidden shadow-2xl border-4 sm:border-8 border-white flex items-center justify-center">
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
      <div className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#008985] font-extrabold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Our Pillars of Trust</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">What We Stand For</h2>
          </div>

          {/* Grid mobile me 1, tablet me 2 ya 3 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {/* Value 1 */}
            <div className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-sm group-hover:scale-110 transition">🛡️</div>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">Strict Verification</h3>
              <p className="text-gray-600 leading-relaxed font-medium text-sm sm:text-base">
                Every doctor on RuFa Cure goes through a rigorous multi-step background check. We verify their medical licenses, qualifications, and track records so you are always in safe hands.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-[#e6f4f4] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[#b3e5e1] hover:shadow-xl transition duration-300 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-sm group-hover:scale-110 transition text-[#008985]">🤝</div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#008985] mb-3 sm:mb-4">Patient-First Approach</h3>
              <p className="text-[#005a57] leading-relaxed font-medium text-sm sm:text-base">
                From transparent consultation fees to secure management of your private medical data, every feature we build is designed keeping your comfort, privacy, and health as our top priority.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 hover:shadow-xl transition duration-300 group sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 shadow-sm group-hover:scale-110 transition">⚡</div>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">Seamless Technology</h3>
              <p className="text-gray-600 leading-relaxed font-medium text-sm sm:text-base">
                No more waiting in long queues or dealing with lost paper prescriptions. Our smart dashboard keeps your appointments, lab reports, and doctor communications all in one secure place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MANAGEMENT / LEADERSHIP MESSAGE --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20">
        {/* Mobile par flex-col, Laptop par flex-row */}
        <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-16 flex flex-col lg:flex-row items-center text-center lg:text-left gap-8 md:gap-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[#008985] opacity-20 text-[120px] md:text-[200px] leading-none -mt-4 -mr-4 md:-mt-10 md:-mr-10">"</div>

          <div className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 shrink-0 rounded-full border-4 border-[#008985] overflow-hidden z-10 mx-auto lg:mx-0">
            <img
              src={aquibImage}
              alt="Founder Aquib Alam"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="z-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-4 md:mb-6 leading-snug lg:leading-tight">
              "We don't just manage hospitals; we manage hopes. When you book an appointment on RuFa Cure, you are trusting us with your life, and we take that responsibility very seriously."
            </h3>
            <div>
              <p className="text-[#008985] font-extrabold text-base sm:text-lg">MD AQUIB ALAM</p>
              <p className="text-gray-400 font-medium text-sm sm:text-base">Founder & CEO, RuFa Cure</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CALL TO ACTION --- */}
      <div className="bg-[#008985] py-12 md:py-16 text-center text-white px-6 sm:px-8 mt-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 md:mb-4">Ready to prioritize your health?</h2>
        <p className="text-sm sm:text-base text-teal-100 font-medium mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
          Join millions of patients who trust RuFa Cure for their daily healthcare needs. Find your specialist and book a consultation today.
        </p>
        <button
          onClick={() => navigate('/doctors')}
          className="bg-white text-[#008985] px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold text-base sm:text-lg hover:bg-gray-100 transition shadow-lg w-full sm:w-auto"
        >
          Find a Doctor
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUs;