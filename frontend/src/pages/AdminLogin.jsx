import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png';

function AdminLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(''); // Type karte hi error hata do
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 🚀 BACKEND API CALL FOR ADMIN LOGIN
      const response = await fetch('http://localhost:5000/api/admin/login', {
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans relative overflow-hidden">
      
      {/* Background Graphic Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden z-10 relative">
        
        {/* Top Accent Line */}
        <div className="h-2 w-full bg-gradient-to-r from-[#008985] to-slate-800"></div>

        <div className="p-10">
          <div className="flex flex-col items-center justify-center mb-8">
            <div className="bg-slate-50 p-3 rounded-2xl mb-4 border border-slate-100 shadow-sm">
              <img src={myLogo} alt="RuFa Cure" className="h-10 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-black text-slate-800">Admin Portal</h2>
            <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">Authorized Access Only</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm font-bold p-3 rounded-xl mb-6 text-center animate-fade-in">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Admin Email</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400">✉️</span>
                <input 
                  type="email" 
                  name="email" 
                  value={credentials.email} 
                  onChange={handleChange} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-bold text-slate-800" 
                  placeholder="admin@rufacure.com"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Secret Password</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400">🔒</span>
                <input 
                  type="password" 
                  name="password" 
                  value={credentials.password} 
                  onChange={handleChange} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-bold text-slate-800" 
                  placeholder="••••••••"
                  required 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-slate-800 text-white font-extrabold py-3.5 rounded-xl hover:bg-slate-900 transition shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying...
                </>
              ) : (
                <>Enter Command Center 🚀</>
              )}
            </button>
          </form>

        </div>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
           <p className="text-[10px] font-bold text-slate-400">Protected by RuFa Security. Unauthorised access is strictly prohibited.</p>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;