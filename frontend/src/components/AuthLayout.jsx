import React from 'react';
import Navbar from './Navbar'; 

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col text-gray-800">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6 md:p-12 bg-gray-50/50">
        <div className="max-w-7xl w-full flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden bg-white">
          
          <div className="md:w-1/2 p-8 md:p-16 flex items-center justify-center border-r border-gray-100">
            <div className="w-full max-w-md space-y-10">
              {children}
            </div>
          </div>

          <div className="md:w-1/2 bg-gradient-to-br from-[#b3e5e1] to-white p-12 md:p-20 flex flex-col justify-between relative overflow-hidden hidden md:flex">
            <div className="relative z-10 text-center space-y-5 mb-10">
              <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
                Better Care Through Smarter Hospital Management.
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                A secure, centralized platform to manage patients, staff, and daily operations efficiently.
              </p>
            </div>
            <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-1 mb-2 text-[#e75a31]">
                    {[...Array(5)].map((_,i) => <span key={i} className="text-xl">⭐</span>)}
                </div>
                <p className="font-bold text-gray-900 text-base">Trusted by healthcare teams</p>
                <p className="text-gray-500 text-sm mt-1">Used by hospitals and clinics across multiple departments</p>
            </div>
            <div className="absolute inset-0 z-0 opacity-10 flex items-center justify-center scale-150 transform rotate-12 pointer-events-none">
               <span className="text-[120px] text-gray-400">👨‍⚕️❓🧪💊🩺</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default AuthLayout;