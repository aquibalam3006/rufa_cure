import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

// APNI DOCTOR IMAGE YAHAN IMPORT KAREIN
import doctorImage from '../assets/doctorPNG.png'; 

function Home() {
  const navigate = useNavigate();

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [allDoctors, setAllDoctors] = useState([]);

  // =========================================================
  // 🛡️ ROUTE GUARD: Profile check for Doctor
  // =========================================================
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        if (userObj.role === 'doctor' && userObj.hasProfile === false) {
           navigate('/doctor/setup-profile', { replace: true });
        }
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_URL}/api/doctors/all`)
      .then(res => res.json())
      .then(data => {
        if(data.ok && data.doctors) {
          const formattedDoctors = data.doctors.map(doc => ({
            name: doc.name,
            speciality: doc.specialization && doc.specialization.length > 0 ? doc.specialization[0] : 'General'
          }));
          setAllDoctors(formattedDoctors);
        }
      })
      .catch(err => console.error("Error fetching doctors for Home Page:", err));
  }, [API_URL]);

  const handleMakeAppointment = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = token && token !== 'null' && token !== 'undefined' && token !== '';

    if (isLoggedIn) {
      navigate('/appointment', { 
        state: { speciality: selectedSpeciality, doctor: selectedDoctor } 
      });
    } else {
      alert("Please login or register first to book an appointment.");
      navigate('/login');
    }
  };

  const handleSpecialityIconClick = (specialityName) => {
    navigate('/doctors', { state: { filterSpeciality: specialityName } });
  };

  const specialitiesList = [
    { name: 'General Physician', icon: '🩺' },
    { name: 'Cardiology', icon: '🫀' },
    { name: 'Neurology', icon: '🧠' },
    { name: 'Orthopaedics', icon: '🦴' },
    { name: 'Paediatrics', icon: '👶' },
    { name: 'Dermatology', icon: '💆‍♀️' },
    { name: 'Gynaecology', icon: '🤰' },
    { name: 'ENT', icon: '👂' },
    { name: 'Pulmonology', icon: '🫁' },
    { name: 'Gastroenterology', icon: '🍎' },
    { name: 'Urology', icon: '💧' },
    { name: 'Ophthalmology', icon: '👁️' },
    { name: 'Dentist', icon: '🦷' },
    { name: 'Psychiatry', icon: '🛋️' },
    { name: 'Nephrology', icon: '🫘' }
  ];

  const availableDoctors = selectedSpeciality 
    ? allDoctors.filter(doc => doc.speciality === selectedSpeciality)
    : allDoctors;

  const handleSpecialityChange = (e) => {
    setSelectedSpeciality(e.target.value);
    setSelectedDoctor(''); 
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col overflow-x-hidden">
      
      <Navbar />

      {/* --- SECTION 1: HERO SECTION --- */}
      <div className="bg-gradient-to-b from-[#b3e5e1] to-white px-6 sm:px-8 md:px-16 pt-8 md:pt-12 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 mb-4 md:mb-6">
             <span className="text-[#008985]">Trusted</span> Medical <br className="hidden md:block" />
             Care and Treatment <br className="hidden md:block" />
             for Every Family
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-8 md:mb-10 max-w-lg mx-auto lg:mx-0 px-2">
              Advanced Medical Care with a Human Touch.
              Your Journey to Better Health Begins Here.
            </p>
            <button
              onClick={handleMakeAppointment}
              className="px-8 py-3 bg-white text-[#008985] font-bold rounded-full text-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition border border-gray-100 w-full sm:w-auto"
            >
              Make Appointment
            </button>
          </div>

          {/* 🚀 3D MASKING DOCTOR - Responsive Fix */}
          <div className="relative flex justify-center items-end h-[350px] sm:h-[400px] md:h-[450px] mt-6 md:mt-10 lg:mt-0">
            
            {/* 1. Main Background Circle */}
            <div className="absolute bottom-0 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[380px] md:h-[380px] bg-[#005a57] rounded-full shadow-2xl transition-transform duration-700 hover:scale-105"></div>

            {/* 2. Image Wrapper */}
            <div 
              className="relative z-10 w-[280px] h-[350px] sm:w-[340px] h-[400px] md:w-[380px] md:h-[480px] flex justify-center items-end overflow-hidden transition-transform duration-700 hover:scale-105"
              style={{ borderBottomLeftRadius: '190px', borderBottomRightRadius: '190px' }}
            >
              <img 
                src={doctorImage} 
                alt="RuFa Cure Doctor" 
                className="w-[85%] md:w-[90%] h-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.4)] transform translate-y-2"
              />
            </div>

            {/* Floating Elements (Responsive hide/show) */}
            <div className="absolute top-[15%] right-[10%] sm:right-[5%] bg-white p-2 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xl z-20 animate-bounce">
              <span className="text-xl sm:text-2xl">⭐</span>
            </div>
            <div className="absolute bottom-[15%] left-[10%] sm:left-[5%] bg-white/90 backdrop-blur-md p-2 sm:p-3.5 rounded-xl sm:rounded-2xl shadow-xl z-20 animate-pulse border border-white">
              <span className="text-xl sm:text-2xl">🛡️</span>
            </div>

          </div>

        </div>
      </div>

      {/* --- SCHEDULE APPOINTMENT BAR --- */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-6 sm:py-8 bg-[#008985] rounded-2xl shadow-xl -mt-16 sm:-mt-20 relative z-30 mb-12 sm:mb-16 mx-4 md:mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
            <h3 className="text-white text-xl sm:text-2xl font-bold whitespace-nowrap text-center">Schedule Your Appointment</h3>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
                <select 
                  value={selectedSpeciality}
                  onChange={handleSpecialityChange}
                  className="p-3 rounded-lg text-gray-700 w-full outline-none cursor-pointer border border-transparent focus:border-white text-sm sm:text-base bg-white"
                >
                    <option value="">Select Speciality</option>
                    {specialitiesList.map((spec, index) => (
                        <option key={index} value={spec.name}>{spec.name}</option>
                    ))}
                </select>

                <select 
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="p-3 rounded-lg text-gray-700 w-full outline-none cursor-pointer border border-transparent focus:border-white text-sm sm:text-base bg-white disabled:bg-gray-100"
                  disabled={!selectedSpeciality} 
                >
                    <option value="">Select Doctor</option>
                    {selectedSpeciality && <option value="Any Available Doctor">Any Available Doctor</option>}
                    {availableDoctors.map((doc, index) => (
                        <option key={index} value={doc.name}>{doc.name}</option>
                    ))}
                </select>
            </div>
            
            <button 
                onClick={handleMakeAppointment}
                className="w-full lg:w-auto bg-white text-[#008985] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition whitespace-nowrap shadow-md text-sm sm:text-base"
            >
                Book Appointment
            </button>
        </div>
      </div>

      {/* --- SPECIALITIES SECTION --- */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20 text-center">
        <div className="inline-block border-b-2 border-[#008985] pb-2 mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Specialities</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {specialitiesList.map((spec) => (
                <div 
                  key={spec.name} 
                  className="flex flex-col items-center group cursor-pointer" 
                  onClick={() => handleSpecialityIconClick(spec.name)}
                >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-[#008985] flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#008985] transition duration-300 shadow-sm bg-white">
                        <span className="text-3xl sm:text-4xl group-hover:scale-110 transition duration-300">{spec.icon}</span>
                    </div>
                    <p className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-[#008985] transition">{spec.name}</p>
                </div>
            ))}
        </div>
        
        <button 
            onClick={() => handleSpecialityIconClick('All Specialities')}
            className="mt-10 md:mt-12 px-8 py-3 bg-[#008985] text-white font-bold rounded-lg hover:bg-[#006e6a] transition text-sm sm:text-base"
        >
            View All Specialities ➔
        </button>
      </div>

      {/* --- ASK RUFA CURE BANNER --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-20">
        <div className="bg-gradient-to-r from-[#008985] to-[#005a57] rounded-3xl p-6 sm:p-10 md:p-12 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden shadow-xl text-center lg:text-left">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white opacity-10 rounded-full -mb-10 pointer-events-none"></div>

          <div className="relative z-10 lg:w-3/5 mb-8 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Ask anything about your health.
            </h2>
            <p className="text-lg sm:text-xl text-[#b3e5e1] mb-6 md:mb-8 font-medium">
              Get trusted answers directly from RuFa Cure.
            </p>
            <button 
              onClick={() => navigate('/ask-rufa')} 
              className="bg-white text-[#008985] font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-md mx-auto lg:mx-0"
            >
              <span className="text-xl">✨</span> 
              <span>Ask RuFa Cure</span> 
              <sup className="text-xs font-bold text-[#005a57] mt-1">beta</sup>
            </button>
          </div>

          <div className="relative z-10 lg:w-2/5 flex justify-center lg:justify-end items-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
               <span className="text-[70px] sm:text-[100px]">👨‍⚕️</span>
               <span className="absolute top-2 sm:top-4 left-0 text-2xl sm:text-3xl">💊</span>
               <span className="absolute bottom-2 sm:bottom-4 right-0 text-2xl sm:text-3xl">🛡️</span>
               <span className="absolute top-1/2 -left-6 sm:-left-8 text-2xl sm:text-3xl">❓</span>
            </div>
          </div>

        </div>
      </div>

      {/* --- SECTION 3: DOCTOR STATS --- */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center bg-white rounded-2xl shadow-xl mb-16 sm:mb-20 border border-gray-100 mx-4 md:mx-auto">
        <div className="md:border-r border-gray-100 last:border-0 p-2">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#008985]">27+</p>
          <p className="text-xs sm:text-sm font-bold text-gray-600 mt-2 uppercase tracking-wide">Years</p>
        </div>
        <div className="md:border-r border-gray-100 last:border-0 p-2">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#008985]">5M+</p>
          <p className="text-xs sm:text-sm font-bold text-gray-600 mt-2 uppercase tracking-wide">Patients</p>
        </div>
        <div className="md:border-r border-gray-100 last:border-0 p-2">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#008985]">35+</p>
          <p className="text-xs sm:text-sm font-bold text-gray-600 mt-2 uppercase tracking-wide">Dept</p>
        </div>
        <div className="last:border-0 p-2">
          <p className="text-3xl sm:text-4xl font-extrabold text-[#008985]">1200+</p>
          <p className="text-xs sm:text-sm font-bold text-gray-600 mt-2 uppercase tracking-wide">Doctors</p>
        </div>
      </div>

      {/* --- SECTION 4: DOCTOR TILES --- */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-28 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg relative border border-gray-100">
          <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">Latest Visited <br /> doctor</h4>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-3 sm:-space-x-4">
              {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center"><p className="text-[10px] sm:text-xs text-gray-400">Dr</p></div>)}
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600">
              More than <span className="font-bold text-gray-900">4K doctor</span> <br />
              at your services
            </p>
          </div>
          <div className="absolute top-6 sm:top-8 right-6 sm:right-8 text-[#008985] text-xl sm:text-2xl">↗</div>
        </div>

        <div className="bg-[#b3e5e1] p-6 sm:p-8 rounded-2xl text-center flex flex-col items-center shadow-lg">
          <span className="px-4 py-1 bg-white text-[#008985] font-bold rounded-full text-xs sm:text-sm mb-4">Doctors</span>
          <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">Our Specialist <br /> doctor</h4>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-2 text-gray-600 text-2xl sm:text-3xl">
            <span>🫀</span><span>🧠</span><span>👨‍⚕️</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 md:col-span-2 lg:col-span-1">
          <div className="flex flex-col justify-between items-start">
            <h4 className="text-lg sm:text-xl font-bold leading-snug text-gray-900 mb-4 sm:mb-6">Connect with our <br /> professional <br /> doctor</h4>
            <button 
              onClick={handleMakeAppointment}
              className="px-4 py-2 bg-[#008985] text-white font-bold rounded-lg text-xs sm:text-sm hover:bg-[#006e6a] transition"
            >
              Connect Now
            </button>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-xl flex items-center justify-center">
            <p className="text-[10px] sm:text-xs text-gray-400 italic text-center px-1">Specialist Network</p>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Home;