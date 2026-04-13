import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function DoctorProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic'); // basic, professional, clinic, bank
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initial State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    medicalRegNumber: '',
    stateMedicalCouncil: '',
    registrationYear: '',
    highestQualification: '',
    specialization: '',
    totalExperience: '',
    bio: '',
    clinicName: '',
    clinicAddress: '',
    cityPincode: '',
    consultationFee: '',
    languagesSpoken: '',
    morningSlot: '',
    eveningSlot: '',
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    panCardNumber: '',
    upiId: '',
    editCount: 0 // To track restrictions
  });

  // ==========================================
  // 1. DATA FETCH LOGIC (EFFECT)
  // ==========================================
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDoctorData = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) return navigate('/login');

      const userObj = JSON.parse(userStr);
      const userId = userObj.id || userObj._id;

      try {
        const response = await fetch(`http://localhost:5000/api/doctors/detail/${userId}`);
        const data = await response.json();

        if (data.ok && data.profile) {
          // Backend se aane wale data ko state mein set kar rahe hain
          setFormData(data.profile);
        } else {
          // Agar profile nahi milti toh basic user info set kar do
          setFormData(prev => ({
            ...prev,
            name: userObj.name || '',
            email: userObj.email || '',
            phone: userObj.phone || ''
          }));
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorData();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ==========================================
  // 2. UPDATE LOGIC (WITH RESTRICTIONS)
  // ==========================================
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // Check Edit Limit (Max 4 times)
    if (formData.editCount >= 4) {
      return alert("⚠️ Edit Restricted: You have already reached the maximum limit of 4 profile updates.");
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/doctors/setup-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.ok) {
        alert('✅ Doctor Profile Updated Successfully!');
        // Refreshing local state with new edit count
        setFormData(prev => ({ ...prev, editCount: prev.editCount + 1 }));
      } else {
        alert("❌ Update Failed: " + result.message);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("🚨 Server connection error!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // UI Helper Constants
  const cleanName = (formData.name || '').replace(/^dr\.?\s*/i, '');
  const formattedName = 'Dr. ' + cleanName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  const docInitial = cleanName.charAt(0).toUpperCase() || 'D';

  return (
    <div className="min-h-screen bg-[#f4f7f9] font-sans flex flex-col">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-[#008985] text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div>
             <h1 className="text-3xl font-black mb-2">My Professional Profile</h1>
             <p className="text-teal-100 font-medium">Manage your public information, clinic details, and payment UPI.</p>
          </div>
          <button 
            onClick={() => navigate('/doctor-dashboard')}
            className="mt-6 md:mt-0 bg-white text-[#008985] font-extrabold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition flex items-center gap-2"
          >
            <span>🎛️</span> Go to Dashboard
          </button>
        </div>
      </div>

      <div className="flex-grow max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT SIDE: QUICK PREVIEW */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 h-24 w-full"></div>
            <div className="px-6 pb-6 text-center">
              <div className="w-24 h-24 mx-auto -mt-12 bg-[#008985] border-4 border-white rounded-full flex items-center justify-center text-4xl font-black text-white shadow-md mb-4 uppercase">
                {docInitial}
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900">{formattedName}</h2>
              <p className="text-sm font-bold text-[#008985] mb-2 bg-[#e6f4f4] inline-block px-3 py-1 rounded-full mt-1">
                {(formData.specialization || '').split(',')[0] || 'Specialist'}
              </p>
              <p className="text-xs font-bold text-gray-500 mb-4">{formData.highestQualification}</p>
              
              <div className="text-left space-y-4 mt-6 border-t border-gray-100 pt-6">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Reg. Number</p>
                  <p className="font-bold text-gray-800 text-sm">{formData.medicalRegNumber || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">⭐ Experience</p>
                  <p className="font-bold text-gray-800 text-sm">{formData.totalExperience || '0'} Years</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">🏥 Clinic</p>
                  <p className="font-bold text-gray-800 text-sm leading-tight">
                    {formData.clinicName || 'Clinic Name'} <br/>
                    <span className="font-medium text-gray-500 text-xs">{formData.cityPincode}</span>
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-xl border border-green-100 flex items-center justify-between">
                  <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Consultation Fee</p>
                  <p className="font-black text-green-600 text-lg">₹{formData.consultationFee || '0'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: FULL PROFILE FORM */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
            
            {/* Form Tabs */}
            <div className="flex border-b border-gray-100 overflow-x-auto hide-scrollbar">
              <button onClick={() => setActiveTab('basic')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'basic' ? 'border-[#008985] text-[#008985]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>👤 Basic Info</button>
              <button onClick={() => setActiveTab('professional')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'professional' ? 'border-[#008985] text-[#008985]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>🎓 Professional Details</button>
              <button onClick={() => setActiveTab('clinic')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'clinic' ? 'border-[#008985] text-[#008985]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>🏥 Clinic Setup</button>
              <button onClick={() => setActiveTab('bank')} className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-all ${activeTab === 'bank' ? 'border-[#008985] text-[#008985]' : 'border-transparent text-gray-500 hover:bg-gray-50'}`}>💳 Bank & UPI</button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-8">
              
              {/* TAB 1: BASIC INFO */}
              {activeTab === 'basic' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Account & Identity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" disabled /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number</label><input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PROFESSIONAL */}
              {activeTab === 'professional' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Professional Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Medical Reg. Number</label><input type="text" name="medicalRegNumber" value={formData.medicalRegNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">State Medical Council</label><input type="text" name="stateMedicalCouncil" value={formData.stateMedicalCouncil} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Registration Year</label><input type="text" name="registrationYear" value={formData.registrationYear} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Total Experience (Years)</label><input type="text" name="totalExperience" value={formData.totalExperience} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Highest Qualification</label><input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label><input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Professional Bio</label><textarea rows="3" name="bio" value={formData.bio} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-medium text-gray-800 resize-none"></textarea></div>
                  </div>
                </div>
              )}

              {/* TAB 3: CLINIC */}
              {activeTab === 'clinic' && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4">Clinic & Availability</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Clinic Name</label><input type="text" name="clinicName" value={formData.clinicName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Clinic Address</label><textarea rows="2" name="clinicAddress" value={formData.clinicAddress} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800 resize-none" required></textarea></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">City & Pincode</label><input type="text" name="cityPincode" value={formData.cityPincode} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Consultation Fee (₹)</label><input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Morning Timings</label><input type="text" name="morningSlot" value={formData.morningSlot} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Evening Timings</label><input type="text" name="eveningSlot" value={formData.eveningSlot} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" /></div>
                    <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Languages Spoken</label><input type="text" name="languagesSpoken" value={formData.languagesSpoken} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" /></div>
                  </div>
                </div>
              )}

              {/* TAB 4: BANK & UPI */}
              {activeTab === 'bank' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6 pb-4 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">Banking & Payments</h3>
                    <p className="text-sm text-gray-500 mt-1">Manage where you receive your consultation payments.</p>
                  </div>

                  {/* UPI ID BLOCK */}
                  <div className="bg-[#e6f4f4] p-6 rounded-2xl border-2 border-dashed border-[#008985] mb-8 relative overflow-hidden">
                    <span className="absolute -right-4 -bottom-4 text-6xl opacity-10">📱</span>
                    <h4 className="text-lg font-bold text-[#005a57] mb-2 flex items-center gap-2">
                      <span>⚡</span> UPI ID for Patient Payments
                    </h4>
                    <p className="text-sm text-gray-600 font-medium mb-4">Used to generate Dynamic QR Codes for booking appointments.</p>
                    <div className="max-w-md">
                      <label className="block text-sm font-bold text-gray-800 mb-2">Your Virtual Payment Address (VPA)</label>
                      <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="e.g. 9876543210@paytm" className="w-full bg-white border border-[#b3e5e1] rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-black text-gray-900 tracking-wide" required />
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-gray-800 mb-4">Bank Details (For Admin Payouts)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Account Holder Name</label><input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">Account Number</label><input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">IFSC Code</label><input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                    <div><label className="block text-sm font-bold text-gray-700 mb-2">PAN Card Number</label><input type="text" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] font-bold text-gray-800" required /></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting || formData.editCount >= 4} 
                  className={`py-3 px-10 rounded-xl transition shadow-lg text-lg flex items-center gap-2 font-extrabold ${formData.editCount >= 4 ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-[#008985] text-white hover:bg-[#005a57]'}`}
                >
                  {isSubmitting ? 'Updating...' : formData.editCount >= 4 ? 'Edit Limit Reached' : <><span>💾</span> Save All Changes</>}
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

export default DoctorProfile;