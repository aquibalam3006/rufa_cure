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
        <div className="fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden relative animate-fade-in my-8">
            <button onClick={() => setSelectedDoctorDetail(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white text-gray-800 rounded-full flex items-center justify-center text-xl z-10 transition-all">✕</button>
            <div className="bg-gradient-to-r from-[#008985] to-[#005a57] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-white relative overflow-hidden">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${selectedDoctorDetail.imageColor} flex items-center justify-center text-white text-5xl font-black border-4 border-white shadow-xl shrink-0`}>
                {selectedDoctorDetail.initials}
              </div>
              <div className="text-center md:text-left z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2">{selectedDoctorDetail.name}</h2>
                <p className="text-teal-100 font-bold text-lg mb-1">{selectedDoctorDetail.degrees}</p>
                <span className="inline-block bg-white text-[#008985] px-4 py-1.5 rounded-full text-sm font-bold mt-2 shadow-sm uppercase tracking-wider">{selectedDoctorDetail.speciality}</span>
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2"><span>📝</span> About Doctor</h4>
                    <p className="text-gray-600 leading-relaxed font-medium">{selectedDoctorDetail.bio}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div><p className="text-xs font-bold text-gray-400 mb-1 uppercase">Registration</p><p className="font-bold text-gray-800">{selectedDoctorDetail.regNo}</p></div>
                    <div><p className="text-xs font-bold text-gray-400 mb-1 uppercase">Experience</p><p className="font-bold text-gray-800">{selectedDoctorDetail.experience}</p></div>
                    <div><p className="text-xs font-bold text-gray-400 mb-1 uppercase">Languages</p><p className="font-bold text-gray-800">{selectedDoctorDetail.languages}</p></div>
                    <div><p className="text-xs font-bold text-gray-400 mb-1 uppercase">Rating</p><p className="font-bold text-yellow-500">⭐ {selectedDoctorDetail.rating}</p></div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-[#e6f4f4]/50 border border-[#b3e5e1] p-6 rounded-2xl">
                    <h4 className="font-bold text-[#005a57] mb-4 flex items-center gap-2"><span>🏥</span> Clinic Details</h4>
                    <p className="font-extrabold text-gray-900 mb-1">{selectedDoctorDetail.clinicName}</p>
                    <p className="text-sm text-gray-600 font-medium mb-4">{selectedDoctorDetail.clinicAddress}</p>
                    <div className="pt-4 border-t border-[#b3e5e1]/50"><p className="text-xs font-bold text-gray-500 mb-1">Fee</p><p className="text-2xl font-black text-[#008985]">{selectedDoctorDetail.fee}</p></div>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Availability</h4>
                    <p className="text-sm text-gray-600 font-bold flex items-center gap-2"><span>🕒</span> {selectedDoctorDetail.availability}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                <button onClick={() => setSelectedDoctorDetail(null)} className="px-6 py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition">Close</button>
                <button onClick={(e) => { setSelectedDoctorDetail(null); handleBookAppointment(selectedDoctorDetail, e); }} className="px-10 py-3.5 bg-[#008985] text-white font-extrabold rounded-xl shadow-lg hover:bg-[#005a57] transition">Book Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-16 px-8 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Specialists</h1>
        <p className="text-lg text-teal-100 max-w-2xl mx-auto font-medium">Find the best doctors and book your appointment instantly.</p>
      </div>

      {/* FILTER SECTION */}
      <div className="max-w-7xl mx-auto px-8 w-full -mt-8 relative z-10 mb-12">
        <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/2">
            <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
            <input type="text" placeholder="Search doctor by name..." className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-[#008985] transition" />
          </div>
          <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="py-3 px-6 bg-gray-50 border border-gray-200 rounded-xl outline-none font-bold text-gray-600 cursor-pointer hover:border-[#008985] transition">
            {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* DOCTORS GRID */}
      <div className="max-w-7xl mx-auto px-8 pb-20 flex-1 w-full">
        {loading ? (
          <div className="text-center py-20 font-bold text-gray-400 text-xl animate-pulse">Fetching Specialists...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} onClick={() => setSelectedDoctorDetail(doctor)} className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col h-full group cursor-pointer transform hover:-translate-y-1">
                  <div className="flex justify-center mb-6 mt-4 relative">
                    <div className={`w-32 h-32 rounded-full ${doctor.imageColor} flex items-center justify-center text-white text-4xl font-extrabold border-4 border-[#e6f4f4]`}>{doctor.initials}</div>
                    <div className="absolute top-0 right-1/4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-[10px] font-extrabold border border-green-200 shadow-sm"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse mr-1"></span>Available</div>
                  </div>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-900 group-hover:text-[#008985] transition-colors">{doctor.name}</h2>
                    <p className="text-[#008985] font-bold text-sm mt-1">{doctor.speciality}</p>
                    <p className="text-gray-500 text-xs font-medium mt-2 px-4">{doctor.degrees}</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 flex justify-between items-center mb-6 border border-gray-100 text-center">
                    <div className="flex-1 border-r border-gray-200"><p className="text-xs text-gray-400 font-bold">Exp</p><p className="text-sm font-extrabold text-gray-800">{doctor.experience}</p></div>
                    <div className="flex-1 border-r border-gray-200"><p className="text-xs text-gray-400 font-bold">Rating</p><p className="text-sm font-extrabold text-gray-800">⭐ {doctor.rating}</p></div>
                    <div className="flex-1"><p className="text-xs text-gray-400 font-bold">Fee</p><p className="text-sm font-extrabold text-[#008985]">{doctor.fee}</p></div>
                  </div>
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-500 justify-center bg-[#e6f4f4]/50 py-2 rounded-lg">🕒 {doctor.availability}</div>
                    <button onClick={(e) => handleBookAppointment(doctor, e)} className="w-full bg-[#008985] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#005a57] shadow-md flex items-center justify-center gap-2 transition"><span>📅</span> Book Appointment</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center animate-fade-in"><h3 className="text-2xl font-bold text-gray-800">No Doctors Available</h3><p className="text-gray-500 mt-2">Try changing your filter settings or search criteria.</p></div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Doctors;