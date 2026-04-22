import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function DoctorProfileForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const storedUser = JSON.parse(localStorage.getItem('user')) || {};

  const [formData, setFormData] = useState({
    // Step 1
    userId: storedUser.id || storedUser._id || '',
    name: storedUser.name || '',
    email: storedUser.email || '',
    phone: storedUser.phone || '',
    gender: '',
    dob: '',
    
    // Step 2
    medicalRegNumber: '',
    stateMedicalCouncil: '',
    registrationYear: '',
    highestQualification: '',
    specialization: '',
    totalExperience: '',
    
    // Step 3
    clinicName: '',
    clinicAddress: '',
    cityPincode: '',
    consultationFee: '',
    consultationType: [],
    languagesSpoken: '',
    morningSlot: '',
    eveningSlot: '',

    // Step 4: Documents
    aadharCard: null,
    panCardDoc: null,
    medicalDegree: null,
    mciCertificate: null,
    clinicRegProof: null,

    // Step 5: Bank & KYC
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    panCardNumber: '',
    upiId: '', 
    termsAccepted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
        setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
        if (name === 'termsAccepted') {
            setFormData({ ...formData, [name]: checked });
        } else {
            let updatedList = [...(formData[name] || [])];
            if (checked) updatedList.push(value);
            else updatedList = updatedList.filter(item => item !== value);
            setFormData({ ...formData, [name]: updatedList });
        }
    } else {
        setFormData({ ...formData, [name]: value });
    }
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.dob || !formData.gender) {
        alert("⚠️ Please fill all mandatory fields in Step 1.");
        return false;
      }
    } 
    else if (step === 2) {
      if (!formData.medicalRegNumber || !formData.stateMedicalCouncil || !formData.registrationYear || !formData.totalExperience || !formData.highestQualification || !formData.specialization) {
        alert("⚠️ Please fill all mandatory fields in Step 2.");
        return false;
      }
    } 
    else if (step === 3) {
      if (!formData.clinicName || !formData.clinicAddress || !formData.cityPincode || !formData.consultationFee || !formData.languagesSpoken || formData.consultationType.length === 0) {
        alert("⚠️ Please fill all mandatory fields in Step 3.");
        return false;
      }
    }
    else if (step === 4) {
      if (!formData.aadharCard || !formData.panCardDoc || !formData.medicalDegree || !formData.mciCertificate) {
        alert("⚠️ Please upload all mandatory documents in Step 4.");
        return false;
      }
    }
    return true; 
  };

  const handleNext = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // ==========================================
  // UPDATED HANDLESUBMIT (BACKEND CONNECTED)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.accountHolderName || !formData.accountNumber || !formData.ifscCode || !formData.panCardNumber || !formData.upiId) {
        return alert("⚠️ Please fill all Banking & KYC details.");
    }
    if (!formData.termsAccepted) {
        return alert("⚠️ Please accept the Terms & Conditions.");
    }

    setIsSubmitting(true);
    try {
        const fData = new FormData();
        
        // Data processing and appending
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null && formData[key] !== undefined) {
                if (formData[key] instanceof File) {
                    fData.append(key, formData[key]);
                } else if (Array.isArray(formData[key])) {
                    fData.append(key, JSON.stringify(formData[key]));
                } else {
                    fData.append(key, formData[key]);
                }
            }
        });

        // 2. Files Append karna (Agar upload ki gayi hain)
        if (formData.aadharCard) fData.append('aadharCard', formData.aadharCard);
        if (formData.panCardDoc) fData.append('panCardDoc', formData.panCardDoc);
        if (formData.medicalDegree) fData.append('medicalDegree', formData.medicalDegree);
        if (formData.mciCertificate) fData.append('mciCertificate', formData.mciCertificate);
        if (formData.clinicRegProof) fData.append('clinicRegProof', formData.clinicRegProof);

        // 🚀 LIVE BACKEND URL
        const API_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${API_URL}/api/doctors/setup-profile`, {
            method: 'POST',
            body: fData,
        });

        const result = await response.json();

        if (result.ok) {
            setIsSubmitting(false);
            setShowSuccessPopup(true);
            
            // LocalStorage sync
            const user = JSON.parse(localStorage.getItem('user'));
            user.hasProfile = true;
            localStorage.setItem('user', JSON.stringify(user));

            setTimeout(() => navigate('/'), 3500);
        } else {
            setIsSubmitting(false);
            alert("❌ " + (result.message || "Submission failed"));
        }
    } catch (error) {
        console.error("Submission Error:", error);
        setIsSubmitting(false);
        alert("🚨 Server Error! Please check if backend is running.");
    }
  };

  const progressPercentage = (step - 1) * 25; 

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans relative">
      <style>
        {`
          @keyframes popIn { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.05); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
          .animate-popIn { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          @keyframes checkmark { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
          .animate-checkmark { animation: checkmark 0.6s ease-out 0.2s both; }
        `}
      </style>

      <Navbar />
      
      <div className="flex-grow flex items-center justify-center p-4 sm:p-6 my-4 sm:my-8">
        <div className="bg-white max-w-4xl w-full rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#008985] to-[#005a57] p-6 sm:p-8 md:p-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Complete Your Profile</h2>
            <p className="text-[#b3e5e1] text-sm sm:text-base">Help us verify your details so you can start treating patients.</p>
            
            <div className="mt-6 sm:mt-8">
                <div className="flex justify-between text-xs sm:text-sm font-medium mb-2">
                    <span>Step {step} of 5</span>
                    <span>{progressPercentage}% Completed</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2 sm:h-2.5">
                    <div className="bg-white h-2 sm:h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            
            {/* STEP 1: ACCOUNT & IDENTITY */}
            {step === 1 && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 border-b pb-2 mb-4 sm:mb-6">Step 1: Account & Identity</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Full Name *</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#008985] outline-none bg-gray-50 text-sm sm:text-base" placeholder="Dr. Rahul Verma" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Email ID *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg outline-none bg-gray-50 text-sm sm:text-base" disabled /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Mobile Number *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#008985] outline-none bg-gray-50 text-sm sm:text-base" placeholder="98765 43210" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Date of Birth *</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#008985] outline-none bg-gray-50 text-sm sm:text-base" /></div>
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Gender *</label>
                    <div className="flex flex-wrap gap-4 sm:gap-6">
                        {['Male', 'Female', 'Other'].map(g => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer text-sm sm:text-base"><input type="radio" name="gender" value={g} onChange={handleChange} checked={formData.gender === g} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#008985]" /> {g}</label>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PROFESSIONAL */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 border-b pb-2 mb-4 sm:mb-6">Step 2: Professional Verification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Medical Reg. Number *</label><input type="text" name="medicalRegNumber" value={formData.medicalRegNumber} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#008985] outline-none bg-gray-50 text-sm sm:text-base" placeholder="MCI-12345-UP" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">State Medical Council *</label><select name="stateMedicalCouncil" value={formData.stateMedicalCouncil} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#008985] outline-none bg-gray-50 text-sm sm:text-base"><option value="">Select Council</option><option value="Delhi Medical Council">Delhi Medical Council</option><option value="UP Medical Council">UP Medical Council</option><option value="Maharashtra Medical Council">Maharashtra Medical Council</option></select></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Registration Year *</label><input type="number" name="registrationYear" value={formData.registrationYear} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" placeholder="e.g. 2015" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Total Experience (Years) *</label><input type="number" name="totalExperience" value={formData.totalExperience} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" placeholder="e.g. 8" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Highest Qualification *</label><select name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base"><option value="">Select Qualification</option><option value="MBBS">MBBS</option><option value="MD">MD</option><option value="MS">MS</option><option value="BDS">BDS</option></select></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Specialization *</label><input type="text" name="specialization" value={formData.specialization} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" placeholder="Cardiologist, General Physician" /></div>
                </div>
              </div>
            )}

            {/* STEP 3: CLINIC */}
            {step === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 border-b pb-2 mb-4 sm:mb-6">Step 3: Clinic & Availability</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="md:col-span-2"><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Clinic Name *</label><input type="text" name="clinicName" value={formData.clinicName} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div className="md:col-span-2"><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Clinic Address *</label><textarea name="clinicAddress" rows="2" value={formData.clinicAddress} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base"></textarea></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">City & Pincode *</label><input type="text" name="cityPincode" value={formData.cityPincode} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Fee (₹) *</label><input type="number" name="consultationFee" value={formData.consultationFee} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Languages Spoken *</label><input type="text" name="languagesSpoken" value={formData.languagesSpoken} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Consultation Type *</label>
                    <div className="flex gap-4 mt-2 sm:mt-3">
                        <label className="flex items-center gap-2 text-sm sm:text-base"><input type="checkbox" name="consultationType" value="In-Clinic" onChange={handleChange} checked={formData.consultationType.includes("In-Clinic")} /> In-Clinic</label>
                        <label className="flex items-center gap-2 text-sm sm:text-base"><input type="checkbox" name="consultationType" value="Video Consult" onChange={handleChange} checked={formData.consultationType.includes("Video Consult")} /> Video Consult</label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: UPLOAD DOCS */}
            {step === 4 && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 border-b pb-2 mb-4 sm:mb-6">Step 4: Upload Verification Documents</h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {[
                    {label: 'Aadhar Card *', name: 'aadharCard'},
                    {label: 'PAN Card *', name: 'panCardDoc'},
                    {label: 'Medical Degree *', name: 'medicalDegree'},
                    {label: 'State/MCI Certificate *', name: 'mciCertificate'},
                    {label: 'Clinic Proof (Opt)', name: 'clinicRegProof'}
                  ].map(doc => (
                    <div key={doc.name} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl gap-2 sm:gap-4">
                        <p className="font-bold text-gray-800 text-xs sm:text-sm">{doc.label}</p>
                        <input type="file" name={doc.name} onChange={handleChange} className="text-[10px] sm:text-xs file:bg-[#008985] file:text-white file:border-0 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-full cursor-pointer w-full sm:w-auto" accept=".pdf,.jpg,.png" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: BANK DETAILS */}
            {step === 5 && (
              <div className="space-y-4 sm:space-y-6 animate-fadeIn">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 border-b pb-2 mb-4 sm:mb-6">Step 5: Banking & Payouts</h3>
                <div className="bg-[#e6f4f4] p-4 sm:p-5 rounded-lg sm:rounded-xl border border-[#b3e5e1] mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-bold text-[#005a57] mb-1.5 sm:mb-2">Your UPI ID (For Patient Payments) *</label>
                    <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} className="w-full p-2.5 sm:p-3 border-2 border-[#008985] rounded-lg outline-none font-bold text-sm sm:text-base" placeholder="e.g. 9876543210@paytm" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Account Holder Name *</label><input type="text" name="accountHolderName" value={formData.accountHolderName} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Account Number *</label><input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">IFSC Code *</label><input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                  <div><label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">PAN Card Number *</label><input type="text" name="panCardNumber" value={formData.panCardNumber} onChange={handleChange} className="w-full p-2.5 sm:p-3 border rounded-lg bg-gray-50 text-sm sm:text-base" /></div>
                </div>
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-[#f8fdfc] border rounded-lg">
                    <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                        <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-0 text-[#008985]" />
                        <span className="text-xs sm:text-sm text-gray-700">I agree to RuFa Cure Terms & Conditions and verify that the information is correct.</span>
                    </label>
                </div>
              </div>
            )}

            {/* Form Controls (Next/Prev/Submit) */}
            <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                {step > 1 ? (
                  <button type="button" onClick={prevStep} className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-[#008985] text-[#008985] font-bold rounded-lg hover:bg-gray-50 transition text-sm sm:text-base order-2 sm:order-1">← Back</button>
                ) : <div className="hidden sm:block order-2 sm:order-1"></div>}
                
                {step < 5 ? (
                  <button type="button" onClick={handleNext} className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#008985] text-white font-bold rounded-lg hover:bg-[#005a57] shadow-md text-sm sm:text-base order-1 sm:order-2">Next Step →</button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-[#e75a31] text-white font-bold rounded-lg hover:bg-[#d64a22] transition shadow-lg text-sm sm:text-base order-1 sm:order-2">
                    {isSubmitting ? 'Submitting...' : 'Submit for Verification ✅'}
                  </button>
                )}
            </div>

          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm p-4">
          <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl max-w-sm w-full text-center shadow-2xl animate-popIn">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#e6f4f4] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"><span className="text-4xl sm:text-5xl animate-checkmark">✅</span></div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-2 sm:mb-3">Profile Submitted!</h3>
            <p className="text-sm sm:text-base text-gray-500 font-medium mb-6 sm:mb-8 leading-relaxed">Thank you, Dr. {formData.name}.<br/>Your profile is under review.</p>
            <button onClick={() => navigate('/')} className="w-full bg-[#008985] text-white font-bold py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-[#005a57] transition-colors shadow-lg text-sm sm:text-base">Go to Homepage</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorProfileForm;