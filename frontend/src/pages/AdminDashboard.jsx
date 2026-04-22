import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png'; 

function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // --- DYNAMIC DATA FROM BACKEND ---
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [activeDoctors, setActiveDoctors] = useState([]);
  
  // Future mein jab Patient backend banega, tab isko wahan se fetch karenge
  const [patients, setPatients] = useState([]);

  // Modal State for Reviewing Doctor
  const [selectedDocReq, setSelectedDocReq] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // 🛡️ SECURITY GUARD
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      alert("Unauthorized Access! Please login as Admin first.");
      navigate('/admin-login');
      return;
    }

    // 🚀 FETCH DATA FROM MONGODB
    fetchAdminData();
  }, [navigate]);

  const fetchAdminData = async () => {
    try {
      // Get Pending Doctors
      const resPending = await fetch(`${API_URL}/api/admin/pending-doctors`);
      const dataPending = await resPending.json();
      if(dataPending.ok) {
        // UI ke hisaab se data format karna
        const formattedPending = dataPending.doctors.map(d => ({
          id: d._id, // MongoDB id
          name: d.name,
          email: d.email,
          phone: d.phone,
          appliedOn: new Date(d.createdAt).toLocaleDateString(),
          speciality: d.specialization && d.specialization.length > 0 ? d.specialization[0] : 'General',
          exp: d.totalExperience + ' Years',
          regNo: d.medicalRegNumber,
          // Extract uploaded file keys to show in UI
          documents: Object.keys(d.documents || {}).filter(key => d.documents[key]).map(key => key + ' File')
        }));
        setPendingApprovals(formattedPending);
      }

      // Get Active Doctors
      const resActive = await fetch(`${API_URL}/api/admin/active-doctors`);
      const dataActive = await resActive.json();
      if(dataActive.ok) {
        const formattedActive = dataActive.doctors.map(d => ({
          id: d._id,
          name: d.name,
          speciality: d.specialization && d.specialization.length > 0 ? d.specialization[0] : 'General',
          todayPatients: 0, // In future fetch from appointments DB
          totalPatients: 0,
          rating: d.rating || 'New',
          status: 'Offline'
        }));
        setActiveDoctors(formattedActive);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  // --- ADMIN FUNCTIONS ---
  const openReviewModal = (doc) => {
    setSelectedDocReq(doc);
    setIsReviewModalOpen(true);
  };

  // 🚀 APPROVE TO BACKEND
  const handleApproveDoctor = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/approve-doctor/${selectedDocReq.id}`, {
        method: 'PUT'
      });
      const data = await response.json();
      
      if(data.ok) {
        alert(`Success! ${selectedDocReq.name} has been verified.`);
        setIsReviewModalOpen(false);
        setSelectedDocReq(null);
        fetchAdminData(); // Refresh list
      }
    } catch (error) {
      alert("Error approving doctor");
    }
  };

  // 🚀 REJECT TO BACKEND
  const handleRejectDoctor = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to reject and delete ${selectedDocReq.name}'s application?`);
    if(!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/admin/reject-doctor/${selectedDocReq.id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      
      if(data.ok) {
        alert('Application Rejected and Removed from Database.');
        setIsReviewModalOpen(false);
        setSelectedDocReq(null);
        fetchAdminData(); // Refresh list
      }
    } catch (error) {
      alert("Error rejecting application");
    }
  };


  return (
    <div className="flex h-screen bg-[#f4f7f9] font-sans overflow-hidden text-gray-800 relative">
      
      {/* ================= DOCTOR REVIEW MODAL ================= */}
      {isReviewModalOpen && selectedDocReq && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
            <div className="bg-slate-800 p-4 sm:p-6 text-white flex justify-between items-center shrink-0">
               <div>
                  <h3 className="text-lg sm:text-xl font-bold">Review Doctor Application</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">Application ID: {selectedDocReq.id}</p>
               </div>
               <button onClick={() => setIsReviewModalOpen(false)} className="text-3xl hover:text-red-400 transition">×</button>
            </div>
            
            <div className="p-4 sm:p-8 overflow-y-auto">
               <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl sm:text-2xl font-black shrink-0">
                     {selectedDocReq.name.replace('Dr. ', '').charAt(0)}
                  </div>
                  <div>
                     <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">{selectedDocReq.name}</h2>
                     <p className="text-[#008985] text-sm sm:text-base font-bold">{selectedDocReq.speciality} • {selectedDocReq.exp}</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  <div><p className="text-xs text-gray-500 font-bold mb-1">Email</p><p className="font-bold truncate text-sm sm:text-base">{selectedDocReq.email}</p></div>
                  <div><p className="text-xs text-gray-500 font-bold mb-1">Phone</p><p className="font-bold text-sm sm:text-base">{selectedDocReq.phone}</p></div>
                  <div><p className="text-xs text-gray-500 font-bold mb-1">Medical Reg No.</p><p className="font-bold bg-yellow-50 text-yellow-700 px-2 py-1 inline-block rounded text-sm sm:text-base">{selectedDocReq.regNo}</p></div>
                  <div><p className="text-xs text-gray-500 font-bold mb-1">Applied On</p><p className="font-bold text-sm sm:text-base">{selectedDocReq.appliedOn}</p></div>
               </div>

               <h4 className="font-bold text-gray-800 mb-3">Uploaded Documents</h4>
               <div className="space-y-3 mb-8">
                  {selectedDocReq.documents.length > 0 ? selectedDocReq.documents.map((doc, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border border-gray-200 rounded-xl bg-gray-50">
                       <span className="text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2 capitalize">📄 {doc}</span>
                       <button className="text-blue-600 text-xs font-bold hover:underline">View File</button>
                    </div>
                  )) : <p className="text-sm text-gray-400">No documents found.</p>}
               </div>

               <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                  <button onClick={handleRejectDoctor} className="px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition w-full sm:w-auto text-sm sm:text-base">Reject Application</button>
                  <button onClick={handleApproveDoctor} className="px-6 py-3 bg-[#008985] text-white font-bold rounded-xl hover:bg-[#005a57] transition shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base">
                     <span>✅</span> Approve & Verify
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DARK ADMIN SIDEBAR ================= */}
      {isSidebarOpen && <div className="fixed inset-0 bg-gray-900/60 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 sm:w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 shadow-2xl lg:translate-x-0 lg:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="bg-white p-2 rounded-lg cursor-pointer" onClick={() => navigate('/')}>
             <img src={myLogo} alt="RuFa Cure" className="h-6 sm:h-8 w-auto object-contain" />
          </div>
          <button className="text-3xl leading-none hover:text-gray-300 lg:hidden" onClick={() => setIsSidebarOpen(false)}>×</button>
        </div>
        
        <div className="px-4 sm:px-6 py-4 border-b border-slate-800">
           <p className="text-[10px] sm:text-xs text-slate-400 font-bold tracking-widest uppercase">Admin Panel</p>
           <h3 className="font-extrabold text-white mt-1 text-sm sm:text-base">Super Admin</h3>
        </div>

        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
          {['Dashboard', 'Verification Desk', 'Manage Doctors', 'Registered Patients', 'System Settings'].map((item, idx) => (
            <button key={idx} onClick={() => { setActiveTab(item); setIsSidebarOpen(false); }} className={`w-full text-left flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl transition ${activeTab === item ? 'bg-[#008985] font-bold text-white shadow-md' : 'hover:bg-slate-800 text-slate-300 font-medium'}`}>
              <div className="flex items-center gap-2 sm:gap-3">
                 <span className="text-lg sm:text-xl">{['📊', '🛡️', '👨‍⚕️', '👥', '⚙️'][idx]}</span> 
                 <span className="text-sm sm:text-base">{item}</span>
              </div>
              {item === 'Verification Desk' && pendingApprovals.length > 0 && (
                 <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{pendingApprovals.length}</span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-3 sm:p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 w-full rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 font-bold transition text-sm sm:text-base">
            <span>🚪</span> Logout Admin
          </button>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* TOP NAVBAR */}
        <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="text-2xl sm:text-3xl text-gray-700 hover:text-[#008985] lg:hidden focus:outline-none" onClick={() => setIsSidebarOpen(true)}>☰</button>
            <h2 className="text-lg sm:text-xl font-black text-gray-800 truncate">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="relative hidden md:block">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-[#008985] outline-none text-sm w-48 md:w-64 transition" />
            </div>
            <div className="flex items-center gap-3 md:border-l border-gray-200 md:pl-6">
               <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm text-xs sm:text-sm">AD</div>
            </div>
          </div>
        </div>

        {/* SCROLLABLE DASHBOARD CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#f4f7f9]">
            
            {/* =============== 1. DASHBOARD OVERVIEW =============== */}
            {activeTab === 'Dashboard' && (
              <div className="animate-fade-in space-y-6 sm:space-y-8">
                
                {/* KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
                   <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xl sm:text-2xl shrink-0">👨‍⚕️</div>
                      <div><p className="text-gray-500 font-bold text-xs sm:text-sm">Active Doctors</p><h3 className="text-2xl sm:text-3xl font-black text-gray-900">{activeDoctors.length}</h3></div>
                   </div>
                   <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-xl sm:text-2xl shrink-0">👥</div>
                      <div><p className="text-gray-500 font-bold text-xs sm:text-sm">Total Patients</p><h3 className="text-2xl sm:text-3xl font-black text-gray-900">0</h3></div>
                   </div>
                   <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 sm:gap-5">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center text-xl sm:text-2xl shrink-0">🛡️</div>
                      <div><p className="text-gray-500 font-bold text-xs sm:text-sm">Pending Verifications</p><h3 className="text-2xl sm:text-3xl font-black text-gray-900">{pendingApprovals.length}</h3></div>
                   </div>
                   <div className="bg-[#008985] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg border border-[#005a57] flex items-center gap-4 sm:gap-5 text-white">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 flex items-center justify-center text-xl sm:text-2xl shrink-0">💳</div>
                      <div><p className="text-teal-100 font-bold text-xs sm:text-sm">Revenue (M)</p><h3 className="text-2xl sm:text-3xl font-black">₹0</h3></div>
                   </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                  {/* Action Required Panel */}
                  <div className="xl:col-span-2 bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">Verification Requests</h3>
                      <button onClick={() => setActiveTab('Verification Desk')} className="text-xs sm:text-sm text-blue-600 font-bold hover:underline">View All</button>
                    </div>
                    {pendingApprovals.length === 0 ? (
                       <p className="text-gray-500 italic text-sm">No pending requests right now.</p>
                    ) : (
                      <div className="space-y-3 sm:space-y-4">
                        {pendingApprovals.slice(0,3).map(doc => (
                          <div key={doc.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border border-red-100 bg-red-50/30 rounded-xl sm:rounded-2xl gap-3 sm:gap-0">
                             <div className="flex items-center gap-3 sm:gap-4">
                               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-sm flex items-center justify-center font-bold text-gray-500 shrink-0">{doc.name.replace('Dr. ','').charAt(0)}</div>
                               <div>
                                 <h4 className="font-extrabold text-gray-900 text-sm sm:text-base">{doc.name}</h4>
                                 <p className="text-[10px] sm:text-xs text-gray-500 font-bold mt-0.5">{doc.speciality} • Applied: {doc.appliedOn}</p>
                               </div>
                             </div>
                             <button onClick={() => openReviewModal(doc)} className="bg-slate-900 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow hover:bg-slate-800 transition w-full sm:w-auto">Review</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Top Doctors Panel */}
                  <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Verified Doctors</h3>
                    <div className="space-y-4 sm:space-y-5">
                      {activeDoctors.length === 0 ? <p className="text-sm text-gray-400">No doctors verified yet.</p> : activeDoctors.slice(0,4).map((doc, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-gray-50 pb-2 sm:pb-3">
                           <div>
                             <p className="font-extrabold text-gray-800 text-xs sm:text-sm">{doc.name}</p>
                             <p className="text-[10px] sm:text-xs text-[#008985] font-bold">{doc.speciality}</p>
                           </div>
                           <div className="text-right">
                             <p className="text-xs sm:text-sm font-black text-gray-900">Verified</p>
                             <p className="text-[9px] sm:text-[10px] text-green-500 font-bold">Active</p>
                           </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =============== 2. VERIFICATION DESK =============== */}
            {activeTab === 'Verification Desk' && (
              <div className="animate-fade-in bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 min-h-[500px] sm:min-h-[700px]">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Verification Desk</h2>
                  <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Review documents and approve new doctor registrations.</p>
                </div>
                
                {pendingApprovals.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 sm:py-20 text-gray-400">
                    <span className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</span>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-600">All caught up!</h3>
                    <p className="text-xs sm:text-sm mt-1">No pending doctor applications to review.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto border border-gray-100 rounded-xl sm:rounded-2xl -mx-4 sm:mx-0">
                    <div className="inline-block min-w-full align-middle">
                      <table className="min-w-full text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          <tr>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Doctor Info</th>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Speciality</th>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Reg No (MCI)</th>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Applied Date</th>
                            <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                          {pendingApprovals.map((doc) => (
                            <tr key={doc.id} className="hover:bg-gray-50/50 transition">
                              <td className="py-3 sm:py-4 px-4 sm:px-6">
                                <div>
                                  <p className="font-extrabold text-gray-900 text-sm sm:text-base">{doc.name}</p>
                                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">{doc.email}</p>
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-4 sm:px-6 font-bold text-[#008985]">{doc.speciality}</td>
                              <td className="py-3 sm:py-4 px-4 sm:px-6 font-mono font-bold text-gray-600">{doc.regNo}</td>
                              <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-gray-600">{doc.appliedOn}</td>
                              <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                                <button onClick={() => openReviewModal(doc)} className="bg-slate-900 text-white font-bold text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg hover:bg-slate-800 transition shadow">Review Docs</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* =============== 3. MANAGE DOCTORS =============== */}
            {activeTab === 'Manage Doctors' && (
              <div className="animate-fade-in bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 min-h-[500px] sm:min-h-[700px]">
                <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Registered Doctors</h2>
                    <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">List of all verified doctors currently active.</p>
                  </div>
                </div>
                
                {activeDoctors.length === 0 ? (
                  <p className="text-gray-500 p-6 text-center border border-dashed rounded-xl text-sm sm:text-base">No active doctors currently.</p>
                ) : (
                <div className="overflow-x-auto border border-gray-100 rounded-xl sm:rounded-2xl -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full text-left whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Doctor Name</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Speciality</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-center">Patients Today</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-center">Total Patients</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-center">Status</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                        {activeDoctors.map((doc) => (
                          <tr key={doc.id} className="hover:bg-gray-50/50 transition">
                            <td className="py-3 sm:py-4 px-4 sm:px-6">
                              <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#e6f4f4] text-[#008985] flex items-center justify-center font-bold shrink-0 text-sm sm:text-base">{doc.name.replace('Dr. ','').charAt(0)}</div>
                                <div>
                                  <p className="font-extrabold text-gray-900">{doc.name}</p>
                                  <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold mt-0.5">ID: {doc.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 font-bold text-gray-700">{doc.speciality}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-center font-black text-blue-600">{doc.todayPatients}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-center font-black text-gray-800">{doc.totalPatients}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-center">
                               <span className={`px-2 sm:px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase ${doc.status === 'Online' ? 'bg-green-100 text-green-700' : doc.status === 'In Consultation' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>{doc.status}</span>
                            </td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                              <button className="text-slate-400 hover:text-[#008985] font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-slate-100 transition">Manage</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}
              </div>
            )}

            {/* =============== 4. REGISTERED PATIENTS =============== */}
            {activeTab === 'Registered Patients' && (
              <div className="animate-fade-in bg-white p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 min-h-[500px] sm:min-h-[700px]">
                <div className="mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">Patient Database</h2>
                  <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Overview of all registered users on the platform.</p>
                </div>
                
                {patients.length === 0 ? (
                  <p className="text-center py-10 text-gray-400 text-sm sm:text-base">No patients registered yet.</p>
                ) : (
                <div className="overflow-x-auto border border-gray-100 rounded-xl sm:rounded-2xl -mx-4 sm:mx-0">
                  <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full text-left whitespace-nowrap">
                      <thead className="bg-slate-50 text-slate-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                        <tr>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Patient Info</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Last Visit</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100">Primary Doctor</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-center">Total Visits</th>
                          <th className="py-3 sm:py-4 px-4 sm:px-6 border-b border-gray-100 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
                        {patients.map((pt) => (
                          <tr key={pt.id} className="hover:bg-gray-50/50 transition">
                            <td className="py-3 sm:py-4 px-4 sm:px-6">
                               <p className="font-extrabold text-gray-900">{pt.name}</p>
                               <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">Age: {pt.age} | ID: {pt.id}</p>
                            </td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-gray-600">{pt.lastVisit}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 font-bold text-gray-700">{pt.assignedDoctor}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-center font-black text-gray-800">{pt.totalVisits}</td>
                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-right">
                              <button className="text-slate-400 hover:text-blue-500 font-bold text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-slate-100 transition">View Records</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                )}
              </div>
            )}

            {/* =============== 5. SETTINGS =============== */}
            {activeTab === 'System Settings' && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 sm:p-12 md:p-20 animate-fade-in bg-white rounded-2xl sm:rounded-3xl border border-gray-100 min-h-[400px]">
                 <span className="text-4xl sm:text-6xl mb-3 sm:mb-4">⚙️</span>
                 <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">System Configurations</h3>
                 <p className="text-sm sm:text-base text-gray-500 font-medium max-w-md">Admin settings, platform fees, and API keys configuration will be available here.</p>
              </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;