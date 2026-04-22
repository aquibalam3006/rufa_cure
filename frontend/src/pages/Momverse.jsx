import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function Momverse() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION (Warm & Caring Vibe) --- */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-[#e6f4f4] py-16 md:py-20 px-4 sm:px-8 text-center relative overflow-hidden border-b border-rose-100">
        <div className="absolute top-0 left-0 sm:left-10 w-40 h-40 sm:w-64 sm:h-64 bg-pink-200 opacity-20 rounded-full blur-2xl sm:blur-3xl -ml-10"></div>
        <div className="absolute bottom-0 right-0 sm:right-10 w-48 h-48 sm:w-80 sm:h-80 bg-[#008985] opacity-10 rounded-full blur-2xl sm:blur-3xl -mr-10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="bg-white text-rose-500 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-sm mb-4 sm:mb-6 inline-block">RuFa Cure Exclusive</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight text-gray-900">
            Welcome to <span className="text-rose-500">Momverse</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
            A safe, expert-backed community for every stage of motherhood. From planning your pregnancy to postpartum care and raising a healthy baby—we are with you, every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <button className="w-full sm:w-auto bg-rose-500 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-rose-600 transition shadow-md text-sm sm:text-base">
              Join the Community
            </button>
            <button 
              onClick={() => navigate('/doctors')}
              className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-gray-50 transition shadow-sm text-sm sm:text-base"
            >
              Consult a Specialist
            </button>
          </div>
        </div>
      </div>

      {/* --- THE MOTHERHOOD JOURNEY (Categorized Hub) --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20 w-full">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">Your Motherhood Journey</h2>
          <p className="text-sm sm:text-base text-gray-500 font-medium mt-3 sm:mt-4 max-w-2xl mx-auto px-4 sm:px-0">Expert guides, medical support, and community stories curated for your exact stage.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Stage 1: Planning */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer flex flex-col h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-50 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition">🌱</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">Preconception</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-600 mb-4 sm:mb-6 flex-grow">
              <li className="hover:text-rose-500 transition">➔ Ovulation Tracking</li>
              <li className="hover:text-rose-500 transition">➔ Infertility Support</li>
              <li className="hover:text-rose-500 transition">➔ Pre-pregnancy Diet</li>
            </ul>
            <span className="text-purple-600 font-bold text-xs sm:text-sm group-hover:underline mt-auto block">Explore Planning</span>
          </div>

          {/* Stage 2: Pregnancy */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer flex flex-col h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-50 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition">🤰</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">Pregnancy</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-600 mb-4 sm:mb-6 flex-grow">
              <li className="hover:text-rose-500 transition">➔ First Trimester Guide</li>
              <li className="hover:text-rose-500 transition">➔ Second & Third Trimester</li>
              <li className="hover:text-rose-500 transition">➔ Pregnancy Diet & Scans</li>
            </ul>
            <span className="text-pink-600 font-bold text-xs sm:text-sm group-hover:underline mt-auto block">Explore Pregnancy</span>
          </div>

          {/* Stage 3: Postpartum */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer flex flex-col h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-50 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition">🤱</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">Postpartum</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-600 mb-4 sm:mb-6 flex-grow">
              <li className="hover:text-rose-500 transition">➔ Physical Recovery</li>
              <li className="hover:text-rose-500 transition">➔ Breastfeeding Guide</li>
              <li className="hover:text-rose-500 transition">➔ Postpartum Mental Health</li>
            </ul>
            <span className="text-orange-600 font-bold text-xs sm:text-sm group-hover:underline mt-auto block">Explore Postpartum</span>
          </div>

          {/* Stage 4: Baby Care */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer flex flex-col h-full">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-50 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-4 sm:mb-6 group-hover:scale-110 transition">👶</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">Newborn & Infant</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm font-medium text-gray-600 mb-4 sm:mb-6 flex-grow">
              <li className="hover:text-rose-500 transition">➔ Baby Vaccination Chart</li>
              <li className="hover:text-rose-500 transition">➔ 6 Month Baby Food</li>
              <li className="hover:text-rose-500 transition">➔ Sleep & Growth Milestones</li>
            </ul>
            <span className="text-[#008985] font-bold text-xs sm:text-sm group-hover:underline mt-auto block">Explore Baby Care</span>
          </div>

        </div>
      </div>

      {/* --- MENTAL HEALTH & COMMUNITY BANNER --- */}
      <div className="bg-rose-50 py-12 md:py-16 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-rose-500 font-extrabold tracking-wider uppercase text-[10px] sm:text-xs mb-2 block">You Are Not Alone</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">Postpartum Mental Health Support</h2>
            <p className="text-sm sm:text-base text-gray-600 font-medium leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
              Motherhood is beautiful, but it can also be overwhelming. "Baby blues" and postpartum depression are real and common. Connect with our maternal mental health experts and join support groups with moms who understand exactly what you are going through.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4 px-4 sm:px-0">
              <button className="w-full sm:w-auto bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition text-sm sm:text-base">Talk to a Therapist</button>
              <button className="w-full sm:w-auto bg-white text-gray-800 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition text-sm sm:text-base">Read Articles</button>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-6 md:mt-0">
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-5xl sm:text-6xl opacity-50">💬</div>
              <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-4 relative z-10 text-left">Mom's Circle Discussion</h3>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 text-left border border-gray-100 relative z-10">
                <p className="text-xs sm:text-sm text-gray-500 font-bold mb-1">Priya S. asks:</p>
                <p className="text-sm sm:text-base text-gray-800 font-medium">"My 2-month-old isn't sleeping through the night. Any gentle sleep training tips?"</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-left border border-gray-100 opacity-70 relative z-10">
                <p className="text-xs sm:text-sm text-gray-500 font-bold mb-1">Dr. Neha replies:</p>
                <p className="text-sm sm:text-base text-gray-800 font-medium">"At 2 months, frequent waking is normal for feeding. Try setting a bedtime routine..."</p>
              </div>
              <button className="w-full mt-4 sm:mt-6 text-rose-500 font-bold hover:underline text-sm sm:text-base relative z-10">Join the Conversation ➔</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK TOOLS & FUN SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20 w-full text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 md:mb-12">Helpful Tools & Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-lg transition group flex flex-col">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition">🎀</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">Baby Name Finder</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-4 flex-grow">Browse popular girl and boy names with meanings.</p>
            <button className="text-[#008985] font-bold text-xs sm:text-sm mt-auto">Find Names ➔</button>
          </div>
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-lg transition group flex flex-col">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition">📅</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">Vaccination Tracker</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-4 flex-grow">Never miss a shot. Generate your baby's custom chart.</p>
            <button className="text-[#008985] font-bold text-xs sm:text-sm mt-auto">Get Chart ➔</button>
          </div>
          <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl hover:shadow-lg transition group flex flex-col sm:col-span-2 md:col-span-1">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition">🥣</div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">Baby Food Recipes</h3>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-4 flex-grow">Healthy weaning recipes for 6+ month old babies.</p>
            <button className="text-[#008985] font-bold text-xs sm:text-sm mt-auto">View Recipes ➔</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Momverse;