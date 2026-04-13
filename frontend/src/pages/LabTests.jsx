import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function LabTests() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // MOCK LAB TESTS DATA (Based on your footer list)
  const labTestsData = [
    {
      id: 'LT001',
      name: 'Complete Blood Count (CBC Test)',
      parameters: 24,
      fasting: 'Not Required',
      reportTime: 'Within 12 Hours',
      price: 399,
      originalPrice: 600,
      discount: '33% OFF',
      category: 'Blood Studies'
    },
    {
      id: 'LT002',
      name: 'Thyroid Profile Test (T3 T4 TSH)',
      parameters: 3,
      fasting: 'Required (8-10 hrs)',
      reportTime: 'Within 24 Hours',
      price: 499,
      originalPrice: 800,
      discount: '37% OFF',
      category: 'Hormones'
    },
    {
      id: 'LT003',
      name: 'Lipid Profile Test',
      parameters: 8,
      fasting: 'Required (10-12 hrs)',
      reportTime: 'Within 24 Hours',
      price: 599,
      originalPrice: 1000,
      discount: '40% OFF',
      category: 'Heart Health'
    },
    {
      id: 'LT004',
      name: 'Liver Function Test (LFT Test)',
      parameters: 11,
      fasting: 'Not Required',
      reportTime: 'Within 24 Hours',
      price: 699,
      originalPrice: 1200,
      discount: '41% OFF',
      category: 'Liver Health'
    },
    {
      id: 'LT005',
      name: 'Renal Profile (KFT, RFT Test)',
      parameters: 10,
      fasting: 'Not Required',
      reportTime: 'Within 24 Hours',
      price: 749,
      originalPrice: 1300,
      discount: '42% OFF',
      category: 'Kidney Health'
    },
    {
      id: 'LT006',
      name: 'Hemogram Test',
      parameters: 28,
      fasting: 'Not Required',
      reportTime: 'Within 12 Hours',
      price: 450,
      originalPrice: 750,
      discount: '40% OFF',
      category: 'Blood Studies'
    },
    {
      id: 'LT007',
      name: 'D Dimer Test',
      parameters: 1,
      fasting: 'Not Required',
      reportTime: 'Within 12 Hours',
      price: 1200,
      originalPrice: 1800,
      discount: '33% OFF',
      category: 'Special Tests'
    },
    {
      id: 'LT008',
      name: 'Urine Culture Test',
      parameters: 1,
      fasting: 'Not Required',
      reportTime: 'Within 48-72 Hours',
      price: 850,
      originalPrice: 1100,
      discount: '22% OFF',
      category: 'Infection'
    },
    {
      id: 'LT009',
      name: 'Widal Test',
      parameters: 4,
      fasting: 'Not Required',
      reportTime: 'Within 24 Hours',
      price: 350,
      originalPrice: 600,
      discount: '41% OFF',
      category: 'Fever/Infection'
    },
    {
      id: 'LT010',
      name: 'RT PCR Test at Home',
      parameters: 1,
      fasting: 'Not Required',
      reportTime: 'Within 24 Hours',
      price: 700,
      originalPrice: 900,
      discount: '22% OFF',
      category: 'Covid-19'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-16 px-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 right-40 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="lg:w-3/5 text-center lg:text-left">
            <span className="bg-white/20 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">NABL Accredited Labs</span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Book Lab Tests at Home.<br />Safe, Hygienic & Fast.
            </h1>
            <p className="text-lg text-teal-100 font-medium leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              Get accurate reports from our certified labs delivered straight to your phone. 100% safe home sample collection by trained professionals.
            </p>
            
            {/* Search Bar in Hero */}
            <div className="bg-white p-2 rounded-2xl flex max-w-lg mx-auto lg:mx-0 shadow-lg">
              <span className="text-gray-400 text-xl pl-4 py-3">🔍</span>
              <input 
                type="text" 
                placeholder="Search for tests or packages..." 
                className="flex-1 bg-transparent border-none outline-none px-3 text-gray-800 font-medium"
              />
              <button className="bg-[#008985] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#005a57] transition">
                Search
              </button>
            </div>
          </div>

          {/* Upload Prescription Card (Apollo Style) */}
          <div className="lg:w-2/5 w-full max-w-md">
            <div className="bg-white text-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 text-xs font-extrabold px-3 py-1 rounded-bl-xl">Quick Book</div>
              <h3 className="text-2xl font-extrabold mb-2">Have a Prescription?</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Upload it and we will create your cart instantly.</p>
              
              <div className="border-2 border-dashed border-[#b3e5e1] bg-[#f8fdfc] rounded-2xl p-8 text-center cursor-pointer hover:bg-[#e6f4f4] transition">
                <span className="text-4xl block mb-2 text-[#008985]">📄</span>
                <p className="font-bold text-[#008985]">Click to Upload Prescription</p>
                <p className="text-xs text-gray-400 mt-1">JPG, PNG or PDF</p>
              </div>
              
              <button className="w-full mt-6 bg-gray-900 text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition shadow-md">
                Request Call Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- TRUST BADGES --- */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center md:justify-between items-center gap-6 text-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl">🔬</div>
            <div className="text-left"><p className="font-extrabold text-gray-900 text-sm">NABL Certified</p><p className="text-xs text-gray-500 font-medium">100% Accurate Labs</p></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-xl">🏡</div>
            <div className="text-left"><p className="font-extrabold text-gray-900 text-sm">Free Home Collection</p><p className="text-xs text-gray-500 font-medium">Safe & Hygienic</p></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-xl">⏱️</div>
            <div className="text-left"><p className="font-extrabold text-gray-900 text-sm">Fast Reports</p><p className="text-xs text-gray-500 font-medium">View online instantly</p></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center text-xl">👨‍⚕️</div>
            <div className="text-left"><p className="font-extrabold text-gray-900 text-sm">Free Doctor Consult</p><p className="text-xs text-gray-500 font-medium">On specific packages</p></div>
          </div>
        </div>
      </div>

      {/* --- TOP TESTS GRID --- */}
      <div className="max-w-7xl mx-auto px-8 py-20 w-full">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 pb-4">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Popular Tests & Profiles</h2>
            <p className="text-gray-500 font-medium mt-2">Book individual tests or complete health profiles.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {labTestsData.map((test) => (
            <div key={test.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col relative overflow-hidden group">
              
              <div className="absolute top-4 right-4 bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-1 rounded">
                {test.discount}
              </div>

              <span className="text-xs font-extrabold text-[#008985] uppercase tracking-wider mb-2">{test.category}</span>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4 pr-12 leading-tight">{test.name}</h3>
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 border border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-bold mb-1">Includes</p>
                  <p className="text-sm font-bold text-gray-800">{test.parameters} Parameters</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold mb-1">Report Time</p>
                  <p className="text-sm font-bold text-gray-800">{test.reportTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-400 font-bold mb-1">Pre-test Information</p>
                  <p className="text-sm font-bold text-gray-800">{test.fasting}</p>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                <div>
                  <p className="text-xs text-gray-400 line-through font-bold">₹{test.originalPrice}</p>
                  <p className="text-2xl font-extrabold text-gray-900">₹{test.price}</p>
                </div>
                <button className="bg-white border-2 border-[#008985] text-[#008985] hover:bg-[#008985] hover:text-white font-bold px-6 py-2.5 rounded-xl transition shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <div className="bg-[#f8fdfc] py-20 border-y border-[#b3e5e1]/30">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12">How Home Sample Collection Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-[#b3e5e1] -translate-y-1/2 z-0"></div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-4 border-[#008985] rounded-full flex items-center justify-center text-3xl shadow-lg mb-4 text-[#008985]">📱</div>
              <h4 className="font-extrabold text-gray-900 mb-2">Book Online</h4>
              <p className="text-sm text-gray-600 font-medium">Select your test, choose a time slot, and confirm booking.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-4 border-[#008985] rounded-full flex items-center justify-center text-3xl shadow-lg mb-4 text-[#008985]">🛵</div>
              <h4 className="font-extrabold text-gray-900 mb-2">Home Visit</h4>
              <p className="text-sm text-gray-600 font-medium">Our trained phlebotomist visits your home at the requested time.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-4 border-[#008985] rounded-full flex items-center justify-center text-3xl shadow-lg mb-4 text-[#008985]">🧪</div>
              <h4 className="font-extrabold text-gray-900 mb-2">Lab Processing</h4>
              <p className="text-sm text-gray-600 font-medium">Sample is safely transported to our NABL certified labs for testing.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white border-4 border-[#008985] rounded-full flex items-center justify-center text-3xl shadow-lg mb-4 text-[#008985]">📊</div>
              <h4 className="font-extrabold text-gray-900 mb-2">Get Reports</h4>
              <p className="text-sm text-gray-600 font-medium">View and download your reports securely from the RuFa Cure app.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LabTests;