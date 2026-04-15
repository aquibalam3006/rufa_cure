import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ReCAPTCHA from "react-google-recaptcha"; // 🚀 NAYA IMPORT

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 🚀 NAYE STATES (Loading aur Captcha ke liye)
  const [isLoading, setIsLoading] = useState(false); 
  const [captchaToken, setCaptchaToken] = useState(null); 
  
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // Jab Captcha tick hoga, tab ye function chalega
  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🛡️ SECURITY CHECK: Agar Captcha tick nahi hai toh aage mat badho
    if (!captchaToken) {
      return alert("⚠️ Please verify that you are not a robot!");
    }

    // 🔄 SPINNER START (Button ghumna shuru)
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Backend bhejte time captcha token bhi bhej sakte hain future me
        body: JSON.stringify({ email, password, captchaToken }), 
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token); 
        
        const userRole = data.user.role; 
        const hasProfile = data.user.hasProfile; 
        
        // Smart Redirect Logic
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
    } catch (error) { 
      console.error('Error:', error); 
      alert("Something went wrong! Please try again.");
    } finally {
      // 🛑 SPINNER STOP (Login ho gaya ya error aaya, button wapas normal karo)
      setIsLoading(false);
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

          {/* 🤖 GOOGLE reCAPTCHA WIDGET */}
          <div className="flex justify-center w-full my-4">
             <ReCAPTCHA
                // Ye Google ka official Test Site Key hai. Live jaane se pehle isko change karna hota hai.
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" 
                onChange={handleCaptchaChange}
             />
          </div>

          {/* 🔄 SUBMIT BUTTON WITH LOADING SPINNER */}
          <button 
            type="submit" 
            disabled={isLoading} 
            className={`w-full text-white font-bold py-3 px-4 rounded-lg transition shadow-md flex justify-center items-center gap-3 
              ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#008985] hover:bg-[#005a57]'}`}
          >
            {isLoading ? (
              <>
                {/* Spinner SVG */}
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        <p className="text-center text-sm font-medium text-gray-500 pt-8">
            Don’t have an account? <Link to="/register" className="font-bold text-[#008985] hover:text-[#005a57]">Sign up</Link>
        </p>
    </AuthLayout>
  );
}
export default Login;