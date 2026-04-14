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
        const hasProfile = data.user.hasProfile; // 👈 LOGIC ADDED HERE
        
        // ==========================================
        // 🚀 SMART REDIRECT LOGIC (FIXED)
        // ==========================================
        if (userRole === 'doctor') {
          if (hasProfile) {
            // Agar profile already bani hui hai toh dashboard pe bhejo
            navigate('/doctor-dashboard'); 
          } else {
            // Naya doctor register karke verify kar raha hai -> Setup Profile pe bhejo
            navigate('/doctor/setup-profile'); 
          }
        } else if (userRole === 'admin') {
          navigate('/admin-dashboard'); 
        } else {
          // Patient
          navigate('/'); 
        }
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <AuthLayout>
        <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4 text-[#008985]"><span className="text-6xl">✉️</span></div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">Check your email</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">We sent a verification code to <span className="font-bold text-[#008985]">{email}</span>.</p>
        </div>
        <form onSubmit={handleVerify} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Verification Code</label>
            <input type="text" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50 text-center text-xl tracking-[0.5em]" value={code} onChange={(e) => setCode(e.target.value)} required maxLength={6} />
          </div>
          <button type="submit" className="w-full bg-[#008985] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#005a57] transition shadow-md">Verify</button>
        </form>
    </AuthLayout>
  );
}
export default VerificationPage;