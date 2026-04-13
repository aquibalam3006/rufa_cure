import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function PatientProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [toastMessage, setToastMessage] = useState('');
  const profilePicInputRef = useRef(null);
  const recordFileInputRef = useRef(null);

  const [patientData, setPatientData] = useState({
    name: '', uhid: '', age: 0, gender: '', bloodGroup: '', height: '', weight: '', bp: '', heartRate: '',
    email: '', phone: '', dob: '', emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    address: '', city: '', state: '', pincode: '',
    profilePic: 'https://ui-avatars.com/api/?name=User&background=008985&color=fff&size=150'
  });

  const [medicalRecords, setMedicalRecords] = useState([]);
  
  // Static data for UI consistency (Inhe aap baad mein backend array se replace kar sakte hain)
  const appointments = [
    { id: 'APT101', doctor: 'Dr. Sarah Jenkins', speciality: 'Cardiology', date: '10 April 2026', time: '10:30 AM', status: 'Upcoming' },
    { id: 'APT089', doctor: 'Dr. Neha Sharma', speciality: 'General Physician', date: '28 March 2026', time: '06:00 PM', status: 'Completed' },
  ];

  const payments = [
    { id: 'TXN4451', for: 'Consultation - Cardiology', amount: '₹800', date: '05 April 2026', status: 'Paid', method: 'UPI' },
    { id: 'TXN4120', for: 'Consultation - Gen. Physician', amount: '₹400', date: '28 March 2026', status: 'Paid', method: 'Credit Card' },
  ];

  const calculateAge = (dobString) => {
    if (!dobString) return 0;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPatientProfile = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) return navigate('/login');
      try {
        const response = await fetch(`http://localhost:5000/api/patients/profile/${user.id || user._id}`);
        const data = await response.json();
        if (data.ok && data.patient) {
          const p = data.patient;
          setPatientData({
            name: p.userId?.name || '', email: p.userId?.email || '', phone: p.userId?.phone || '',
            uhid: p.uhid || 'RUFA-NEW', gender: p.gender || 'Male', bloodGroup: p.bloodGroup || 'O+',
            height: p.height || '', weight: p.weight || '', bp: p.bp || '', heartRate: p.heartRate || '',
            dob: p.dob || '', age: calculateAge(p.dob),
            emergencyName: p.emergencyContact?.name || '', emergencyRelation: p.emergencyContact?.relation || '', emergencyPhone: p.emergencyContact?.phone || '',
            address: p.address?.street || '', city: p.address?.city || '', state: p.address?.state || '', pincode: p.address?.pincode || '',
            profilePic: p.profilePic || `https://ui-avatars.com/api/?name=${p.userId?.name}&background=008985&color=fff`
          });
          if(p.medicalRecords) setMedicalRecords(p.medicalRecords);
        }
      } catch (error) { console.error(error); }
    };
    fetchPatientProfile();
  }, [navigate]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000); 
  };

  const handleVitalsUpdate = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const body = { userId: user.id || user._id, bp: e.target.bp.value, weight: e.target.weight.value + ' kg' };
    const res = await fetch('http://localhost:5000/api/patients/update', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (res.ok) { setPatientData(prev => ({ ...prev, bp: body.bp, weight: body.weight })); showNotification("Vitals Updated!"); }
  };

  const handleRecordChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const user = JSON.parse(localStorage.getItem('user'));
      const formData = new FormData();
      formData.append('recordFile', file);
      formData.append('title', file.name);
      const res = await fetch(`http://localhost:5000/api/patients/upload-record/${user.id || user._id}`, { method: 'POST', body: formData });
      const data = await res.json();
      if (data.ok) { setMedicalRecords([data.record, ...medicalRecords]); showNotification("File Uploaded!"); }
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const updatedDob = e.target.dob.value;
    const newAge = calculateAge(updatedDob);
    const updateBody = {
      userId: user.id || user._id, dob: updatedDob, age: newAge, gender: e.target.gender.value, bloodGroup: e.target.bloodGroup.value,
      emergencyContact: { name: e.target.emergencyName.value, relation: e.target.emergencyRelation.value, phone: e.target.emergencyPhone.value },
      address: { street: e.target.address.value, city: e.target.city.value, state: e.target.state.value, pincode: e.target.pincode.value }
    };
    const res = await fetch('http://localhost:5000/api/patients/update', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateBody)
    });
    if (res.ok) { setPatientData(prev => ({ ...prev, ...updateBody, address: updateBody.address.street, age: newAge, name: e.target.fullName.value })); showNotification("Settings Saved!"); }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] font-sans text-gray-800 flex flex-col relative">
      <Navbar />
      {toastMessage && (
        <div className="fixed top-24 right-8 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl z-50 border-l-4 border-[#008985]">
          <span className="font-bold text-sm">✅ {toastMessage}</span>
        </div>
      )}
      <input type="file" ref={profilePicInputRef} onChange={(e) => setPatientData(prev => ({ ...prev, profilePic: URL.createObjectURL(e.target.files[0]) }))} accept="image/*" className="hidden" />
      <input type="file" ref={recordFileInputRef} onChange={handleRecordChange} accept=".pdf,.png,.jpg,.jpeg" className="hidden" />

      <div className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <div className="lg:w-1/4 flex flex-col gap-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-[#008985] to-[#005a57]"></div>
            <div className="relative mt-8 mb-4">
              <img src={patientData.profilePic} alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-md mx-auto object-cover bg-white" />
              <button onClick={() => profilePicInputRef.current.click()} className="absolute bottom-0 right-1/4 bg-white p-2 rounded-full shadow-md border border-gray-200 text-sm cursor-pointer z-10">📷</button>
            </div>
            <h2 className="text-xl font-extrabold text-gray-900">{patientData.name || 'Loading...'}</h2>
            <p className="text-sm font-bold text-[#008985] mb-4">UHID: {patientData.uhid}</p>
            <div className="flex justify-center gap-4 text-sm font-medium text-gray-600 border-t border-gray-100 pt-4 mt-2">
              <div><span className="block font-bold text-gray-900">{patientData.age} Yrs</span>Age</div>
              <div className="w-px bg-gray-200"></div>
              <div><span className="block font-bold text-gray-900">{patientData.gender}</span>Sex</div>
              <div className="w-px bg-gray-200"></div>
              <div><span className="block font-bold text-red-500">{patientData.bloodGroup}</span>Blood</div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 sticky top-28">
            <ul className="space-y-2">
              {['dashboard', 'appointments', 'records', 'payments', 'settings'].map((tab) => (
                <li key={tab}>
                  <button onClick={() => setActiveTab(tab)} className={`w-full text-left px-5 py-3.5 rounded-xl font-bold transition flex items-center gap-3 capitalize ${activeTab === tab ? 'bg-[#008985] text-white shadow-md' : 'hover:bg-gray-50 text-gray-600'}`}>
                    {tab === 'dashboard' ? '📊 Health Dashboard' : tab === 'appointments' ? '📅 My Appointments' : tab === 'records' ? '📁 Medical Records' : tab === 'payments' ? '💳 Payment History' : '⚙️ Profile Settings'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* MAIN AREA */}
        <div className="lg:w-3/4 flex flex-col gap-6">
          {activeTab === 'dashboard' && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Current Vitals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-100"><p className="text-xs font-bold text-red-500 mb-1">BP</p><p className="text-2xl font-extrabold text-gray-900">{patientData.bp || '--'}</p></div>
                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100"><p className="text-xs font-bold text-rose-500 mb-1">HR</p><p className="text-2xl font-extrabold text-gray-900">{patientData.heartRate || '--'}</p></div>
                  <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100"><p className="text-xs font-bold text-blue-500 mb-1">Height</p><p className="text-2xl font-extrabold text-gray-900">{patientData.height || '--'}</p></div>
                  <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100"><p className="text-xs font-bold text-orange-500 mb-1">Weight</p><p className="text-2xl font-extrabold text-gray-900">{patientData.weight || '--'}</p></div>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-4">Update Vitals</h4>
                  <form onSubmit={handleVitalsUpdate} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div><label className="text-xs font-bold text-gray-500 mb-1">New BP</label><input type="text" name="bp" defaultValue={patientData.bp} className="w-full p-2.5 rounded-lg border border-gray-300 bg-white" /></div>
                    <div><label className="text-xs font-bold text-gray-500 mb-1">New Weight (kg)</label><input type="text" name="weight" defaultValue={patientData.weight.replace(' kg', '')} className="w-full p-2.5 rounded-lg border border-gray-300 bg-white" /></div>
                    <button type="submit" className="bg-gray-900 text-white font-bold py-2.5 rounded-lg">Log Vitals</button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="animate-fade-in bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">My Appointments</h3>
              <div className="space-y-4">
                {appointments.map((apt, index) => (
                  <div key={index} className="flex flex-col md:flex-row justify-between items-center p-5 rounded-2xl border border-gray-200 bg-gray-50 transition hover:border-[#008985]">
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-2xl">👨‍⚕️</div>
                      <div>
                        <h4 className="font-extrabold text-gray-900">{apt.doctor}</h4>
                        <p className="text-sm font-bold text-[#008985]">{apt.speciality}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-800">📅 {apt.date}</p>
                      <p className="text-sm font-bold text-gray-800">⏰ {apt.time}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${apt.status === 'Upcoming' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>{apt.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="animate-fade-in bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-extrabold text-gray-900">Medical Records</h3>
                <button onClick={() => recordFileInputRef.current.click()} className="bg-[#008985] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow">⬆️ Upload Record</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalRecords.map((record, index) => (
                  <div key={index} className="p-5 rounded-2xl border border-gray-200 hover:shadow-lg transition">
                    <div className="flex justify-between items-start mb-4"><div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-blue-50 text-blue-500">📝</div><span className="text-[10px] font-extrabold bg-gray-100 px-2 py-1 rounded">{record.type}</span></div>
                    <h4 className="font-extrabold text-gray-900 truncate">{record.title}</h4>
                    <p className="text-xs font-bold text-gray-400 mb-6">{record.date}</p>
                    <button onClick={() => window.open(record.fileUrl, '_blank')} className="w-full bg-gray-50 border border-gray-200 text-gray-700 font-bold py-2 rounded-lg text-sm hover:bg-[#e6f4f4]">👁️ View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="animate-fade-in bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Payment History</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="p-4 font-bold rounded-tl-xl">Transaction ID</th>
                      <th className="p-4 font-bold">Details</th>
                      <th className="p-4 font-bold">Amount</th>
                      <th className="p-4 font-bold">Date</th>
                      <th className="p-4 font-bold text-center rounded-tr-xl">Invoice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((pay, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition text-sm">
                        <td className="p-4 font-bold text-gray-900">{pay.id}</td>
                        <td className="p-4 font-medium text-gray-600">{pay.for}</td>
                        <td className="p-4 font-extrabold text-[#008985]">{pay.amount}</td>
                        <td className="p-4 font-medium text-gray-600">{pay.date}</td>
                        <td className="p-4 text-center"><button className="text-blue-500 font-bold underline">Download</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="animate-fade-in bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-gray-100 pb-4">Profile Settings</h3>
              <form className="space-y-8" onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="text-sm font-bold text-gray-700 mb-2 block">Full Name</label><input type="text" name="fullName" defaultValue={patientData.name} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" required /></div>
                  <div><label className="text-sm font-bold text-gray-700 mb-2 block">Email Address</label><input type="email" name="email" defaultValue={patientData.email} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" required /></div>
                  <div><label className="text-sm font-bold text-gray-700 mb-2 block">Phone Number</label><input type="text" name="phone" defaultValue={patientData.phone} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" required /></div>
                  <div><label className="text-sm font-bold text-gray-700 mb-2 block">Date of Birth</label><input type="date" name="dob" defaultValue={patientData.dob} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" required /></div>
                  <div><label className="text-sm font-bold text-gray-700 mb-2 block">Gender</label><select name="gender" defaultValue={patientData.gender} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50"><option value="Male">Male</option><option value="Female">Female</option></select></div>
                  <div><label className="text-sm font-bold text-gray-700 mb-2 block">Blood Group</label><select name="bloodGroup" defaultValue={patientData.bloodGroup} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50"><option value="A+">A+</option><option value="B+">B+</option><option value="O+">O+</option><option value="AB+">AB+</option></select></div>
                </div>
                
                <h4 className="text-lg font-bold text-gray-800 mt-6 border-b border-gray-50 pb-2">Emergency Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div><label className="text-sm font-bold text-gray-500 mb-1 block">Contact Name</label><input type="text" name="emergencyName" defaultValue={patientData.emergencyName} placeholder="e.g., Ramesh Sharma" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                    <div><label className="text-sm font-bold text-gray-500 mb-1 block">Relationship</label><input type="text" name="emergencyRelation" defaultValue={patientData.emergencyRelation} placeholder="e.g., Father" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                    <div><label className="text-sm font-bold text-gray-500 mb-1 block">Phone Number</label><input type="text" name="emergencyPhone" defaultValue={patientData.emergencyPhone} placeholder="+91 XXXXX XXXXX" className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                </div>

                <h4 className="text-lg font-bold text-gray-800 mt-6 border-b border-gray-50 pb-2">Address Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="md:col-span-2"><label className="text-sm font-bold text-gray-700 mb-1 block">Street Address</label><input type="text" name="address" defaultValue={patientData.address} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                    <div><label className="text-sm font-bold text-gray-700 mb-1 block">City</label><input type="text" name="city" defaultValue={patientData.city} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><label className="text-sm font-bold text-gray-700 mb-1 block">State</label><input type="text" name="state" defaultValue={patientData.state} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                        <div><label className="text-sm font-bold text-gray-700 mb-1 block">Pincode</label><input type="text" name="pincode" defaultValue={patientData.pincode} className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50" /></div>
                    </div>
                </div>
                <div className="border-t border-gray-100 pt-6 flex justify-end"><button type="submit" className="bg-[#008985] text-white font-bold py-3 px-10 rounded-xl hover:bg-[#005a57] transition shadow-md">Save Changes</button></div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PatientProfile;