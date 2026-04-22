import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function VerificationPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', JSON.stringify(data.user));
        
        const userRole = data.user.role;
        const hasProfile = data.user.hasProfile; 
        
        if (userRole === 'doctor') {
          if (hasProfile) {
            navigate('/doctor-dashboard'); 
          } else {
            navigate('/doctor/setup-profile'); 
          }
        } else if (userRole === 'admin') {
          navigate('/admin-dashboard'); 
        } else {
          navigate('/'); 
        }
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <AuthLayout>
        {/* Mobile par padding aur margin thoda kam kiya hai */}
        <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center mb-3 sm:mb-4 text-[#008985]">
              <span className="text-5xl sm:text-6xl">✉️</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">Check your email</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 px-2 sm:px-0">
              We sent a verification code to <span className="font-bold text-[#008985] break-all">{email}</span>
            </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 text-center sm:text-left">
              Verification Code
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-200 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50 text-center text-lg sm:text-xl tracking-[0.3em] sm:tracking-[0.5em] font-bold" 
              value={code} 
              onChange={(e) => setCode(e.target.value)} 
              required 
              maxLength={6} 
              placeholder="000000"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#008985] text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-[#005a57] transition shadow-md text-sm sm:text-base"
          >
            Verify
          </button>
        </form>
    </AuthLayout>
  );
}

export default VerificationPage;