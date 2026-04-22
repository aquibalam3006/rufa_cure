import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setIsLoading(false);
      
      if (response.ok) {
        alert(data.message); 
        navigate('/set-new-password', { state: { email } }); 
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) { 
      setIsLoading(false);
      console.error('Error:', error); 
    }
  };

  return (
    <AuthLayout>
        <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center mb-3 sm:mb-4 text-[#008985]">
              <span className="text-5xl sm:text-6xl">🔑</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">Forgot password?</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-2 px-2 sm:px-0">
              Enter your email and we'll send you a 6-digit OTP to reset your password.
            </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-gray-700 text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full border border-gray-200 p-2.5 sm:p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50 text-sm sm:text-base" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter registered email" 
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full bg-[#008985] text-white font-bold py-2.5 sm:py-3 px-4 rounded-lg hover:bg-[#005a57] transition disabled:opacity-70 text-sm sm:text-base"
          >
            {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
          </button>
        </form>
        <p className="text-center text-xs sm:text-sm font-medium text-gray-500 pt-6 sm:pt-8 flex items-center justify-center gap-2">
            <span className="text-base sm:text-lg">←</span> 
            <Link to="/login" className="font-bold text-[#008985] hover:text-[#005a57]">Back to log in</Link>
        </p>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;