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
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-[#e6f4f4] py-20 px-8 text-center relative overflow-hidden border-b border-rose-100">
        <div className="absolute top-0 left-10 w-64 h-64 bg-pink-200 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-[#008985] opacity-10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="bg-white text-rose-500 font-extrabold tracking-wider uppercase text-xs px-4 py-1.5 rounded-full shadow-sm mb-6 inline-block">RuFa Cure Exclusive</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
            Welcome to <span className="text-rose-500">Momverse</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto mb-8">
            A safe, expert-backed community for every stage of motherhood. From planning your pregnancy to postpartum care and raising a healthy baby—we are with you, every step of the way.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-rose-500 text-white px-8 py-3.5 rounded-full font-bold hover:bg-rose-600 transition shadow-md">
              Join the Community
            </button>
            <button 
              onClick={() => navigate('/doctors')}
              className="bg-white text-gray-700 border border-gray-200 px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 transition shadow-sm"
            >
              Consult a Specialist
            </button>
          </div>
        </div>
      </div>

      {/* --- THE MOTHERHOOD JOURNEY (Categorized Hub) --- */}
      <div className="max-w-7xl mx-auto px-8 py-20 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Your Motherhood Journey</h2>
          <p className="text-gray-500 font-medium mt-4 max-w-2xl mx-auto">Expert guides, medical support, and community stories curated for your exact stage.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stage 1: Planning */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer">
            <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🌱</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Preconception</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600 mb-6">
              <li className="hover:text-rose-500 transition">➔ Ovulation Tracking</li>
              <li className="hover:text-rose-500 transition">➔ Infertility Support</li>
              <li className="hover:text-rose-500 transition">➔ Pre-pregnancy Diet</li>
            </ul>
            <span className="text-purple-600 font-bold text-sm group-hover:underline">Explore Planning</span>
          </div>

          {/* Stage 2: Pregnancy */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer">
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🤰</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Pregnancy</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600 mb-6">
              <li className="hover:text-rose-500 transition">➔ First Trimester Guide</li>
              <li className="hover:text-rose-500 transition">➔ Second & Third Trimester</li>
              <li className="hover:text-rose-500 transition">➔ Pregnancy Diet & Scans</li>
            </ul>
            <span className="text-pink-600 font-bold text-sm group-hover:underline">Explore Pregnancy</span>
          </div>

          {/* Stage 3: Postpartum */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer">
            <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">🤱</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Postpartum</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600 mb-6">
              <li className="hover:text-rose-500 transition">➔ Physical Recovery</li>
              <li className="hover:text-rose-500 transition">➔ Breastfeeding Guide</li>
              <li className="hover:text-rose-500 transition">➔ Postpartum Mental Health</li>
            </ul>
            <span className="text-orange-600 font-bold text-sm group-hover:underline">Explore Postpartum</span>
          </div>

          {/* Stage 4: Baby Care */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:border-rose-300 hover:shadow-xl transition duration-300 group cursor-pointer">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition">👶</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">Newborn & Infant</h3>
            <ul className="space-y-3 text-sm font-medium text-gray-600 mb-6">
              <li className="hover:text-rose-500 transition">➔ Baby Vaccination Chart</li>
              <li className="hover:text-rose-500 transition">➔ 6 Month Baby Food</li>
              <li className="hover:text-rose-500 transition">➔ Sleep & Growth Milestones</li>
            </ul>
            <span className="text-[#008985] font-bold text-sm group-hover:underline">Explore Baby Care</span>
          </div>

        </div>
      </div>

      {/* --- MENTAL HEALTH & COMMUNITY BANNER --- */}
      <div className="bg-rose-50 py-16 border-y border-rose-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="text-rose-500 font-extrabold tracking-wider uppercase text-xs mb-2 block">You Are Not Alone</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">Postpartum Mental Health Support</h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Motherhood is beautiful, but it can also be overwhelming. "Baby blues" and postpartum depression are real and common. Connect with our maternal mental health experts and join support groups with moms who understand exactly what you are going through.
            </p>
            <div className="flex gap-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition">Talk to a Therapist</button>
              <button className="bg-white text-gray-800 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition">Read Articles</button>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative">
              <div className="absolute -top-6 -right-6 text-6xl opacity-50">💬</div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4">Mom's Circle Discussion</h3>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left border border-gray-100">
                <p className="text-sm text-gray-500 font-bold mb-1">Priya S. asks:</p>
                <p className="text-gray-800 font-medium">"My 2-month-old isn't sleeping through the night. Any gentle sleep training tips?"</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100 opacity-70">
                <p className="text-sm text-gray-500 font-bold mb-1">Dr. Neha replies:</p>
                <p className="text-gray-800 font-medium">"At 2 months, frequent waking is normal for feeding. Try setting a bedtime routine..."</p>
              </div>
              <button className="w-full mt-6 text-rose-500 font-bold hover:underline">Join the Conversation ➔</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- QUICK TOOLS & FUN SECTION --- */}
      <div className="max-w-7xl mx-auto px-8 py-20 w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12">Helpful Tools & Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 p-8 rounded-3xl hover:shadow-lg transition group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition">🎀</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Baby Name Finder</h3>
            <p className="text-sm text-gray-500 font-medium mb-4">Browse popular girl and boy names with meanings.</p>
            <button className="text-[#008985] font-bold text-sm">Find Names ➔</button>
          </div>
          <div className="bg-white border border-gray-200 p-8 rounded-3xl hover:shadow-lg transition group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition">📅</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Vaccination Tracker</h3>
            <p className="text-sm text-gray-500 font-medium mb-4">Never miss a shot. Generate your baby's custom chart.</p>
            <button className="text-[#008985] font-bold text-sm">Get Chart ➔</button>
          </div>
          <div className="bg-white border border-gray-200 p-8 rounded-3xl hover:shadow-lg transition group">
            <div className="text-5xl mb-4 group-hover:scale-110 transition">🥣</div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-2">Baby Food Recipes</h3>
            <p className="text-sm text-gray-500 font-medium mb-4">Healthy weaning recipes for 6+ month old babies.</p>
            <button className="text-[#008985] font-bold text-sm">View Recipes ➔</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Momverse;