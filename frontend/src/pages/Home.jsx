import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; 

// 🚀 APNI DOCTOR IMAGE YAHAN IMPORT KAREIN
import doctorImage from '../assets/doctorPNG.png'; 

function Home() {
  const navigate = useNavigate();

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [allDoctors, setAllDoctors] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // 🚀 Backend API ko call karna (Live URL)
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      <Navbar />

      {/* --- SECTION 1: HERO SECTION --- */}
      <div className="bg-gradient-to-b from-[#b3e5e1] to-white px-8 md:px-16 pt-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h2 className="text-6xl font-extrabold leading-tight text-gray-900 mb-6">
              The <span className="text-[#008985]">Best</span> Medical <br />
              and Treatment <br />
              Center for You
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-10 max-w-lg">
              We understand that injuries and acute pain can happen
              unexpectedly. Our emergency specialists are here to support you.
            </p>
            <button
              onClick={handleMakeAppointment}
              className="px-8 py-3 bg-white text-[#008985] font-bold rounded-full text-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition border border-gray-100"
            >
              Make Appointment
            </button>
          </div>

          {/* 🚀 YAHAN MAGIC HUA HAI: PERFECT POP-OUT 3D MASKING */}
          <div className="relative flex justify-center items-end h-[450px] mt-10 lg:mt-0">
            
            {/* 1. Main Background Circle */}
            <div className="absolute bottom-0 w-[380px] h-[380px] bg-[#005a57] rounded-full shadow-2xl transition-transform duration-700 hover:scale-105"></div>

            {/* 2. Image Wrapper (Ye circle ke bottom ko crop karega aur top se baahar aane dega) */}
            <div 
              className="relative z-10 w-[380px] h-[480px] flex justify-center items-end overflow-hidden transition-transform duration-700 hover:scale-105"
              style={{ borderBottomLeftRadius: '190px', borderBottomRightRadius: '190px' }} // Bottom ekdum circle jaisa goal rahega
            >
              <img 
                src={doctorImage} 
                alt="RuFa Cure Doctor" 
                className="w-[90%] h-auto object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] transform translate-y-2" // Translate-y se line chipak jayegi
              />
            </div>

            {/* Floating Elements (Wrapper ke baahar taaki ye kate na) */}
            <div className="absolute top-[10%] right-[5%] bg-white p-3.5 rounded-2xl shadow-xl z-20 animate-bounce">
              <span className="text-2xl">⭐</span>
            </div>
            <div className="absolute bottom-[10%] left-[5%] bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-xl z-20 animate-pulse border border-white">
              <span className="text-2xl">🛡️</span>
            </div>

          </div>

        </div>
      </div>

      {/* --- SCHEDULE APPOINTMENT BAR --- */}
      <div className="max-w-6xl mx-auto px-8 py-8 bg-[#008985] rounded-xl shadow-xl -mt-20 relative z-30 mb-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-white text-2xl font-bold whitespace-nowrap">Schedule Your Appointment</h3>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <select 
                  value={selectedSpeciality}
                  onChange={handleSpecialityChange}
                  className="p-3 rounded text-gray-700 w-full outline-none cursor-pointer border border-transparent focus:border-white"
                >
                    <option value="">Select Speciality</option>
                    {specialitiesList.map((spec, index) => (
                        <option key={index} value={spec.name}>{spec.name}</option>
                    ))}
                </select>

                <select 
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="p-3 rounded text-gray-700 w-full outline-none cursor-pointer border border-transparent focus:border-white"
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
                className="bg-white text-[#008985] font-bold py-3 px-8 rounded hover:bg-gray-100 transition whitespace-nowrap shadow-md"
            >
                Book an Appointment
            </button>
        </div>
      </div>

      {/* --- SPECIALITIES SECTION --- */}
      <div className="max-w-7xl mx-auto px-8 pb-20 text-center">
        <div className="inline-block border-b-2 border-[#008985] pb-2 mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Specialities</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {specialitiesList.map((spec) => (
                <div 
                  key={spec.name} 
                  className="flex flex-col items-center group cursor-pointer" 
                  onClick={() => handleSpecialityIconClick(spec.name)}
                >
                    <div className="w-24 h-24 rounded-full border-2 border-[#008985] flex items-center justify-center mb-4 group-hover:bg-[#008985] transition duration-300 shadow-sm">
                        <span className="text-4xl group-hover:scale-110 transition duration-300">{spec.icon}</span>
                    </div>
                    <p className="font-bold text-gray-800 text-base group-hover:text-[#008985] transition">{spec.name}</p>
                </div>
            ))}
        </div>
        
        <button 
            onClick={() => handleSpecialityIconClick('All Specialities')}
            className="mt-12 px-8 py-3 bg-[#008985] text-white font-bold rounded hover:bg-[#006e6a] transition"
        >
            View All Specialities ➔
        </button>
      </div>

      {/* --- ASK RUFA CURE BANNER --- */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="bg-gradient-to-r from-[#008985] to-[#005a57] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-xl">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white opacity-10 rounded-full -mb-10 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full pointer-events-none"></div>

          <div className="relative z-10 md:w-3/5 text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Ask anything about your health.
            </h2>
            <p className="text-xl text-[#b3e5e1] mb-8 font-medium">
              Get trusted answers directly from RuFa Cure.
            </p>
            <button 
              onClick={() => navigate('/ask-rufa')} 
              className="bg-white text-[#008985] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 shadow-md"
            >
              <span className="text-xl">✨</span> 
              <span>Ask RuFa Cure</span> 
              <sup className="text-xs font-bold text-[#005a57] mt-2">beta</sup>
            </button>
          </div>

          <div className="relative z-10 md:w-2/5 flex justify-end items-center">
            <div className="relative w-48 h-48 md:w-56 md:h-56 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
               <span className="text-[100px]">👨‍⚕️</span>
               <span className="absolute top-4 left-0 text-3xl">💊</span>
               <span className="absolute bottom-4 right-0 text-3xl">🛡️</span>
               <span className="absolute top-1/2 -left-8 text-3xl">❓</span>
            </div>
          </div>

        </div>
      </div>

      {/* --- SECTION 3: DOCTOR STATS --- */}
      <div className="max-w-5xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center bg-white rounded-lg shadow-xl mb-20 border border-gray-100">
        <div className="border-r border-gray-100 last:border-0">
          <p className="text-4xl font-extrabold text-[#008985]">27+</p>
          <p className="text-md font-bold text-gray-600 mt-2">Years</p>
        </div>
        <div className="border-r border-gray-100 last:border-0">
          <p className="text-4xl font-extrabold text-[#008985]">5M+</p>
          <p className="text-md font-bold text-gray-600 mt-2">Patients Treated</p>
        </div>
        <div className="border-r border-gray-100 last:border-0">
          <p className="text-4xl font-extrabold text-[#008985]">35+</p>
          <p className="text-md font-bold text-gray-600 mt-2">Specialities</p>
        </div>
        <div className="last:border-0">
          <p className="text-4xl font-extrabold text-[#008985]">1200+</p>
          <p className="text-md font-bold text-gray-600 mt-2">Doctors</p>
        </div>
      </div>

      {/* --- SECTION 4: DOCTOR TILES --- */}
      <div className="max-w-7xl mx-auto px-8 pb-28 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="bg-white p-8 rounded-2xl shadow-lg relative border border-gray-100">
          <h4 className="text-2xl font-bold mb-6 text-gray-900">Latest Visited <br /> doctor</h4>
          <div className="flex gap-4 items-center">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => <div key={i} className="w-16 h-16 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center"><p className="text-xs text-gray-400">Dr</p></div>)}
            </div>
            <p className="text-lg text-gray-600">
              More then <span className="font-bold text-gray-900">4K doctor</span> <br />
              at your services
            </p>
          </div>
          <div className="absolute top-8 right-8 text-[#008985] text-2xl">↗</div>
        </div>

        <div className="bg-[#b3e5e1] p-8 rounded-2xl text-center flex flex-col items-center shadow-lg">
          <span className="px-4 py-1 bg-white text-[#008985] font-bold rounded-full text-sm mb-4">Doctors</span>
          <h4 className="text-2xl font-bold mb-6 text-gray-900 leading-tight">Our Specialist <br /> doctor</h4>
          <div className="flex items-center justify-center gap-6 mt-2 text-gray-600 text-3xl">
            <span>🫀</span><span>🧠</span><span>👨‍⚕️</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex flex-col justify-between items-start">
            <h4 className="text-xl font-bold leading-snug text-gray-900 mb-6">Connect with our <br /> professional <br /> doctor</h4>
            <button 
              onClick={handleMakeAppointment}
              className="px-5 py-2 bg-[#008985] text-white font-bold rounded text-sm hover:bg-[#006e6a] transition"
            >
              Connect Now
            </button>
          </div>
          <div className="bg-gray-200 w-full h-full rounded-lg flex items-center justify-center">
            <p className="text-xs text-gray-500 italic">Therapy Placeholder</p>
          </div>
        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Home;