import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png'; 

function DoctorDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('Loading...');
  
  // TABS STATE
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [appointmentFilter, setAppointmentFilter] = useState('All');
  const [settingsTab, setSettingsTab] = useState('Profile');

  // PATIENT DETAIL STATE
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patientDetailTab, setPatientDetailTab] = useState('Overview'); 
  
  // FILE REFS
  const patientFileRef = useRef(null);
  const profilePicRef = useRef(null);
  const generalDocRef = useRef(null);

  // PRESCRIPTION STATES
  const [prescriptionItem, setPrescriptionItem] = useState({ medicine: '', dosage: '', duration: '', instruction: '' });
  const [currentPrescription, setCurrentPrescription] = useState([]);
  
  // MODAL STATES & INTERACTIVE STATES
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [doctorPic, setDoctorPic] = useState(null); 
  const [isAddMedModalOpen, setIsAddMedModalOpen] = useState(false); 
  const [newMedicine, setNewMedicine] = useState({ name: '', category: '', stock: '', price: '', status: 'In Stock' });

  // CLINIC STATE (AB YE BACKEND SE AAYEGA)
  const [clinicData, setClinicData] = useState({
    name: 'Loading Clinic...',
    address: 'Loading Address...',
    phone: '',
    regNo: ''
  });

  // =========================================================
  // 🚀 BACKEND SE DATA KHALI KAR DIYA HAI (EMPTY ARRAYS)
  // =========================================================
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [medications, setMedications] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [fullAppointmentList, setFullAppointmentList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [chatHistory, setChatHistory] = useState({});
  const [transactionsList, setTransactionsList] = useState([]);
  const [patientReports, setPatientReports] = useState([]);


  // =========================================================
  // 🔌 FETCH DOCTOR PROFILE FROM BACKEND
  // =========================================================
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        const userId = userObj.id; // User ID from local storage

        // Initial naam set karna
        setDoctorName(userObj.name || 'Doctor');

        // Backend API ko call karna doctor ki details ke liye
        fetch(`http://localhost:5000/api/doctors/detail/${userId}`)
          .then(res => res.json())
          .then(data => {
            if (data.ok && data.profile) {
              const prof = data.profile;
              // Update Name
              setDoctorName(prof.name);
              // Update Clinic Data automatically from backend
              setClinicData({
                name: prof.clinicName || 'Clinic Name Not Set',
                address: prof.clinicAddress || 'Address Not Set',
                phone: prof.phone || '',
                regNo: prof.medicalRegNumber || ''
              });
            }
          })
          .catch(err => console.error("Error fetching doctor profile:", err));

        // Future APIs calling structure (Aage chal kar inko zinda karenge)
        // fetchAppointments(userId);
        // fetchMedications(userId);
        // fetchPatients(userId);

      } catch (e) {
        console.error('Failed to parse user', e);
      }
    } else {
      // Agar user login nahi hai toh login pe bhejo
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const formatDoctorName = (name) => {
    if (!name) return 'Dr. Doctor';
    const cleanName = name.replace(/^dr\.?\s*/i, '');
    return 'Dr. ' + cleanName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  };

  const cleanDocName = formatDoctorName(doctorName);
  const docInitial = doctorName && doctorName.length > 0 ? doctorName.replace(/^dr\.?\s*/i, '').charAt(0).toUpperCase() : 'D';

  // --- DASHBOARD FUNCTIONS ---
  const handleApprove = (id) => setAppointmentRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Accepted' } : req));
  const initiateReject = (req) => { setSelectedRequest(req); setIsRejectModalOpen(true); };
  const confirmReject = () => {
    if (selectedRequest) setAppointmentRequests(prev => prev.map(req => req.id === selectedRequest.id ? { ...req, status: 'Rejected' } : req));
    setIsRejectModalOpen(false); setSelectedRequest(null);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeChatId) return;
    const newMessage = { id: Date.now(), sender: 'doctor', text: messageInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory(prev => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), newMessage] }));
    setMessageInput('');
  };

  const filteredAppointments = fullAppointmentList.filter(apt => {
    if (appointmentFilter === 'All') return true;
    if (appointmentFilter === 'Today') return apt.status === 'Today';
    if (appointmentFilter === 'Upcoming') return apt.status === 'Upcoming';
    return true;
  });

  const activeChatDetails = chatList.find(chat => chat.id === activeChatId);
  const currentMessages = activeChatId ? (chatHistory[activeChatId] || []) : [];

  // --- RX & PATIENT REPORTS FUNCTIONS ---
  
  const handleAddMedicine = () => {
    if (prescriptionItem.medicine) {
      setCurrentPrescription([...currentPrescription, prescriptionItem]);
      setPrescriptionItem({ medicine: '', dosage: '', duration: '', instruction: '' });
    }
  };

  const handleSavePrescription = () => {
    if (currentPrescription.length === 0) return alert("Please add at least one medicine.");
    // FUTURE: Yahan /api/prescriptions par POST request jayegi
    alert(`Prescription Saved & Sent to ${selectedPatient.name} successfully!`);
    setCurrentPrescription([]); 
  };

  const handleFileUploadClick = () => {
    if(patientFileRef.current) {
        patientFileRef.current.click();
    }
  };

  const handleViewFile = (url) => {
    window.open(url, '_blank');
  };

  const handlePatientFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // FUTURE: Yahan AWS S3 ya backend uploads folder me file bhejne ki API banegi
      setPatientReports([{ id: Date.now(), title: file.name, date: new Date().toLocaleDateString(), url: URL.createObjectURL(file) }, ...patientReports]);
      alert(`${file.name} uploaded to patient's record!`);
    }
  };

  // --- INVENTORY, DOCUMENTS, PROFILE, SETTINGS FUNCTIONS ---
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) setDoctorPic(URL.createObjectURL(file)); // FUTURE: Upload to DB
  };

  const handleGeneralDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isPdf = file.type.includes('pdf');
      const newDoc = {
        id: `DOC-${Date.now().toString().slice(-4)}`, title: file.name, type: isPdf ? 'PDF' : 'Image',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB', status: 'Uploaded'
      };
      setDocuments([newDoc, ...documents]); // FUTURE: Save to DB Document Model
      alert('Document uploaded successfully!');
    }
  };

  const handleAddNewMedicine = (e) => {
    e.preventDefault();
    if (newMedicine.name && newMedicine.price) {
      const med = { ...newMedicine, id: `MED-${Date.now().toString().slice(-4)}`, stock: `${newMedicine.stock} units` };
      setMedications([med, ...medications]); // FUTURE: POST API to Medications Model
      setIsAddMedModalOpen(false);
      setNewMedicine({ name: '', category: '', stock: '', price: '', status: 'In Stock' });
      alert('Medicine added to inventory!');
    }
  };

  const handleClinicUpdate = (e) => {
    e.preventDefault();
    // FUTURE: PUT request to DoctorProfile model
    alert('Clinic Details Updated Successfully!');
  };


  return (
    <div className="flex h-screen bg-[#f4f7f9] font-sans overflow-hidden text-gray-800 relative">
      
      {/* Hidden File Inputs */}
      <input type="file" ref={patientFileRef} onChange={handlePatientFileUpload} accept=".pdf,.png,.jpg" className="hidden" />
      <input type="file" ref={profilePicRef} onChange={handleProfilePicChange} accept="image/*" className="hidden" />
      <input type="file" ref={generalDocRef} onChange={handleGeneralDocUpload} accept=".pdf,.png,.jpg" className="hidden" />

      {/* ================= MODALS ================= */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-2xl">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800">Reject Appointment?</h3>
            </div>
            <p className="text-gray-600 mb-6">Are you sure you want to reject the appointment request from <span className="font-bold text-gray-800">{selectedRequest?.name}</span>?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsRejectModalOpen(false)} className="px-5 py-2.5 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition">No, Cancel</button>
              <button onClick={confirmReject} className="px-5 py-2.5 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-md transition">Yes, Reject</button>
            </div>
          </div>
        </div>
      )}

      {isAddMedModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl animate-fade-in">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-100 pb-3">Add New Medicine</h3>
            <form onSubmit={handleAddNewMedicine} className="space-y-4">
              <div><label className="text-xs font-bold text-gray-500">Medicine Name</label><input type="text" required value={newMedicine.name} onChange={e=>setNewMedicine({...newMedicine, name: e.target.value})} className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#008985]" placeholder="e.g. Paracetamol 500mg"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500">Category</label><input type="text" required value={newMedicine.category} onChange={e=>setNewMedicine({...newMedicine, category: e.target.value})} className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#008985]" placeholder="e.g. Painkiller"/></div>
                <div><label className="text-xs font-bold text-gray-500">Stock Qty</label><input type="number" required value={newMedicine.stock} onChange={e=>setNewMedicine({...newMedicine, stock: e.target.value})} className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#008985]" placeholder="e.g. 100"/></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500">Price / Unit</label><input type="text" required value={newMedicine.price} onChange={e=>setNewMedicine({...newMedicine, price: e.target.value})} className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#008985]" placeholder="e.g. $10.00"/></div>
                <div><label className="text-xs font-bold text-gray-500">Status</label>
                  <select value={newMedicine.status} onChange={e=>setNewMedicine({...newMedicine, status: e.target.value})} className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg outline-none focus:border-[#008985]">
                    <option>In Stock</option><option>Low Stock</option><option>Out of Stock</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setIsAddMedModalOpen(false)} className="px-5 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-[#008985] text-white font-bold rounded-xl hover:bg-[#005a57] shadow-md transition">Save Medicine</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SLIDING SIDEBAR & OVERLAY ================= */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#008985] text-white flex flex-col transition-transform duration-300 ease-in-out shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-teal-700/50 flex items-center justify-between">
          <div className="bg-white p-2 rounded-lg cursor-pointer" onClick={() => navigate('/')}>
             <img src={myLogo} alt="RuFa Cure" className="h-8 w-auto object-contain" />
          </div>
          <button className="text-3xl leading-none hover:text-gray-200" onClick={() => setIsSidebarOpen(false)}>×</button>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {['Dashboard', 'Appointment', 'Patients', 'Messages', 'Medications', 'Documents', 'Finances', 'Settings'].map((item, idx) => (
            <button key={idx} onClick={() => { setActiveTab(item); setSelectedPatient(null); setIsSidebarOpen(false); }} className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-xl transition ${activeTab === item && !selectedPatient ? 'bg-white/20 font-bold text-white' : 'hover:bg-white/10 text-teal-50 font-medium'}`}>
              <span className="text-xl">{['🎛️', '📅', '👥', '✉️', '💊', '📄', '💰', '⚙️'][idx]}</span> {item}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-teal-700/50">
          <button onClick={handleLogout} className="flex items-center justify-center gap-3 px-4 py-3 w-full rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-100 font-bold transition">
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* TOP NAVBAR */}
        <div className="bg-white px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button className="text-3xl text-gray-700 hover:text-[#008985] focus:outline-none" onClick={() => setIsSidebarOpen(true)}>☰</button>
            <div className="relative hidden sm:block ml-4">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input type="text" placeholder="Search Anything..." className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-[#008985] outline-none text-sm w-64 md:w-80 transition" />
            </div>
          </div>
          
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-xl text-gray-400 hover:text-[#008985] relative">
                🔔<span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="hidden sm:flex items-center justify-center h-8 w-auto cursor-pointer border-l border-gray-200 pl-4 md:pl-6" onClick={() => navigate('/')}>
                <img src={myLogo} alt="RuFa Cure Logo" className="h-full w-auto object-contain" />
            </div>

            {/* DOCTOR PROFILE SECTION - Clickable to open Settings */}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 md:pl-6 cursor-pointer group" onClick={() => {setActiveTab('Settings'); setSettingsTab('Profile');}}>
               <div className="text-right hidden sm:block group-hover:text-[#008985] transition">
                  <p className="text-sm font-bold">{cleanDocName}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Dermatologist</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-[#008985] text-white flex items-center justify-center font-bold border-2 border-white shadow-sm uppercase overflow-hidden">
                 {doctorPic ? <img src={doctorPic} alt="Doctor" className="w-full h-full object-cover"/> : docInitial}
               </div>
            </div>
          </div>
        </div>

        {/* MAIN TAB CONTENTS (SCROLLABLE AREA) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col lg:flex-row gap-8">
          
          {/* CENTER WIDE COLUMN */}
          <div className="flex-1 flex flex-col gap-8 min-w-0">
            
            {/* =============== 1. DASHBOARD TAB =============== */}
            {activeTab === 'Dashboard' && (
              <>
                <div className="bg-[#008985] rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Hello, {cleanDocName}</h2>
                    <p className="text-teal-100 text-sm md:text-base font-medium max-w-md">Here are your important tasks and reports.<br/>Please check your next appointment schedule.</p>
                  </div>
                  <span className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 text-[120px] opacity-10 drop-shadow-2xl">🩺</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Activity</h3>
                    <select className="bg-gray-50 border border-gray-200 text-sm font-medium rounded-lg px-4 py-2 outline-none cursor-pointer hover:border-[#008985] transition">
                      <option>This Year</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  <div className="h-56 w-full border-b border-gray-100 relative flex items-end justify-between px-4 pb-2 text-xs font-bold text-gray-400">
                    <div className="absolute inset-0 flex items-center justify-center pt-4">
                        <svg className="w-full h-full text-[#b3e5e1]" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path d="M0,80 Q25,20 50,50 T100,30" fill="none" stroke="currentColor" strokeWidth="2.5" />
                            <path d="M0,90 Q30,70 60,80 T100,50" fill="none" stroke="#008985" strokeWidth="3" />
                            <circle cx="60" cy="80" r="2" fill="#008985" />
                        </svg>
                    </div>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => <span key={m} className="z-10">{m}</span>)}
                  </div>
                  <div className="flex justify-center gap-8 mt-6 text-sm font-bold text-gray-600">
                     <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#008985] shadow-sm"></span> Consultations</span>
                     <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#b3e5e1] shadow-sm"></span> Patients</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800">Appointment Request</h3>
                      <button onClick={() => setActiveTab('Appointment')} className="text-sm text-[#008985] font-bold hover:underline">See All</button>
                    </div>
                    <div className="space-y-3">
                      {appointmentRequests.length === 0 ? <p className="text-gray-400 text-sm">No new requests.</p> : appointmentRequests.map((req, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-700 font-bold text-lg border border-teal-100">{req.name.charAt(0)}</div>
                            <div>
                              <p className="font-bold text-gray-800">{req.name}</p>
                              <p className="text-xs text-gray-500 font-medium mt-0.5">{req.disease}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500 font-bold mb-1.5">{req.date}</p>
                            {req.status === 'Accepted' ? (
                               <span className="text-xs font-bold text-[#008985] bg-[#e6f4f4] px-3 py-1 rounded-full">Accepted</span>
                            ) : req.status === 'Rejected' ? (
                               <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">Rejected</span>
                            ) : (
                               <div className="flex gap-2 justify-end">
                                 <button onClick={() => handleApprove(req.id)} className="w-8 h-8 rounded-full bg-[#e6f4f4] text-[#008985] flex items-center justify-center hover:bg-[#008985] hover:text-white transition text-lg shadow-sm">✓</button>
                                 <button onClick={() => initiateReject(req)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition text-lg shadow-sm">×</button>
                               </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-gray-800">Appointment</h3>
                      <select className="bg-gray-50 border border-gray-200 text-sm font-medium rounded-lg px-3 py-1.5 outline-none hover:border-[#008985] transition cursor-pointer">
                        <option>Today</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      {todayAppointments.length === 0 ? <p className="text-gray-400 text-sm">No appointments today.</p> : todayAppointments.map((apt, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border border-gray-200 shadow-sm">
                               <img src={`https://ui-avatars.com/api/?name=${apt.name}&background=random`} alt={apt.name} />
                            </div>
                            <div>
                              <p className="font-bold text-gray-800">{apt.name}</p>
                              <p className="text-xs text-gray-500 font-medium mt-0.5">{apt.disease}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-bold px-3 py-1 rounded-full ${apt.time === 'Finished' ? 'bg-[#e6f4f4] text-[#008985]' : 'bg-gray-100 text-gray-700'}`}>{apt.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Patients</h3>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                      <thead className="text-gray-400 font-bold border-b border-gray-100">
                        <tr>
                          <th className="pb-4">Name</th>
                          <th className="pb-4">Gender</th>
                          <th className="pb-4">Weight</th>
                          <th className="pb-4">Disease</th>
                          <th className="pb-4">Date</th>
                          <th className="pb-4">Heart Rate</th>
                          <th className="pb-4">Blood Type</th>
                          <th className="pb-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {recentPatients.length === 0 ? (
                           <tr><td colSpan="8" className="py-8 text-center text-gray-400">No recent patients found.</td></tr>
                        ) : recentPatients.map((patient, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition">
                            <td className="py-4 flex items-center gap-3 pr-6">
                              <img src={`https://ui-avatars.com/api/?name=${patient.name}&background=random`} className="w-9 h-9 rounded-full shadow-sm" alt="avatar" />
                              <span className="font-bold text-gray-800">{patient.name}</span>
                            </td>
                            <td className="py-4 text-gray-600 font-medium pr-6">{patient.gender}</td>
                            <td className="py-4 text-gray-600 font-medium pr-6">{patient.weight}</td>
                            <td className="py-4 text-gray-600 font-medium pr-6">{patient.disease}</td>
                            <td className="py-4 text-gray-600 font-medium pr-6">{patient.date}</td>
                            <td className="py-4 text-gray-600 font-medium pr-6">{patient.hr}</td>
                            <td className="py-4 font-bold text-gray-700 pr-6">{patient.blood}</td>
                            <td className="py-4">
                               <span className={`px-4 py-1.5 text-xs font-bold rounded-full ${patient.status === 'Recover' ? 'bg-[#e6f4f4] text-[#008985]' : 'bg-gray-100 text-gray-600'}`}>{patient.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* =============== 2. APPOINTMENT LIST TAB =============== */}
            {activeTab === 'Appointment' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-gray-100 pb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Appointment List</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage and view your scheduled patients.</p>
                  </div>
                  <div className="flex bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                    {['All', 'Today', 'Upcoming'].map(filter => (
                      <button key={filter} onClick={() => setAppointmentFilter(filter)} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${appointmentFilter === filter ? 'bg-white text-[#008985] shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-800'}`}>
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="text-gray-400 text-sm font-bold border-b border-gray-100">
                      <tr>
                        <th className="pb-4 px-4">Patient Info</th>
                        <th className="pb-4 px-4">Scheduled Date & Time</th>
                        <th className="pb-4 px-4">Condition</th>
                        <th className="pb-4 px-4">Visit Type</th>
                        <th className="pb-4 px-4">Status</th>
                        <th className="pb-4 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredAppointments.length === 0 ? (
                         <tr><td colSpan="6" className="py-8 text-center text-gray-400">No appointments scheduled.</td></tr>
                      ) : filteredAppointments.map((apt) => (
                        <tr key={apt.id} className="hover:bg-gray-50 transition">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-[#e6f4f4] rounded-full flex items-center justify-center text-[#008985] font-bold text-lg border border-[#b3e5e1]">{apt.name.charAt(0)}</div>
                              <div>
                                <p className="font-bold text-gray-800">{apt.name}</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">ID: #{apt.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-bold text-gray-700">{apt.date}</p>
                            <p className="text-xs text-[#008985] font-bold mt-0.5">{apt.time}</p>
                          </td>
                          <td className="py-4 px-4 text-gray-600 font-medium">{apt.disease}</td>
                          <td className="py-4 px-4 text-gray-600 font-medium">{apt.type}</td>
                          <td className="py-4 px-4">
                            <span className={`px-4 py-1.5 text-xs font-bold rounded-full 
                              ${apt.status === 'Completed' ? 'bg-green-50 text-green-600 border border-green-100' : ''}
                              ${apt.status === 'Today' ? 'bg-blue-50 text-blue-600 border border-blue-100' : ''}
                              ${apt.status === 'Upcoming' ? 'bg-[#e6f4f4] text-[#008985] border border-[#b3e5e1]' : ''}
                            `}>{apt.status}</span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button className="text-gray-400 hover:text-[#008985] font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =============== 3. PATIENTS DIRECTORY TAB =============== */}
            {activeTab === 'Patients' && !selectedPatient && (
              <div className="animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Patient Directory</h2>
                    <p className="text-gray-500 font-medium mt-1">View and manage all your registered patients.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                      <input type="text" placeholder="Search patients..." className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:border-blue-500 outline-none text-sm font-medium w-64 shadow-sm transition" />
                    </div>
                    <button className="bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition shadow-md flex items-center gap-2">
                      <span>+</span> Add New
                    </button>
                  </div>
                </div>
                
                {patientsList.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-3xl border border-gray-100">
                        <p className="text-gray-400 text-lg font-bold">No patients in the directory.</p>
                    </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12 pb-8">
                  {patientsList.map((patient, index) => (
                    <div key={index} className="relative bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => { setSelectedPatient(patient); setPatientDetailTab('Overview'); }}>
                      
                      <div className="flex items-center gap-4 mb-5">
                        <img src={`https://ui-avatars.com/api/?name=${patient.name}&background=random`} className="w-14 h-14 rounded-full shadow-sm" alt="avatar" />
                        <div>
                          <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{patient.name}</h3>
                          <p className="text-xs text-gray-500 font-bold mt-0.5">{patient.email}</p>
                        </div>
                      </div>

                      <div className="flex gap-3 mb-6">
                        <button className="flex-1 flex items-center justify-center gap-2 text-blue-500 text-xs font-extrabold py-2.5 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
                           <span className="text-sm">📞</span> Phone
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 text-gray-500 text-xs font-extrabold py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                           <span className="text-blue-400">((•))</span> Live Vital
                        </button>
                      </div>

                      <div className="space-y-4 text-sm mb-4">
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-500 font-extrabold text-xs">Gender, Age</span>
                          <span className="font-extrabold text-gray-800">{patient.gender}, {patient.age}y</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-500 font-extrabold text-xs">Physician</span>
                          <span className="font-extrabold text-gray-800">{patient.physician}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-500 font-extrabold text-xs">Last Consultation</span>
                          <span className="font-extrabold text-gray-800">{patient.lastVisit}</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                          <span className="text-gray-500 font-extrabold text-xs">Appointments</span>
                          <span className="font-extrabold text-gray-800">{patient.nextAppt}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-gray-500 font-extrabold text-xs">Status</span>
                          <span className={`px-4 py-1.5 text-[10px] font-black rounded-full tracking-wider uppercase
                              ${patient.status === 'Under Observation' ? 'bg-purple-50 text-purple-600 border border-purple-100' : ''}
                              ${patient.status === 'Recovered' ? 'bg-green-50 text-green-600 border border-green-100' : ''}
                              ${patient.status === 'Under Treatment' ? 'bg-blue-50 text-blue-600 border border-blue-100' : ''}
                          `}>{patient.status}</span>
                        </div>
                      </div>

                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                         <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#f4f7f9] hover:bg-blue-600 hover:-translate-y-1 transition-all">
                            ↓
                         </div>
                      </div>
                    </div>
                  ))}
                </div>
                )}
              </div>
            )}

            {/* =============== DETAILED PATIENT VIEW =============== */}
            {activeTab === 'Patients' && selectedPatient && (
              <div className="animate-fade-in flex flex-col xl:flex-row gap-6 h-full">
                
                {/* LEFT: MAIN CONTENT AREA (Vitals & Rx) */}
                <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[700px]">
                  
                  {/* Header & Tabs */}
                  <div className="p-6 border-b border-gray-100 bg-white z-10 shrink-0">
                    <div className="flex items-center gap-2 text-sm font-bold text-gray-500 mb-6">
                      <span className="cursor-pointer hover:text-blue-600 transition" onClick={() => setSelectedPatient(null)}>Patients</span>
                      <span>›</span>
                      <span className="text-gray-900">Patients Information</span>
                    </div>
                    
                    <div className="flex gap-8 border-b border-gray-100">
                      {['Overview', 'Booking History', 'Rx & Reports'].map(tab => (
                        <button key={tab} onClick={() => setPatientDetailTab(tab)} className={`pb-3 font-bold text-sm transition relative ${patientDetailTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'}`}>
                          <span className="mr-1">{tab === 'Overview' ? 'ⓘ' : tab === 'Booking History' ? '🕒' : '📝'}</span> {tab}
                          {patientDetailTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-lg shadow-[0_-2px_10px_rgba(37,99,235,0.5)]"></div>}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SCROLLABLE CONTENT BODY */}
                  <div className="p-6 overflow-y-auto bg-gray-50/30 flex-1">
                    
                    {/* --- TAB 1: OVERVIEW (VITALS & FUNCTIONAL) --- */}
                    {patientDetailTab === 'Overview' && (
                      <div className="space-y-6 animate-fade-in">
                        {/* Vitals Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex gap-3 mb-2"><span className="text-2xl">🌡️</span> <span className="text-gray-500 text-sm font-bold">Body Temp</span></div>
                              <p className="text-3xl font-black text-gray-800">{selectedPatient.vitals.temp}</p>
                           </div>
                           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex gap-3 mb-2"><span className="text-2xl">🩸</span> <span className="text-gray-500 text-sm font-bold">Blood Pressure</span></div>
                              <p className="text-3xl font-black text-gray-800">{selectedPatient.vitals.bp} <span className="text-sm font-medium text-gray-400">mmHg</span></p>
                           </div>
                           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex gap-3 mb-2"><span className="text-2xl">💉</span> <span className="text-gray-500 text-sm font-bold">Blood Sugar</span></div>
                              <p className="text-3xl font-black text-gray-800">{selectedPatient.vitals.sugar}</p>
                           </div>
                           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex gap-3 mb-2"><span className="text-2xl">⚖️</span> <span className="text-gray-500 text-sm font-bold">Body Weight</span></div>
                              <p className="text-3xl font-black text-gray-800">{selectedPatient.vitals.weight}</p>
                           </div>
                           <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                              <div className="flex gap-3 mb-2"><span className="text-2xl">💤</span> <span className="text-gray-500 text-sm font-bold">Avg. Sleep</span></div>
                              <p className="text-3xl font-black text-gray-800">{selectedPatient.vitals.sleep}</p>
                           </div>
                           <div className="p-5 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition">
                              <p className="text-blue-500 font-bold">+ Add More</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Functional Status */}
                          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between mb-6">
                              <h3 className="font-bold text-lg text-gray-800">Functional Status</h3>
                              <span className="text-xs font-bold text-gray-500 border rounded-full px-3 py-1">85/100</span>
                            </div>
                            <div className="space-y-5">
                              <div>
                                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2"><span>Basic ADL</span><span>8/12</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{width: `${selectedPatient.functional.basic}%`}}></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2"><span>Intermediate ADL</span><span>6/12</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{width: `${selectedPatient.functional.intermediate}%`}}></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2"><span>Mental Health</span><span>8/25</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{width: `${selectedPatient.functional.mental}%`}}></div></div>
                              </div>
                              <div>
                                <div className="flex justify-between text-sm font-bold text-gray-600 mb-2"><span>Social Interaction</span><span>20/30</span></div>
                                <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-teal-500 h-2 rounded-full" style={{width: `${selectedPatient.functional.social}%`}}></div></div>
                              </div>
                            </div>
                          </div>

                          {/* Todo List */}
                          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between mb-6">
                              <h3 className="font-bold text-lg text-gray-800">Todo List</h3>
                              <span className="text-sm font-bold text-blue-500 cursor-pointer hover:underline">See All</span>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center p-3 border border-gray-100 rounded-xl bg-white shadow-sm">
                                <span className="text-sm font-bold text-gray-700">Regular Morning Walk</span>
                                <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                              </div>
                              <div className="flex justify-between items-center p-3 border border-gray-100 rounded-xl bg-gray-50 opacity-60">
                                <span className="text-sm font-bold text-gray-500 line-through">Dry Bread Breakfast Only</span>
                                <span className="w-5 h-5 bg-gray-300 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                              </div>
                              <div className="flex justify-between items-center p-3 border border-gray-100 rounded-xl bg-white shadow-sm">
                                <span className="text-sm font-bold text-gray-700">2L Water</span>
                                <span className="w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs">✓</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* --- TAB 3: RX & LAB REPORTS --- */}
                    {patientDetailTab === 'Rx & Reports' && (
                      <div className="space-y-8 animate-fade-in pb-10">
                        
                        {/* DIGITAL PRESCRIPTION PAD */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 relative">
                          {/* Header of Prescription */}
                          <div className="flex justify-between items-start border-b-2 border-gray-100 pb-6 mb-6">
                            <div>
                              <h2 className="text-2xl font-black text-gray-900">{cleanDocName}</h2>
                              <p className="text-sm font-bold text-[#008985]">Dermatologist | MBBS, MD</p>
                              <p className="text-xs text-gray-500 mt-1">{clinicData.name}</p>
                              <p className="text-xs text-gray-500">{clinicData.address}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <img src={myLogo} alt="RuFa Cure" className="h-10 object-contain mb-2" />
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digital Prescription</p>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mb-6 text-sm font-bold text-gray-600 bg-gray-50 p-4 rounded-xl">
                             <p>Patient: <span className="text-gray-900">{selectedPatient.name}</span></p>
                             <p>Date: <span className="text-gray-900">{new Date().toLocaleDateString()}</span></p>
                          </div>
                          
                          <div className="text-4xl font-serif text-blue-100 font-bold italic mb-4">Rx</div>

                          {/* Medicine List */}
                          {currentPrescription.length > 0 && (
                            <div className="mb-6 border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                              <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
                                  <tr>
                                    <th className="p-3 font-bold">Medicine</th>
                                    <th className="p-3 font-bold">Dosage</th>
                                    <th className="p-3 font-bold">Duration</th>
                                    <th className="p-3 font-bold">Notes</th>
                                  </tr>
                                </thead>
                                <tbody className="text-sm font-bold text-gray-800 divide-y divide-gray-50">
                                  {currentPrescription.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                      <td className="p-3 text-blue-600">💊 {item.medicine}</td>
                                      <td className="p-3">{item.dosage}</td>
                                      <td className="p-3">{item.duration}</td>
                                      <td className="p-3 text-gray-500">{item.instruction}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}

                          {/* Add Input Area */}
                          <div className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                             <input type="text" placeholder="Medicine Name" value={prescriptionItem.medicine} onChange={e=>setPrescriptionItem({...prescriptionItem, medicine: e.target.value})} className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-blue-400" />
                             <input type="text" placeholder="Dosage (1-0-1)" value={prescriptionItem.dosage} onChange={e=>setPrescriptionItem({...prescriptionItem, dosage: e.target.value})} className="w-32 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-blue-400" />
                             <input type="text" placeholder="Duration" value={prescriptionItem.duration} onChange={e=>setPrescriptionItem({...prescriptionItem, duration: e.target.value})} className="w-24 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-blue-400" />
                             <input type="text" placeholder="Notes" value={prescriptionItem.instruction} onChange={e=>setPrescriptionItem({...prescriptionItem, instruction: e.target.value})} className="w-40 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold outline-none focus:border-blue-400" />
                             <button onClick={handleAddMedicine} className="bg-gray-800 text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-gray-900 shadow transition">Add</button>
                          </div>
                          
                          <div className="flex justify-end pt-4 border-t border-gray-100">
                            <button onClick={handleSavePrescription} className="bg-blue-600 text-white font-bold py-2.5 px-8 rounded-xl hover:bg-blue-700 transition shadow-lg flex items-center gap-2">
                              <span>🚀</span> Save & Send to Patient
                            </button>
                          </div>
                        </div>

                        {/* LAB REPORTS UPLOAD SECTION */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-gray-800">Lab Reports & Documents</h3>
                            <button onClick={handleFileUploadClick} className="bg-[#008985] text-white px-4 py-2.5 rounded-lg font-bold text-sm shadow hover:bg-[#005a57] transition flex items-center gap-2">
                              <span>⬆️</span> Upload Record
                            </button>
                          </div>
                          
                          {patientReports.length === 0 ? (
                             <div className="text-center bg-gray-50 rounded-2xl py-8 border border-dashed border-gray-200">
                               <p className="text-gray-400 font-bold mb-1">No reports uploaded yet.</p>
                               <p className="text-xs text-gray-400">Click upload record to add PDF or Images.</p>
                             </div>
                          ) : (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               {patientReports.map((rep) => (
                                 <div key={rep.id} className="p-4 border border-gray-100 rounded-xl bg-white shadow-sm flex justify-between items-center hover:shadow-md transition">
                                    <div className="flex items-center gap-3">
                                       <div className="text-2xl bg-blue-50 w-10 h-10 flex items-center justify-center rounded-lg">📄</div>
                                       <div>
                                          <p className="font-bold text-sm text-gray-800 truncate w-40">{rep.title}</p>
                                          <p className="text-xs text-gray-500 font-bold">{rep.date}</p>
                                       </div>
                                    </div>
                                    <div className="flex gap-2">
                                       <button onClick={() => handleViewFile(rep.url)} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition">View</button>
                                       <a href={rep.url} download={rep.title} className="text-xs font-bold text-[#008985] hover:bg-[#e6f4f4] px-3 py-1.5 rounded-lg transition">Download</a>
                                    </div>
                                 </div>
                               ))}
                             </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Empty state for other tabs */}
                    {patientDetailTab === 'Booking History' && (
                       <div className="h-full flex flex-col items-center justify-center text-gray-400 py-20 animate-fade-in">
                         <span className="text-6xl mb-4">📅</span>
                         <h3 className="text-xl font-bold text-gray-600">Booking History</h3>
                         <p className="font-medium text-sm mt-2">Past appointments and details will appear here.</p>
                       </div>
                    )}

                  </div>
                </div>

                {/* RIGHT: FIXED PATIENT SIDEBAR */}
                <div className="w-full xl:w-[320px] bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col shrink-0 h-[700px]">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      <img src={`https://ui-avatars.com/api/?name=${selectedPatient.name}&background=random`} className="w-14 h-14 rounded-full shadow-sm border border-gray-100" alt="avatar" />
                      <div>
                        <h3 className="font-extrabold text-gray-900 text-lg leading-tight">{selectedPatient.name}</h3>
                        <p className="text-[10px] text-gray-500 font-bold mt-0.5">WBS: {selectedPatient.id}</p>
                        <button className="text-[11px] text-blue-500 font-bold mt-1 hover:underline flex items-center gap-1">✏️ Edit</button>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-800 font-bold px-2">⋮</button>
                  </div>

                  <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                    <div>
                      <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-4 cursor-pointer hover:text-blue-600 transition">
                        <span>Basic Information (7)</span><span className="text-gray-400 font-light">⌃</span>
                      </div>
                      <div className="space-y-4 text-sm">
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Gender</p><p className="font-bold text-gray-800">{selectedPatient.gender}</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Age</p><p className="font-bold text-gray-800">{selectedPatient.age}</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Phone</p><p className="font-bold text-gray-800">{selectedPatient.phone}</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Email</p><p className="font-bold text-blue-600 truncate">{selectedPatient.email}</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Address</p><p className="font-bold text-gray-800 leading-snug">{selectedPatient.address}</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Insurance</p><p className="font-bold text-gray-800 leading-snug">Member ID: 783402847201<br/>{selectedPatient.insurance}<br/>United States of America</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Language</p><p className="font-bold text-gray-800">{selectedPatient.language}</p></div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-5">
                      <div className="flex justify-between items-center text-sm font-bold text-gray-800 mb-4 cursor-pointer hover:text-blue-600 transition">
                        <span>Appointments History (2)</span><span className="text-gray-400 font-light">⌃</span>
                      </div>
                      <div className="space-y-4 text-sm">
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Last Appointment</p><p className="font-bold text-gray-800">{selectedPatient.lastVisit}</p></div>
                        <div><p className="text-xs font-bold text-gray-500 mb-0.5">Earlier</p><p className="font-bold text-gray-800">05/01/2026 - 8:00 PM</p></div>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-5"><div className="flex justify-between items-center text-sm font-bold text-gray-500 cursor-pointer hover:text-gray-800 transition"><span>Medications</span><span className="font-light">⌄</span></div></div>
                    <div className="border-t border-gray-100 pt-5"><div className="flex justify-between items-center text-sm font-bold text-gray-500 cursor-pointer hover:text-gray-800 transition"><span>Conditions</span><span className="font-light">⌄</span></div></div>
                    <div className="border-t border-gray-100 pt-5 pb-4"><div className="flex justify-between items-center text-sm font-bold text-gray-500 cursor-pointer hover:text-gray-800 transition"><span>Payment History</span><span className="font-light">⌄</span></div></div>
                  </div>
                </div>

              </div>
            )}

            {/* =============== 4. MESSAGES TAB =============== */}
            {activeTab === 'Messages' && (
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex overflow-hidden w-full h-[600px]">
                <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/30">
                  <div className="p-6 border-b border-gray-100 bg-white shrink-0">
                    <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Messages</h2>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                      <input type="text" placeholder="Search patients..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#008985] outline-none text-sm font-medium transition" />
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {chatList.length === 0 ? <p className="p-6 text-center text-gray-400 text-sm">No chats found.</p> : chatList.map((chat) => (
                      <div key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`flex items-center gap-4 p-4 cursor-pointer transition-all border-l-4 ${activeChatId === chat.id ? 'bg-[#e6f4f4]/50 border-[#008985]' : 'border-transparent hover:bg-gray-50'}`}>
                        <div className="relative">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border border-white shadow-sm ${chat.color}`}>
                            {chat.name.charAt(0)}
                          </div>
                          {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-bold text-gray-800 truncate text-sm">{chat.name}</h4>
                            <span className="text-[10px] font-bold text-gray-400">{chat.time}</span>
                          </div>
                          <p className="text-xs text-gray-500 truncate font-medium">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-sm">{chat.unread}</div>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 flex flex-col bg-white">
                  {activeChatDetails ? (
                    <>
                      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm z-10 shrink-0">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${activeChatDetails.color}`}>
                            {activeChatDetails.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-800">{activeChatDetails.name}</h3>
                            <p className={`text-xs font-bold ${activeChatDetails.online ? 'text-green-500' : 'text-gray-400'}`}>
                              {activeChatDetails.online ? 'Online' : 'Offline'}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#e6f4f4] hover:text-[#008985] transition">📞</button>
                          <button className="w-10 h-10 rounded-full bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-[#e6f4f4] hover:text-[#008985] transition">📄</button>
                        </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 bg-[#fcfdfd] space-y-6">
                        {currentMessages.length > 0 ? (
                          currentMessages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'doctor' ? 'items-end' : 'items-start'}`}>
                              <div className={`max-w-[70%] p-4 shadow-sm ${msg.sender === 'doctor' ? 'bg-[#008985] text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm' : 'bg-white border border-gray-100 text-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm'}`}>
                                <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                              </div>
                              <span className="text-[10px] font-bold text-gray-400 mt-1.5 px-1">{msg.time}</span>
                            </div>
                          ))
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-gray-400">
                            <span className="text-4xl mb-3">💬</span>
                            <p className="font-medium text-sm">No messages yet. Start the conversation!</p>
                          </div>
                        )}
                      </div>

                      <div className="p-5 border-t border-gray-100 bg-white shrink-0">
                        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                          <button type="button" className="text-gray-400 hover:text-[#008985] text-xl px-2 transition">📎</button>
                          <input 
                            type="text" 
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type your message here..." 
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium"
                          />
                          <button type="submit" className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition shadow-md ${messageInput.trim() ? 'bg-[#008985] hover:bg-[#005a57]' : 'bg-gray-300 cursor-not-allowed'}`}>
                            ➤
                          </button>
                        </form>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                      <span className="text-6xl mb-4">📫</span>
                      <h3 className="text-xl font-bold text-gray-600">Your Messages</h3>
                      <p className="font-medium text-sm mt-2">Select a chat from the left to start messaging.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* =============== 5. MEDICATIONS TAB =============== */}
            {activeTab === 'Medications' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Medications Inventory</h2>
                    <p className="text-gray-500 font-medium mt-1">Manage stock, prices, and categories of medicines.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                      <input type="text" placeholder="Search medicines..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#008985] outline-none text-sm font-medium w-64 transition" />
                    </div>
                    <button onClick={() => setIsAddMedModalOpen(true)} className="bg-[#008985] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#005a57] transition shadow-sm flex items-center gap-2 cursor-pointer">
                      <span>+</span> Add Medicine
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-[#e6f4f4] p-4 rounded-2xl border border-[#b3e5e1]">
                     <p className="text-gray-500 text-xs font-bold mb-1">Total Medicines</p>
                     <p className="text-2xl font-extrabold text-[#008985]">{medications.length}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <p className="text-gray-500 text-xs font-bold mb-1">Prescribed Today</p>
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <p className="text-gray-500 text-xs font-bold mb-1">Categories</p>
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                   </div>
                   <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
                     <p className="text-red-500 text-xs font-bold mb-1">Low Stock Alerts</p>
                     <p className="text-2xl font-extrabold text-red-600">{medications.filter(m => m.status === 'Low Stock' || m.status === 'Out of Stock').length}</p>
                   </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-6 border-b border-gray-100">Medicine Name</th>
                        <th className="py-4 px-6 border-b border-gray-100">Category</th>
                        <th className="py-4 px-6 border-b border-gray-100">Stock Qty</th>
                        <th className="py-4 px-6 border-b border-gray-100">Price / Unit</th>
                        <th className="py-4 px-6 border-b border-gray-100">Status</th>
                        <th className="py-4 px-6 border-b border-gray-100 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {medications.length === 0 ? <tr><td colSpan="6" className="py-8 text-center text-gray-400">No medications found.</td></tr> : medications.map((med) => (
                        <tr key={med.id} className="hover:bg-gray-50/50 transition group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-bold border border-gray-200">💊</div>
                              <div>
                                <p className="font-bold text-gray-800">{med.name}</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">ID: {med.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-600 font-medium">{med.category}</td>
                          <td className="py-4 px-6"><span className="font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md text-xs">{med.stock}</span></td>
                          <td className="py-4 px-6 text-gray-600 font-medium">{med.price}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 text-[11px] font-bold rounded-full 
                              ${med.status === 'In Stock' ? 'bg-[#e6f4f4] text-[#008985]' : ''}
                              ${med.status === 'Low Stock' ? 'bg-orange-50 text-orange-600' : ''}
                              ${med.status === 'Out of Stock' ? 'bg-red-50 text-red-600' : ''}
                            `}>{med.status}</span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button onClick={() => alert('Edit Feature Coming Soon!')} className="text-gray-400 hover:text-[#008985] font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =============== 6. DOCUMENTS TAB =============== */}
            {activeTab === 'Documents' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">My Documents</h2>
                    <p className="text-gray-500 font-medium mt-1">Upload and manage your clinic records and certificates.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                      <input type="text" placeholder="Search documents..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#008985] outline-none text-sm font-medium w-64 transition" />
                    </div>
                    <button onClick={() => generalDocRef.current.click()} className="bg-[#008985] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#005a57] transition shadow-sm flex items-center gap-2 cursor-pointer">
                      <span>⬆️</span> Upload New
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-[#e6f4f4] p-4 rounded-2xl border border-[#b3e5e1]">
                     <p className="text-gray-500 text-xs font-bold mb-1">Total Documents</p>
                     <p className="text-2xl font-extrabold text-[#008985]">{documents.length}</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <p className="text-gray-500 text-xs font-bold mb-1">Verified</p>
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <p className="text-gray-500 text-xs font-bold mb-1">Pending Review</p>
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                   </div>
                   <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                     <p className="text-gray-500 text-xs font-bold mb-1">Storage Used</p>
                     <p className="text-2xl font-extrabold text-gray-800">0 MB</p>
                   </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-6 border-b border-gray-100">Document Name</th>
                        <th className="py-4 px-6 border-b border-gray-100">Format</th>
                        <th className="py-4 px-6 border-b border-gray-100">Upload Date</th>
                        <th className="py-4 px-6 border-b border-gray-100">Size</th>
                        <th className="py-4 px-6 border-b border-gray-100">Status</th>
                        <th className="py-4 px-6 border-b border-gray-100 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {documents.length === 0 ? <tr><td colSpan="6" className="py-8 text-center text-gray-400">No documents found.</td></tr> : documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-gray-50/50 transition group">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500 font-bold border border-blue-100">
                                {doc.type === 'PDF' ? '📄' : '🖼️'}
                              </div>
                              <div>
                                <p className="font-bold text-gray-800">{doc.title}</p>
                                <p className="text-xs text-gray-400 font-medium mt-0.5">ID: {doc.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6"><span className="font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs">{doc.type}</span></td>
                          <td className="py-4 px-6 text-gray-600 font-medium">{doc.date}</td>
                          <td className="py-4 px-6 text-gray-500 font-medium">{doc.size}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 text-[11px] font-bold rounded-full 
                              ${doc.status === 'Verified' ? 'bg-green-50 text-green-600 border border-green-100' : ''}
                              ${doc.status === 'Pending Review' ? 'bg-orange-50 text-orange-600 border border-orange-100' : ''}
                              ${doc.status === 'Uploaded' ? 'bg-[#e6f4f4] text-[#008985] border border-[#b3e5e1]' : ''}
                            `}>{doc.status}</span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button onClick={() => alert('Viewing document...')} className="text-gray-400 hover:text-blue-500 font-bold text-sm px-2 py-1.5 rounded-lg hover:bg-blue-50 transition" title="View Document">👁️</button>
                              <button onClick={() => alert('Update feature coming soon!')} className="text-gray-400 hover:text-[#008985] font-bold text-sm px-2 py-1.5 rounded-lg hover:bg-[#e6f4f4] transition" title="Update Document">🔄</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =============== 7. FINANCES TAB =============== */}
            {activeTab === 'Finances' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px]">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-extrabold text-gray-800">Financial Overview</h2>
                    <p className="text-gray-500 font-medium mt-1">Track your clinic's revenue, pending payments, and expenses.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <select className="bg-gray-50 border border-gray-200 text-sm font-bold text-gray-600 px-4 py-2.5 rounded-xl outline-none cursor-pointer hover:border-[#008985] transition">
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>This Year</option>
                    </select>
                    <button onClick={() => alert('Invoice generated and downloaded successfully!')} className="bg-[#008985] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-[#005a57] transition shadow-sm flex items-center gap-2">
                      <span>🧾</span> Generate Invoice
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                   <div className="bg-[#e6f4f4] p-5 rounded-2xl border border-[#b3e5e1]">
                     <p className="text-[#008985] text-xs font-bold mb-1">Total Revenue</p>
                     <p className="text-3xl font-extrabold text-gray-800">$0</p>
                     <p className="text-[10px] font-bold text-gray-500 mt-2"><span className="text-gray-400">0%</span> vs last month</p>
                   </div>
                   <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
                     <p className="text-orange-600 text-xs font-bold mb-1">Pending Payments</p>
                     <p className="text-3xl font-extrabold text-gray-800">$0</p>
                     <p className="text-[10px] font-bold text-gray-500 mt-2">From 0 patients</p>
                   </div>
                   <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
                     <p className="text-red-500 text-xs font-bold mb-1">Expenses</p>
                     <p className="text-3xl font-extrabold text-gray-800">$0</p>
                     <p className="text-[10px] font-bold text-gray-500 mt-2">Equipment & staff</p>
                   </div>
                   <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                     <p className="text-green-600 text-xs font-bold mb-1">Net Earnings</p>
                     <p className="text-3xl font-extrabold text-gray-800">$0</p>
                     <p className="text-[10px] font-bold text-gray-500 mt-2">After all deductions</p>
                   </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <tr>
                        <th className="py-4 px-6 border-b border-gray-100">Transaction ID</th>
                        <th className="py-4 px-6 border-b border-gray-100">Date</th>
                        <th className="py-4 px-6 border-b border-gray-100">Patient / Details</th>
                        <th className="py-4 px-6 border-b border-gray-100">Method</th>
                        <th className="py-4 px-6 border-b border-gray-100">Amount</th>
                        <th className="py-4 px-6 border-b border-gray-100">Status</th>
                        <th className="py-4 px-6 border-b border-gray-100 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {transactionsList.length === 0 ? <tr><td colSpan="7" className="py-8 text-center text-gray-400">No transactions found.</td></tr> : transactionsList.map((trx) => (
                        <tr key={trx.id} className="hover:bg-gray-50/50 transition group">
                          <td className="py-4 px-6 font-bold text-gray-700">{trx.id}</td>
                          <td className="py-4 px-6 text-gray-600 font-medium">{trx.date}</td>
                          <td className="py-4 px-6">
                             <p className="font-bold text-gray-800">{trx.patient}</p>
                             <p className="text-xs text-gray-500 font-medium mt-0.5">{trx.description}</p>
                          </td>
                          <td className="py-4 px-6 text-gray-600 font-medium">{trx.method}</td>
                          <td className="py-4 px-6 font-extrabold text-gray-800">{trx.amount}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 text-[11px] font-bold rounded-full 
                              ${trx.status === 'Paid' ? 'bg-green-50 text-green-600 border border-green-100' : ''}
                              ${trx.status === 'Pending' ? 'bg-orange-50 text-orange-600 border border-orange-100' : ''}
                              ${trx.status === 'Failed' ? 'bg-red-50 text-red-600 border border-red-100' : ''}
                            `}>{trx.status}</span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button onClick={() => alert('Printing invoice...')} className="text-gray-400 hover:text-[#008985] font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 transition cursor-pointer">Print</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* =============== 8. SETTINGS TAB =============== */}
            {activeTab === 'Settings' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[600px] flex flex-col md:flex-row gap-8">
                
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 flex flex-col space-y-2 shrink-0 border-r border-gray-100 pr-6">
                  <h2 className="text-2xl font-extrabold text-gray-800 mb-6">Settings</h2>
                  <button onClick={() => setSettingsTab('Profile')} className={`text-left px-5 py-3.5 rounded-xl font-bold transition-all flex items-center gap-3 ${settingsTab === 'Profile' ? 'bg-[#e6f4f4] text-[#008985] shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}><span>👤</span> Personal Info</button>
                  <button onClick={() => setSettingsTab('Clinic')} className={`text-left px-5 py-3.5 rounded-xl font-bold transition-all flex items-center gap-3 ${settingsTab === 'Clinic' ? 'bg-[#e6f4f4] text-[#008985] shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}><span>🏥</span> Clinic Details</button>
                  <button onClick={() => setSettingsTab('Security')} className={`text-left px-5 py-3.5 rounded-xl font-bold transition-all flex items-center gap-3 ${settingsTab === 'Security' ? 'bg-[#e6f4f4] text-[#008985] shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}><span>🔒</span> Security</button>
                  <button onClick={() => setSettingsTab('Notifications')} className={`text-left px-5 py-3.5 rounded-xl font-bold transition-all flex items-center gap-3 ${settingsTab === 'Notifications' ? 'bg-[#e6f4f4] text-[#008985] shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}><span>🔔</span> Notifications</button>
                </div>

                {/* Settings Content */}
                <div className="flex-1">
                  
                  {settingsTab === 'Profile' && (
                    <div className="animate-fade-in">
                      <div className="mb-8 pb-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800">Personal Information</h3>
                        <p className="text-sm text-gray-500 mt-1">Update your photo and personal details here.</p>
                      </div>

                      <div className="flex items-center gap-6 mb-8">
                         <div className="relative">
                            <div className="w-24 h-24 rounded-full bg-[#008985] text-white flex items-center justify-center text-3xl font-bold shadow-md border-4 border-white uppercase overflow-hidden">
                              {doctorPic ? <img src={doctorPic} alt="Doctor" className="w-full h-full object-cover"/> : docInitial}
                            </div>
                            <button onClick={() => profilePicRef.current.click()} className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-[#008985] transition cursor-pointer">📷</button>
                         </div>
                         <div>
                            <div className="flex gap-3 mb-2">
                              <button onClick={() => profilePicRef.current.click()} className="px-4 py-2 bg-[#008985] text-white text-sm font-bold rounded-lg hover:bg-[#005a57] transition shadow-sm cursor-pointer">Upload New</button>
                              <button onClick={() => setDoctorPic(null)} className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-sm font-bold rounded-lg hover:bg-gray-100 transition cursor-pointer">Remove</button>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                         <div><label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label><input type="text" defaultValue={cleanDocName} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                         <div><label className="block text-sm font-bold text-gray-700 mb-2">Specialization</label><input type="text" defaultValue="Dermatologist" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                         <div><label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label><input type="email" defaultValue="doctor@rufacure.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                         <div><label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label><input type="text" defaultValue="+91 98765 43210" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                         <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Short Bio</label><textarea rows="4" defaultValue="Experienced Dermatologist with over 10 years of practice. Dedicated to providing the best skin care and aesthetic treatments." className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800 resize-none"></textarea></div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition">Cancel</button>
                        <button onClick={() => alert('Profile Updated Successfully!')} className="px-6 py-2.5 bg-[#008985] text-white font-bold rounded-xl hover:bg-[#005a57] transition shadow-md">Save Changes</button>
                      </div>
                    </div>
                  )}

                  {settingsTab === 'Clinic' && (
                    <div className="animate-fade-in">
                      <div className="mb-8 pb-6 border-b border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800">Clinic Details</h3>
                        <p className="text-sm text-gray-500 mt-1">Update your clinic information. This reflects on your Rx pad.</p>
                      </div>

                      <form onSubmit={handleClinicUpdate}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                           <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Clinic Name</label><input type="text" required value={clinicData.name} onChange={e=>setClinicData({...clinicData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                           <div className="md:col-span-2"><label className="block text-sm font-bold text-gray-700 mb-2">Clinic Address</label><input type="text" required value={clinicData.address} onChange={e=>setClinicData({...clinicData, address: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                           <div><label className="block text-sm font-bold text-gray-700 mb-2">Clinic Phone</label><input type="text" required value={clinicData.phone} onChange={e=>setClinicData({...clinicData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                           <div><label className="block text-sm font-bold text-gray-700 mb-2">Registration No.</label><input type="text" required value={clinicData.regNo} onChange={e=>setClinicData({...clinicData, regNo: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium text-gray-800" /></div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                          <button type="button" className="px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-100 transition">Cancel</button>
                          <button type="submit" className="px-6 py-2.5 bg-[#008985] text-white font-bold rounded-xl hover:bg-[#005a57] transition shadow-md">Update Clinic Info</button>
                        </div>
                      </form>
                    </div>
                  )}

                  {(settingsTab === 'Security' || settingsTab === 'Notifications') && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-12 animate-fade-in">
                      <span className="text-6xl mb-4">⚙️</span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{settingsTab} Settings</h3>
                      <p className="text-gray-500 font-medium text-sm">Options for {settingsTab} will appear here. This section is currently being updated.</p>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>

          {/* ================= RIGHT COLUMN (ONLY VISIBLE ON DASHBOARD TAB) ================= */}
          {activeTab === 'Dashboard' && !selectedPatient && (
            <div className="w-full lg:w-80 bg-white rounded-3xl h-fit p-6 flex flex-col gap-8 shadow-sm shrink-0 border border-gray-100">
              
              <div className="text-center pt-4">
                 <div className="w-32 h-32 mx-auto rounded-3xl bg-[#b3e5e1] flex items-center justify-center mb-5 shadow-inner overflow-hidden border-4 border-white shadow-lg">
                     {doctorPic ? <img src={doctorPic} alt="Doctor" className="w-full h-full object-cover" /> : <img src={`https://ui-avatars.com/api/?name=${cleanDocName}&background=008985&color=fff&size=200`} alt="Doctor" className="w-full h-full object-cover" />}
                 </div>
                 <h3 className="text-2xl font-extrabold text-gray-900">{cleanDocName}</h3>
                 <p className="text-sm text-gray-500 font-bold mt-1 bg-gray-50 inline-block px-4 py-1.5 rounded-full border border-gray-100">Dermatologist</p>
              </div>

              <div className="bg-[#f8fdfc] p-5 rounded-2xl border border-[#b3e5e1]">
                 <div className="flex justify-between items-end mb-3">
                     <div>
                         <p className="font-extrabold text-xl text-gray-800">150 People</p>
                         <p className="text-xs text-gray-500 font-medium mt-0.5">Appointments Limit</p>
                     </div>
                     <span className="text-sm font-bold text-[#008985] bg-white px-2 py-1 rounded shadow-sm">150/300</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                     <div className="bg-[#008985] h-2 rounded-full" style={{ width: '50%' }}></div>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="text-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer">
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                     <p className="text-xs font-bold text-gray-500 mt-2">Appointments</p>
                 </div>
                 <div className="text-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer">
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                     <p className="text-xs font-bold text-gray-500 mt-2">Total Patients</p>
                 </div>
                 <div className="text-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer">
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                     <p className="text-xs font-bold text-gray-500 mt-2">Consultations</p>
                 </div>
                 <div className="text-center p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition cursor-pointer">
                     <p className="text-2xl font-extrabold text-gray-800">0</p>
                     <p className="text-xs font-bold text-gray-500 mt-2">Return Patients</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <button className="bg-[#008985] text-white p-5 rounded-2xl text-center shadow-lg hover:bg-[#005a57] hover:-translate-y-1 transition-all flex flex-col items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-2"><span className="text-red-300 text-sm">📞</span></div>
                      <p className="text-xl font-extrabold">0</p>
                      <p className="text-[10px] text-teal-100 font-medium mt-1">Missed Call</p>
                  </button>
                  <button onClick={() => setActiveTab('Messages')} className="bg-white border-2 border-gray-100 text-gray-800 p-5 rounded-2xl text-center hover:border-[#008985] transition-all flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center mb-2"><span className="text-purple-400 text-sm">✉️</span></div>
                      <p className="text-xl font-extrabold text-[#008985]">0</p>
                      <p className="text-[10px] font-bold text-gray-500 mt-1">New Messages</p>
                  </button>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mt-auto">
                  <div className="flex justify-between items-center mb-5">
                      <h4 className="font-bold text-gray-800 text-lg">Incomes</h4>
                      <select className="bg-white border border-gray-200 text-xs font-bold text-gray-600 px-3 py-1.5 rounded-lg outline-none cursor-pointer hover:border-[#008985] transition"><option>February</option></select>
                  </div>
                  <div className="flex justify-between items-end mb-6">
                      <div>
                          <p className="text-3xl font-extrabold text-[#008985] tracking-tight">$0</p>
                          <p className="text-xs font-bold text-gray-500 mt-1">Total Incomes</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                          <span className="inline-block bg-[#e6f4f4] text-[#008985] text-[10px] font-extrabold px-2.5 py-0.5 rounded shadow-sm mb-1">0%</span>
                          <p className="text-[9px] font-bold text-gray-400">From last month</p>
                      </div>
                  </div>
                  <div className="flex justify-between items-center p-3.5 bg-white rounded-xl mb-5 border border-gray-100 shadow-sm cursor-pointer">
                      <span className="text-[11px] font-bold text-gray-700">Transfer automatically</span>
                      <div className="w-10 h-5 bg-[#008985] rounded-full relative flex items-center px-0.5">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 shadow-sm"></div>
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => alert('Feature coming soon!')} className="bg-[#008985] text-white text-[11px] font-bold py-3 rounded-xl hover:bg-[#005a57] transition shadow-md">Send Money</button>
                      <button onClick={() => alert('Feature coming soon!')} className="bg-white border border-gray-200 text-[#008985] text-[11px] font-bold py-3 rounded-xl hover:bg-gray-50 transition">Payment Method</button>
                  </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;