import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const appointmentData = location.state || {};

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [paymentStatus, setPaymentStatus] = useState('listening'); // listening, success
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer for payment

  useEffect(() => {
    if (!appointmentData.doctor) {
      navigate('/appointment');
    }
    window.scrollTo(0, 0);
  }, [appointmentData, navigate]);

  // --- 1. TIMER LOGIC ---
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === 'listening') {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, paymentStatus]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // --- 2. REAL-WORLD LOGIC: API POLLING (CONNECTED TO BACKEND) ---
  useEffect(() => {
    let pollingInterval;

    // Check if we have the appointmentId from previous page
    if (paymentStatus === 'listening' && appointmentData.appointmentId) {
      pollingInterval = setInterval(async () => {
        try {
          // 🚀 Live URL for polling
          const response = await fetch(`${API_URL}/api/appointments/status/${appointmentData.appointmentId}`);
          const data = await response.json();
          
          if (data.ok && data.paymentStatus === 'Paid') {
            setPaymentStatus('success');
            clearInterval(pollingInterval);
            // Redirect after showing success for 3 seconds
            setTimeout(() => {
              navigate('/profile');
            }, 3000);
          }
        } catch (error) {
          console.error("Payment Polling Error:", error);
        }
      }, 3000); // Every 3 seconds
    }

    return () => clearInterval(pollingInterval);
  }, [paymentStatus, appointmentData.appointmentId, navigate, API_URL]);

  // --- 3. UPDATED TESTING FUNCTION (UPDATES REAL DATABASE) ---
  const simulateBackendConfirmation = async () => {
    try {
      // 🚀 Live URL for confirmation
      const response = await fetch(`${API_URL}/api/appointments/confirm-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId: appointmentData.appointmentId })
      });

      const data = await response.json();
      if (data.ok) {
        console.log("Database updated successfully!");
        // Note: setPaymentStatus karne ki zaroorat nahi hai, 
        // Polling logic khud hi update detect karke success screen dikha dega.
      } else {
        alert("Failed to update payment: " + data.message);
      }
    } catch (error) {
      console.error("Simulation Error:", error);
      alert("Error connecting to backend for simulation.");
    }
  };

  const upiId = appointmentData.upiId || "rufacure@upi"; 
  const merchantName = appointmentData.doctor || "RuFa Cure Hospital";
  const amount = appointmentData.fee || 500;
  
  const qrValue = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${amount}&cu=INR`;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrValue)}`;

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Card Wrapper */}
        <div className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden flex flex-col md:flex-row border border-gray-100 relative">
          
          {/* SECURE BADGE */}
          <div className="absolute top-4 left-4 sm:left-6 md:left-4 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold border border-green-200 shadow-sm flex items-center gap-1 z-10">
            🔒 100% Secure Payment
          </div>

          {/* LEFT: Summary Details */}
          {/* Responsive border: bottom for mobile, right for laptop */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 pt-14 md:pt-16">
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-6 md:mb-8 flex items-center gap-2">
              <span className="text-[#008985]">📋</span> Booking Summary
            </h2>
            
            <div className="space-y-4 md:space-y-6">
              <div className="flex justify-between border-b border-gray-200 pb-2 md:pb-3">
                <span className="text-gray-500 font-bold text-xs md:text-sm">Patient Name</span>
                <span className="text-gray-900 font-extrabold text-sm md:text-base">{appointmentData.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 md:pb-3">
                <span className="text-gray-500 font-bold text-xs md:text-sm">Specialist</span>
                <span className="text-gray-900 font-extrabold text-sm md:text-base">{appointmentData.doctor}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 md:pb-3">
                <span className="text-gray-500 font-bold text-xs md:text-sm">Department</span>
                <span className="text-gray-900 font-extrabold text-sm md:text-base">{appointmentData.speciality}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2 md:pb-3">
                <span className="text-gray-500 font-bold text-xs md:text-sm">Date & Time</span>
                <span className="text-gray-900 font-extrabold text-xs md:text-sm text-right">
                  {appointmentData.dateTime ? new Date(appointmentData.dateTime).toLocaleString() : 'N/A'}
                </span>
              </div>

              <div className="pt-4 md:pt-8 mt-2 md:mt-4">
                <div className="bg-[#e6f4f4] p-4 md:p-6 rounded-xl md:rounded-2xl border-2 border-dashed border-[#008985]">
                  <div className="flex justify-between items-center">
                    <span className="text-[#005a57] font-extrabold text-base md:text-lg">Consultation Fee</span>
                    <span className="text-2xl md:text-3xl font-black text-[#008985]">₹{amount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment QR Section */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center bg-white relative">
            
            {paymentStatus === 'listening' && (
              <div className="text-center animate-fade-in w-full flex flex-col items-center">
                
                {/* Timer */}
                <div className="bg-red-50 text-red-600 font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm mb-4 md:mb-6 flex items-center gap-2 shadow-sm border border-red-100">
                  ⏳ Time remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </div>

                <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1 md:mb-2">Pay {appointmentData.doctor}</h3>
                <p className="text-xs md:text-sm text-gray-500 font-medium mb-1">Scan with any UPI App</p>
                <p className="text-[9px] md:text-[10px] text-[#008985] font-bold mb-4 bg-[#e6f4f4] px-2 py-1 rounded">UPI: {upiId}</p>
                
                <div className="relative p-3 md:p-4 bg-white border-4 border-[#008985] rounded-2xl md:rounded-3xl shadow-xl mb-6 md:mb-8 mt-2">
                   <img src={qrImageUrl} alt="Payment QR Code" className="w-48 h-48 md:w-56 md:h-56 object-contain" />
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-md md:rounded-lg shadow-md border border-gray-100">
                      <div className="bg-[#008985] text-white text-[8px] md:text-[10px] font-black px-1.5 py-0.5 rounded">RUFA</div>
                   </div>
                </div>

                {/* Auto Detection UI (Waiting state) */}
                <div className="w-full bg-gray-50 rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-200 flex items-center justify-center gap-2 md:gap-3">
                  <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-[#008985] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-xs md:text-sm font-bold text-gray-600">Awaiting payment confirmation...</p>
                </div>
                
                {/* TESTING BUTTON */}
                <button 
                  onClick={simulateBackendConfirmation}
                  className="mt-4 md:mt-6 text-[9px] md:text-[10px] text-gray-400 hover:text-[#008985] underline bg-transparent border-none cursor-pointer"
                >
                  (Dev Mode: Simulate Success)
                </button>

              </div>
            )}

            {paymentStatus === 'success' && (
              <div className="text-center animate-bounce-in w-full">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl md:text-5xl mx-auto mb-4 md:mb-6 shadow-md border-4 border-white">
                  ✔️
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-gray-900">Payment Successful!</h3>
                <p className="text-green-600 font-extrabold mt-1 md:mt-2 text-base md:text-lg">₹{amount} received by {appointmentData.doctor}.</p>
                
                <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-gray-600 text-xs md:text-sm font-bold flex items-center justify-center gap-2">
                    <span className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                    Redirecting to your profile...
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PaymentPage;