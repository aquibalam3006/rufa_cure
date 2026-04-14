import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); 
  const navigate = useNavigate();

  // 🚀 .env se backend ka URL nikalna
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/verify-email', { state: { email } }); 
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) { console.error('Error:', error); }
  };

  return (
    <AuthLayout>
        <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">Create an Account</h2>
            <p className="text-sm text-gray-500 font-medium mt-2">Book Better, Feel Better – With a Personal Touch.</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Register as</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`py-2 px-4 rounded-lg font-bold border-2 transition ${role === 'patient' ? 'bg-[#008985] border-[#008985] text-white' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-[#008985]'}`}
              >
                🏥 Patient
              </button>
              <button
                type="button"
                onClick={() => setRole('doctor')}
                className={`py-2 px-4 rounded-lg font-bold border-2 transition ${role === 'doctor' ? 'bg-[#008985] border-[#008985] text-white' : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-[#008985]'}`}
              >
                👨‍⚕️ Doctor
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <input type="text" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={name} onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
               <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
               <input type="email" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="john@example.com" />
             </div>
             <div>
               <label className="block text-gray-700 text-sm font-semibold mb-2">Phone</label>
               <input type="tel" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 xxxxx xxxxx" />
             </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input type="password" className="w-full border border-gray-200 p-3 rounded-lg focus:outline-none focus:border-[#008985] bg-gray-50" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-[#008985] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#005a57] transition shadow-md mt-4">
            Get Started
          </button>
        </form>
        <p className="text-center text-sm font-medium text-gray-500 pt-6">
            Already have an account? <Link to="/login" className="font-bold text-[#008985] hover:text-[#005a57]">Log in</Link>
        </p>
    </AuthLayout>
  );
}
export default Register;