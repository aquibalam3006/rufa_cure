import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token); 
        
        const userRole = data.user.role; 
        const hasProfile = data.user.hasProfile; // Backend se aaya flag check karo
        
        // ==========================================
        // NAYA SMART REDIRECT LOGIC
        // ==========================================
        if (userRole === 'doctor') {
          if (hasProfile) {
             // Agar profile ban chuki hai -> Direct Dashboard!
             navigate('/doctor-dashboard'); 
          } else {
             // Agar pehli baar aaya hai -> Setup Profile
             navigate('/doctor/setup-profile'); 
          }
        } else if (userRole === 'admin') {
          navigate('/admin-dashboard'); 
        } else {
          navigate('/'); // Patient
        }
        
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) { 
      console.error('Error:', error); 
    }
  };

  return (
    <AuthLayout>
        <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">Welcome back</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Please enter your details to sign in.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input type="email" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input type="password" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="w-5 h-5 rounded text-[#008985] focus:ring-[#008985]" />
                <label htmlFor="remember" className="text-gray-700 font-medium cursor-pointer">Remember me</label>
             </div>
             <Link to="/forgot-password" className="font-bold text-[#008985] hover:text-[#005a57]">Forgot password</Link>
          </div>
          <button type="submit" className="w-full bg-[#008985] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#005a57] transition shadow-md">Sign in</button>
        </form>
        <p className="text-center text-sm font-medium text-gray-500 pt-8">
            Don’t have an account? <Link to="/register" className="font-bold text-[#008985] hover:text-[#005a57]">Sign up</Link>
        </p>
    </AuthLayout>
  );
}
export default Login;