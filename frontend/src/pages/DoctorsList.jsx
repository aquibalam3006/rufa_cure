import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Doctors() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const initialFilter = location.state?.filterSpeciality || 'All Specialities';
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState(null);

  // ==========================================
  // 1. BACKEND SYNC LOGIC (EFFECT)
  // ==========================================
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check Auth Status
    const token = localStorage.getItem('token');
    if (token) setIsLoggedIn(true);

    // 🚀 Fetch Doctors from Centralized Route (Live URL)
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors/all`);
        const data = await response.json();
        
        if (data.ok) {
          // Mapping backend data fields to your specific UI keys
          const formatted = data.doctors.map(doc => ({
            id: doc._id,
            name: doc.name,
            speciality: doc.speciality,
            degrees: doc.highestQualification || "MBBS, MD",
            experience: `${doc.totalExperience || '0'}+ Years`,
            fee: `₹${doc.consultationFee || '500'}`,
            rating: doc.rating || "5.0",
            availability: doc.morningSlot ? `${doc.morningSlot} & ${doc.eveningSlot}` : "Mon - Sat",
            imageColor: doc.imageColor || "bg-[#008985]",
            initials: doc.initials || doc.name.charAt(0).toUpperCase(),
            // Detailed Fields for Modal
            regNo: doc.medicalRegNumber,
            council: doc.stateMedicalCouncil,
            bio: doc.bio || "Highly dedicated specialist at RuFa Cure.",
            clinicName: doc.clinicName || "RuFa Partner Clinic",
            clinicAddress: doc.clinicAddress || "Contact clinic for full address",
            languages: doc.languagesSpoken || "Hindi, English"
          }));
          setDoctorsList(formatted);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [navigate, API_URL]);

  const handleBookAppointment = (doctorObj, e) => {
    if (e) e.stopPropagation();
    if (isLoggedIn) {
      navigate('/appointment', { 
        state: { speciality: doctorObj.speciality, doctor: doctorObj.name } 
      });
    } else {
      alert("Please login first to book an appointment.");
      navigate('/login');
    }
  };

  const filteredDoctors = selectedFilter === 'All Specialities' || selectedFilter === ''
    ? doctorsList
    : doctorsList.filter(doc => doc.speciality === selectedFilter);

  const availableCategories = ['All Specialities', 'General Physician', 'Cardiology', 'Neurology', 'Orthopaedics', 'Paediatrics', 'Dermatology', 'Gynaecology', 'ENT', 'Dentist'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col relative">
      <Navbar />

      {/* DETAILED MODAL */}
      {selectedDoctorDetail && (
        <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in max-h-[90vh] flex flex-col">
            <button onClick={() => setSelectedDoctorDetail(null)} className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center text-lg sm:text-xl z-20 transition-all">✕</button>
            
            {/* Modal Header (Scrollable nahi hoga) */}
            <div className="bg-gradient-to-r from-[#008985] to-[#005a57] p-6 sm:p-8 md:p-12 flex flex-col md:flex-row items-center gap-4 sm:gap-8 text-white relative shrink-0">
              <div className={`w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full ${selectedDoctorDetail.imageColor} flex items-center justify-center text-white text-4xl sm:text-5xl font-black border-4 border-white shadow-xl shrink-0`}>
                {selectedDoctorDetail.initials}
              </div>
              <div className="text-center md:text-left z-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-1 sm:mb-2">{selectedDoctorDetail.name}</h2>
                <p className="text-teal-100 font-bold text-sm sm:text-lg mb-1">{selectedDoctorDetail.degrees}</p>
                <span className="inline-block bg-white text-[#008985] px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold mt-2 shadow-sm uppercase tracking-wider">{selectedDoctorDetail.speciality}</span>
              </div>
            </div>

            {/* Modal Body (Scrollable hoga mobile pe) */}
            <div className="p-5 sm:p-8 md:p-10 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                
                <div className="md:col-span-2 space-y-6 sm:space-y-8">
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2"><span>📝</span> About Doctor</h4>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-medium">{selectedDoctorDetail.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100">
                    <div><p className="text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase">Registration</p><p className="font-bold text-gray-800 text-xs sm:text-sm">{selectedDoctorDetail.regNo}</p></div>
                    <div><p className="text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase">Experience</p><p className="font-bold text-gray-800 text-xs sm:text-sm">{selectedDoctorDetail.experience}</p></div>
                    <div><p className="text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase">Languages</p><p className="font-bold text-gray-800 text-xs sm:text-sm">{selectedDoctorDetail.languages}</p></div>
                    <div><p className="text-[10px] sm:text-xs font-bold text-gray-400 mb-1 uppercase">Rating</p><p className="font-bold text-yellow-500 text-xs sm:text-sm">⭐ {selectedDoctorDetail.rating}</p></div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-[#e6f4f4]/50 border border-[#b3e5e1] p-5 sm:p-6 rounded-xl sm:rounded-2xl">
                    <h4 className="font-bold text-[#005a57] mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"><span>🏥</span> Clinic Details</h4>
                    <p className="font-extrabold text-gray-900 mb-1 text-sm sm:text-base">{selectedDoctorDetail.clinicName}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3 sm:mb-4">{selectedDoctorDetail.clinicAddress}</p>
                    <div className="pt-3 sm:pt-4 border-t border-[#b3e5e1]/50"><p className="text-[10px] sm:text-xs font-bold text-gray-500 mb-1">Fee</p><p className="text-xl sm:text-2xl font-black text-[#008985]">{selectedDoctorDetail.fee}</p></div>
                  </div>
                  <div className="bg-gray-50 p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-sm">Availability</h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-bold flex items-center gap-2"><span>🕒</span> {selectedDoctorDetail.availability}</p>
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between items-center gap-3 sm:gap-0">
                <button onClick={() => setSelectedDoctorDetail(null)} className="w-full sm:w-auto px-6 py-2.5 sm:py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition text-sm sm:text-base border sm:border-none border-gray-200">Close</button>
                <button onClick={(e) => { setSelectedDoctorDetail(null); handleBookAppointment(selectedDoctorDetail, e); }} className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-3.5 bg-[#008985] text-white font-extrabold rounded-xl shadow-lg hover:bg-[#005a57] transition text-sm sm:text-base">Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-10 sm:py-16 px-4 sm:px-8 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-4">Our Specialists</h1>
        <p className="text-sm sm:text-lg text-teal-100 max-w-2xl mx-auto font-medium">Find the best doctors and book your appointment instantly.</p>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full -mt-6 sm:-mt-8 relative z-10 mb-8 sm:mb-12">
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <span className="absolute left-3 sm:left-4 top-3 sm:top-3.5 text-gray-400 text-sm sm:text-base">🔍</span>
            <input type="text" placeholder="Search doctor by name..." className="w-full pl-9 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none focus:bg-white focus:border-[#008985] transition text-sm sm:text-base" />
          </div>
          <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="w-full md:w-auto py-2.5 sm:py-3 px-4 sm:px-6 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl outline-none font-bold text-gray-600 cursor-pointer hover:border-[#008985] transition text-sm sm:text-base">
            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* DOCTORS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-16 sm:pb-20 flex-1 w-full">
        {loading ? (
          <div className="text-center py-16 sm:py-20 font-bold text-gray-400 text-lg sm:text-xl animate-pulse">Fetching Specialists...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} onClick={() => setSelectedDoctorDetail(doctor)} className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col h-full group cursor-pointer transform hover:-translate-y-1">
                  
                  <div className="flex justify-center mb-4 sm:mb-6 mt-2 sm:mt-4 relative">
                    <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full ${doctor.imageColor} flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold border-4 border-[#e6f4f4]`}>{doctor.initials}</div>
                    <div className="absolute top-0 right-1/4 sm:right-1/4 bg-green-100 text-green-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-extrabold border border-green-200 shadow-sm flex items-center"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-1"></span>Available</div>
                  </div>
                  
                  <div className="text-center mb-5 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 group-hover:text-[#008985] transition-colors">{doctor.name}</h2>
                    <p className="text-[#008985] font-bold text-xs sm:text-sm mt-1">{doctor.speciality}</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs font-medium mt-1.5 sm:mt-2 px-2 sm:px-4">{doctor.degrees}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex justify-between items-center mb-5 sm:mb-6 border border-gray-100 text-center">
                    <div className="flex-1 border-r border-gray-200"><p className="text-[10px] sm:text-xs text-gray-400 font-bold">Exp</p><p className="text-xs sm:text-sm font-extrabold text-gray-800">{doctor.experience}</p></div>
                    <div className="flex-1 border-r border-gray-200"><p className="text-[10px] sm:text-xs text-gray-400 font-bold">Rating</p><p className="text-xs sm:text-sm font-extrabold text-gray-800">⭐ {doctor.rating}</p></div>
                    <div className="flex-1"><p className="text-[10px] sm:text-xs text-gray-400 font-bold">Fee</p><p className="text-xs sm:text-sm font-extrabold text-[#008985]">{doctor.fee}</p></div>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 text-[10px] sm:text-xs font-bold text-gray-500 justify-center bg-[#e6f4f4]/50 py-1.5 sm:py-2 rounded-lg">🕒 {doctor.availability}</div>
                    <button onClick={(e) => handleBookAppointment(doctor, e)} className="w-full bg-[#008985] text-white py-3 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#005a57] shadow-md flex items-center justify-center gap-2 transition"><span>📅</span> Book Appointment</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 sm:py-20 text-center animate-fade-in">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800">No Doctors Available</h3>
                <p className="text-sm sm:text-base text-gray-500 mt-2">Try changing your filter settings or search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Doctors;