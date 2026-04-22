import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function CorporatePortal() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION (Corporate Vibe) --- */}
      <div className="bg-gray-900 py-16 md:py-24 px-6 md:px-8 text-center text-white relative overflow-hidden">
        {/* Abstract Background for Corporate Look */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#008985] via-gray-900 to-gray-900"></div>
        <div className="absolute -top-16 -right-16 md:-top-24 md:-right-24 w-64 h-64 md:w-96 md:h-96 bg-white opacity-5 rounded-full blur-2xl md:blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#008985] font-extrabold tracking-wider uppercase text-xs md:text-sm mb-3 md:mb-4 block">Investor & Partner Relations</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight text-white">
            Corporate Portal
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 font-medium leading-relaxed max-w-3xl mx-auto px-2">
            Committed to ethical governance, sustainable growth, and transforming the healthcare ecosystem through transparency and innovation.
          </p>
        </div>
      </div>

      {/* --- MISSION & VISION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 w-full -mt-8 md:-mt-12 lg:-mt-16 relative z-10 mb-12 md:mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 hover:border-[#b3e5e1] transition duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e6f4f4] text-[#008985] rounded-xl flex items-center justify-center text-xl md:text-2xl mb-4 md:mb-6">🎯</div>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 md:mb-4">Our Mission</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
              To democratize access to world-class healthcare by bridging the gap between medical expertise and patients through secure, AI-driven, and scalable technology.
            </p>
          </div>
          <div className="bg-white p-6 md:p-8 lg:p-10 rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 hover:border-[#b3e5e1] transition duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-[#e6f4f4] text-[#008985] rounded-xl flex items-center justify-center text-xl md:text-2xl mb-4 md:mb-6">👁️</div>
            <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 md:mb-4">Our Vision</h3>
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed">
              To be the most trusted and universally accessible digital health platform globally, prioritizing patient outcomes, data privacy, and clinical excellence.
            </p>
          </div>
        </div>
      </div>

      {/* --- CORPORATE DISCLOSURES (Safe Metrics Only) --- */}
      <div className="bg-white py-12 md:py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#008985] font-extrabold tracking-wider uppercase text-xs mb-2 block">Company Overview</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Corporate Disclosures</h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium mt-3 md:mt-4">
                RuFa Cure is built on the pillars of transparency and compliance. Here is a high-level overview of our operational footprint and governance standards.
              </p>
            </div>
            <button 
              onClick={() => navigate('/legal')}
              className="bg-gray-100 text-gray-700 px-5 md:px-6 py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold hover:bg-gray-200 transition whitespace-nowrap text-sm md:text-base w-full md:w-auto"
            >
              View Legal Policies
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#008985] mb-1 md:mb-2">2026</p>
              <p className="text-xs sm:text-sm font-bold text-gray-600">Year Established</p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#008985] mb-1 md:mb-2">5M+</p>
              <p className="text-xs sm:text-sm font-bold text-gray-600">Patients Served</p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#008985] mb-1 md:mb-2">1,200+</p>
              <p className="text-xs sm:text-sm font-bold text-gray-600">Verified Doctors</p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-100 text-center">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#008985] mb-1 md:mb-2">100%</p>
              <p className="text-xs sm:text-sm font-bold text-gray-600">HIPAA Compliant</p>
            </div>
          </div>

          {/* Compliance & Governance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="border border-gray-200 p-5 md:p-6 rounded-xl md:rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="text-green-500 text-lg md:text-xl">🛡️</span>
                <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Data Privacy</h4>
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-medium">We adhere to the highest international standards for medical data protection. No patient data is ever sold to third parties.</p>
            </div>
            <div className="border border-gray-200 p-5 md:p-6 rounded-xl md:rounded-2xl">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="text-blue-500 text-lg md:text-xl">📜</span>
                <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Clinical Governance</h4>
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-medium">All medical professionals on our platform pass through a rigorous 4-step verification process verifying credentials and medical licenses.</p>
            </div>
            <div className="border border-gray-200 p-5 md:p-6 rounded-xl md:rounded-2xl sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <span className="text-purple-500 text-lg md:text-xl">💼</span>
                <h4 className="font-extrabold text-gray-900 text-sm md:text-base">Financial Integrity</h4>
              </div>
              <p className="text-xs md:text-sm text-gray-600 font-medium">We maintain clear, transparent pricing for all consultations and lab tests. Regular audits are conducted to ensure financial compliance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CORPORATE PARTNERSHIPS --- */}
      <div className="bg-[#f8fdfc] py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-gradient-to-br from-[#008985] to-[#005a57] rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 shadow-xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-40 h-40 md:w-64 md:h-64 bg-white opacity-5 rounded-full -mr-10 -mt-10 md:-mr-10 md:-mt-10"></div>
            
            <div className="w-full lg:w-2/3 relative z-10">
              <span className="bg-white/20 text-white text-[10px] md:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4 md:mb-6 inline-block">Collaborate With Us</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
                Corporate Partnerships & B2B Solutions
              </h2>
              <p className="text-teal-100 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6 md:mb-8">
                We are actively expanding our network. Whether you are a pharmaceutical company, a diagnostic lab chain, a health-tech innovator, or a corporate looking for employee wellness programs, RuFa Cure offers scalable B2B integration.
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8 text-white font-medium text-sm md:text-base">
                <li className="flex items-center gap-2"><span>✅</span> Employee Wellness Programs</li>
                <li className="flex items-center gap-2"><span>✅</span> Diagnostic Lab Integrations</li>
                <li className="flex items-center gap-2"><span>✅</span> Insurance Providers</li>
                <li className="flex items-center gap-2"><span>✅</span> Health-Tech API Integrations</li>
              </ul>
            </div>

            <div className="w-full lg:w-1/3 relative z-10">
              <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg">
                <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1 md:mb-2">Become a Partner</h3>
                <p className="text-gray-500 text-xs md:text-sm font-medium mb-4 md:mb-6">Drop us a line and our team will get back to you.</p>
                
                <form className="space-y-3 md:space-y-4">
                  <input type="text" placeholder="Company Name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 md:py-3 outline-none focus:border-[#008985] transition text-xs md:text-sm font-medium" />
                  <input type="email" placeholder="Official Email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 md:py-3 outline-none focus:border-[#008985] transition text-xs md:text-sm font-medium" />
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 md:px-4 py-2.5 md:py-3 outline-none focus:border-[#008985] transition text-xs md:text-sm font-bold text-gray-600 cursor-pointer">
                    <option>Partnership Type</option>
                    <option>Employee Wellness</option>
                    <option>Diagnostics / Pharmacy</option>
                    <option>Technology Integration</option>
                    <option>Investors / PR</option>
                  </select>
                  <button type="button" className="w-full bg-gray-900 text-white font-bold py-2.5 md:py-3 rounded-lg hover:bg-gray-800 transition text-sm md:text-base">
                    Submit Enquiry
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- MEDIA & PRESS CONTACT --- */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 text-center">
        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 md:mb-4">Media & Investor Relations</h3>
        <p className="text-sm md:text-base text-gray-500 font-medium mb-4 md:mb-6 max-w-xl mx-auto px-2">
          For press kits, media inquiries, or investor relations, please reach out to our corporate communications desk.
        </p>
        <p className="text-lg md:text-xl font-extrabold text-[#008985]">corporate@rufacure.com</p>
      </div>

      <Footer />
    </div>
  );
}

export default CorporatePortal;