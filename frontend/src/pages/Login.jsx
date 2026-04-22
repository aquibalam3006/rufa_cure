import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  // 🔥 NEW ERROR STATES
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      return setError("Please verify captcha first.");
    }

    if (!email || !password) {
      return setError("All fields are required.");
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, captchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);

        const { role, hasProfile } = data.user;

        if (role === 'doctor') {
          navigate(hasProfile ? '/doctor-dashboard' : '/doctor/setup-profile');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">

        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-2">Please enter your details</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium px-4 py-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:border-[#008985] outline-none bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 p-3 border border-gray-200 rounded-lg focus:border-[#008985] outline-none bg-gray-50 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* 👁️ SHOW/HIDE */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008985]"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* REMEMBER */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-[#008985] font-bold">
              Forgot?
            </Link>
          </div>

          {/* CAPTCHA */}
          <div className="flex justify-center overflow-hidden">
            <div className="origin-top scale-[0.85] sm:scale-100">
              <ReCAPTCHA
                sitekey="YOUR_KEY"
                onChange={handleCaptchaChange}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={isLoading}
            className={`w-full py-3 rounded-lg font-bold text-white flex justify-center items-center gap-2
              ${isLoading ? "bg-gray-400" : "bg-[#008985] hover:bg-[#005a57]"}`}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#008985] font-bold">
            Sign up
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}

export default Login;