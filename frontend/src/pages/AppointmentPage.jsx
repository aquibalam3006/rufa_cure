import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AppointmentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const preFilledData = location.state || {};

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    speciality: preFilledData.speciality || '',
    doctor: preFilledData.doctor || '',
    dateTime: '',
    message: ''
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setFormData(prevData => ({
          ...prevData,
          name: userObj.fullName || userObj.name || '',
          email: userObj.email || ''
        }));
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const allDoctors = [
    { name: 'Dr. Abdul Barr', speciality: 'Dermatology', fee: 500, upiId: 'dr.abdul@paytm' },
    { name: 'Dr. Sarah Jenkins', speciality: 'Cardiology', fee: 800, upiId: 'sarah.cardio@okhdfcbank' },
    { name: 'Dr. Amit Patel', speciality: 'Cardiology', fee: 800, upiId: 'amitpatel@upi' },
    { name: 'Dr. Emily Chen', speciality: 'Neurology', fee: 1000, upiId: 'dremily@icici' },
    { name: 'Dr. Raj Singh', speciality: 'Orthopaedics', fee: 600, upiId: 'rajortho@ybl' },
    { name: 'Dr. Neha Sharma', speciality: 'General Physician', fee: 400, upiId: 'nehasharma@sbi' },
    { name: 'Dr. Vikram Kumar', speciality: 'General Physician', fee: 400, upiId: 'vikram.doc@upi' },
    { name: 'Dr. Pooja Desai', speciality: 'Gynaecology', fee: 700, upiId: 'drpooja@paytm' },
    { name: 'Dr. Rohan Mehta', speciality: 'Paediatrics', fee: 500, upiId: 'rohan.kids@okicici' },
    { name: 'Dr. Sameer Khan', speciality: 'Dentist', fee: 350, upiId: 'sameerdentist@upi' },
    { name: 'Dr. Kavita Rao', speciality: 'ENT', fee: 450, upiId: 'drkavita.ent@ybl' }
  ];

  const availableDoctors = formData.speciality 
    ? allDoctors.filter(doc => doc.speciality === formData.speciality)
    : allDoctors;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'speciality') {
      setFormData({ ...formData, speciality: value, doctor: '' }); 
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ==========================================
  // UPDATED HANDLESUBMIT (BACKEND CONNECTED)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return alert("Please login first to book an appointment!");
    const user = JSON.parse(userStr);

    const selectedDoc = allDoctors.find(d => d.name === formData.doctor);
    const doctorFee = selectedDoc ? selectedDoc.fee : 500; 
    const doctorUpi = selectedDoc ? selectedDoc.upiId : 'rufacure@upi';

    try {
      // 🚀 Backend par appointment create kar rahe hain (Live URL)
      const response = await fetch(`${API_URL}/api/appointments/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          patientId: user.id || user._id, // User ki ID bhej rahe hain
          fee: doctorFee
        })
      });

      const data = await response.json();
      
      if (data.ok) {
        // Agar backend par save ho gaya, toh Payment page par navigate karo
        navigate('/payment', { 
          state: { 
            ...formData, 
            fee: doctorFee,
            upiId: doctorUpi,
            appointmentId: data.appointmentId // Backend se aayi unique ID
          } 
        });
      } else {
        alert("Booking failed: " + data.message);
      }
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Server connection error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Navbar />
      {/* Mobile par padding kam, Laptop par zyada */}
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-12">
        <div className="max-w-6xl w-full flex flex-col md:flex-row shadow-2xl rounded-2xl md:rounded-lg overflow-hidden relative bg-white">
          
          {/* LEFT SIDE (TEAL PANEL) */}
          <div className="w-full md:w-2/5 bg-[#008985] text-white p-8 sm:p-10 flex flex-col relative z-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 md:mb-10 z-10">Make an Appointment</h2>
            
            {/* Overlapping Contact Card: Mobile par margin bottom, Desktop par margin right nikalna */}
            <div className="bg-white text-gray-800 p-5 sm:p-6 rounded-lg shadow-lg flex items-start gap-4 z-10 w-full md:w-auto md:-mr-16 lg:-mr-12 border-l-4 border-[#e75a31] mb-4 md:mb-0">
              <div className="bg-red-50 text-[#e75a31] p-3 rounded-full text-xl sm:text-2xl flex-shrink-0">📅</div>
              <div>
                <h4 className="font-bold text-base sm:text-lg mb-1">For Appointments</h4>
                <p className="text-gray-600 font-medium text-sm sm:text-base">+91 8447 666 333</p>
                <p className="text-gray-600 font-medium text-xs sm:text-sm mt-1">info@rufacure.com</p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#005a57] opacity-20 transform -skew-y-6 z-0"></div>
          </div>

          {/* RIGHT SIDE (FORM PANEL) */}
          <div className="w-full md:w-3/5 bg-white p-6 sm:p-8 md:p-12 md:pl-20">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Name*</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] font-medium text-sm sm:text-base" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Mobile*</label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] font-medium text-sm sm:text-base" required />
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] font-medium text-sm sm:text-base" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Speciality*</label>
                  <select name="speciality" value={formData.speciality} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] cursor-pointer font-medium text-sm sm:text-base bg-white" required>
                    <option value="">Select Speciality</option>
                    {allDoctors.map(d => d.speciality).filter((v, i, a) => a.indexOf(v) === i).map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Doctor*</label>
                  <select name="doctor" value={formData.doctor} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] cursor-pointer font-medium text-sm sm:text-base bg-white" required disabled={!formData.speciality}>
                    <option value="">Select Doctor</option>
                    {availableDoctors.map((doc, index) => (
                      <option key={index} value={doc.name}>{doc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Date Time*</label>
                <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] text-gray-600 font-medium text-sm sm:text-base bg-white" required />
              </div>

              <div>
                <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Message*</label>
                <textarea rows="3" name="message" value={formData.message} onChange={handleChange} className="w-full border border-gray-300 p-2.5 sm:p-3 rounded focus:outline-none focus:border-[#008985] font-medium text-sm sm:text-base resize-none" required></textarea>
              </div>

              <div className="pt-2 sm:pt-4">
                <button type="submit" className="w-full sm:w-auto bg-[#008985] text-white font-bold py-3 px-8 sm:px-10 rounded-lg hover:bg-[#005a57] transition shadow-md text-sm sm:text-base">
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppointmentPage;