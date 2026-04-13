import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function ResetPasswordPage() {
  const [otp, setOtp] = useState(''); // 🚀 Naya State OTP ke liye
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return alert("Email is missing. Please go back and try again.");
    if (newPassword !== confirmPassword) return alert("Passwords do not match.");
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }), // 🚀 OTP backend ko bhej rahe hain
      });
      const data = await response.json();
      if (response.ok) {
        alert("Success! " + data.message); 
        navigate('/login');
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <AuthLayout>
        <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4 text-[#008985]"><span className="text-6xl">🔒</span></div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">Set new password</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Enter the 6-digit OTP sent to <span className="font-bold text-[#008985]">{email}</span></p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 🚀 Naya OTP Field */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">6-Digit OTP</label>
            <input type="text" maxLength={6} className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50 text-center text-xl tracking-[0.5em]" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">New Password</label>
            <input type="password" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Confirm password</label>
            <input type="password" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className="w-full bg-[#008985] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#005a57] transition shadow-md">Reset Password</button>
        </form>
        <p className="text-center text-sm font-medium text-gray-500 pt-8 flex items-center justify-center gap-2">
            <span className="text-lg">←</span> <Link to="/login" className="font-bold text-[#008985] hover:text-[#005a57]">Back to log in</Link>
        </p>
    </AuthLayout>
  );
}
export default ResetPasswordPage;