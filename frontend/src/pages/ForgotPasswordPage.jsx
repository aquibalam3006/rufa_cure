import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setIsLoading(false);
      
      if (response.ok) {
        alert(data.message); 
        // Backend se email jane ke baad, reset page par bhej do
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
        <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-4 text-[#008985]"><span className="text-6xl">🔑</span></div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">Forgot password?</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Enter your email and we'll send you a 6-digit OTP to reset your password.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <input type="email" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter registered email" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-[#008985] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#005a57] transition disabled:opacity-70">
            {isLoading ? 'Sending OTP...' : 'Send Reset OTP'}
          </button>
        </form>
        <p className="text-center text-sm font-medium text-gray-500 pt-8 flex items-center justify-center gap-2">
            <span className="text-lg">←</span> <Link to="/login" className="font-bold text-[#008985] hover:text-[#005a57]">Back to log in</Link>
        </p>
    </AuthLayout>
  );
}
export default ForgotPasswordPage;