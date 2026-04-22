import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png';

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Type karte hi error hata do
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 🚀 BACKEND API CALL FOR ADMIN LOGIN (Live URL)
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        // Success: Admin Token aur details save karo
        localStorage.setItem('adminToken', data.token); // Secure JWT Token
        localStorage.setItem('adminUser', JSON.stringify(data.admin)); 
        
        // Dashboard pe bhej do
        navigate('/admin-dashboard');
      } else {
        // Failed: Backend se jo error aayi hai wo dikhao
        setError(data.message || 'Invalid Admin Credentials. Access Denied!');
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Admin Login Error:", err);
      setError('Server Error. Please ensure backend is running.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      
      {/* Background Graphic Elements - Mobile pe size thoda chota kiya hai */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/10 rounded-full blur-2xl sm:blur-3xl"></div>
      <div className="absolute bottom-[-5%] right-[-10%] w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-2xl sm:blur-3xl"></div>

      {/* Card Wrapper - Border radius mobile pe thoda kam */}
      <div className="max-w-md w-full bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 relative">
        
        {/* Top Accent Line */}
        <div className="h-1.5 sm:h-2 w-full bg-gradient-to-r from-[#008985] to-slate-800"></div>

        {/* Inner Padding - Mobile pe p-6, Tablet/Laptop pe p-10 */}
        <div className="p-6 sm:p-8 md:p-10">
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8">
            <div className="bg-slate-50 p-2 sm:p-3 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 border border-slate-100 shadow-sm">
              <img src={myLogo} alt="RuFa Cure" className="h-8 sm:h-10 w-auto object-contain" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800">Admin Portal</h2>
            <p className="text-xs sm:text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest text-center">Authorized Access Only</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-bold p-3 rounded-lg sm:rounded-xl mb-5 sm:mb-6 text-center animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Admin Email</label>
              <div className="relative">
                <span className="absolute left-3 sm:left-4 top-2.5 sm:top-3 text-slate-400 text-sm sm:text-base">✉️</span>
                <input 
                  type="email" 
                  name="email" 
                  value={credentials.email} 
                  onChange={handleChange} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-xs sm:text-sm font-bold text-slate-800" 
                  placeholder="admin@rufacure.com"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5 sm:mb-2">Secret Password</label>
              <div className="relative">
                <span className="absolute left-3 sm:left-4 top-2.5 sm:top-3 text-slate-400 text-sm sm:text-base">🔒</span>
                <input 
                  type="password" 
                  name="password" 
                  value={credentials.password} 
                  onChange={handleChange} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-xs sm:text-sm font-bold text-slate-800" 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-800 text-white font-extrabold py-3 sm:py-3.5 rounded-lg sm:rounded-xl hover:bg-slate-900 transition shadow-lg flex items-center justify-center gap-2 mt-2 sm:mt-4 text-sm sm:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>Enter Command Center 🚀</>
              )}
            </button>
          </form>

        </div>
        
        <div className="bg-slate-50 p-3 sm:p-4 text-center border-t border-slate-100">
           <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 px-2">Protected by RuFa Security. Unauthorised access is strictly prohibited.</p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;