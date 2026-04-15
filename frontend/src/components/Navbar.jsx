import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png'; 

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('patient'); 
  const [userInitial, setUserInitial] = useState(''); // Avatar letter ke liye naya state

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (token && token !== 'null' && token !== 'undefined' && token !== '') {
      setIsLoggedIn(true);
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr);
          const name = userObj.fullName || userObj.name || 'User';
          setUserName(name);
          setUserInitial(name.charAt(0).toUpperCase()); // Avatar ka pehla letter nikal liya

          // SMART CHECK: Agar role doctor hai ya naam "Dr" se shuru hota hai
          if (userObj.role === 'doctor' || name.toLowerCase().startsWith('dr')) {
            setUserRole('doctor');
          } else {
            setUserRole('patient');
          }
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      }
    }
  }, []);

  const handleLogin = () => navigate('/login');
  const handleSignUp = () => navigate('/register');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('patient'); 
    setUserInitial('');

    alert("Logged out successfully!");
    navigate('/');
  };

  const handleAppointmentClick = () => {
    if (isLoggedIn) {
      navigate('/appointment');
    } else {
      alert("Please login or register first to book an appointment.");
      navigate('/login');
    }
  };

  // Profile click handler
  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Agar doctor hai aur profile incomplete hai toh setup pe bhejo
    if (user?.role === 'doctor' && user?.hasProfile === false) {
      navigate('/doctor/setup-profile');
    } else if (userRole === 'doctor') {
      navigate('/doctor-profile');
    } else {
      navigate('/profile');
    }
  };

  const handleMenuClick = (item) => {
    if (item === 'Home') navigate('/');
    else if (item === 'Specialities') navigate('/doctors');
    else if (item === 'About Us') navigate('/about');
    else if (item === 'Service') navigate('/services');
    else if (item === 'Blog') navigate('/blog');
    else console.log(`Navigating to ${item}`);
  };

  return (
    <header className="sticky top-0 z-50 shadow-md flex w-full">

      {/* =========================================
          SECTION 1: LOGO BLOCK (Left Side) - FIXED SIZE
          ========================================= */}
      <div
        className="flex items-center cursor-pointer px-4 lg:px-6 py-2 bg-white border-r border-gray-200 flex-shrink-0"
        onClick={() => navigate('/')}
      >
        <img
          src={myLogo}
          alt="RuFa Cure Logo"
          className="h-16 sm:h-20 lg:h-24 w-auto object-contain"
        />
      </div>

      {/* =========================================
          SECTION 2: NAVBARS BLOCK (Right Side)
          ========================================= */}
      <div className="flex-1 flex flex-col">

        {/* --- TOP NAVBAR (White Background) --- */}
        <div className="bg-white px-8 py-2 flex justify-end items-center border-b border-gray-100">
          <div className="hidden md:flex items-center gap-6 text-[#005a57] text-xs font-bold">
            <span onClick={() => navigate('/doctors')} className="cursor-pointer hover:text-[#008985] transition flex items-center gap-1">
              🩺 Find a Doctor
            </span>
            <span onClick={handleAppointmentClick} className="cursor-pointer hover:text-[#008985] transition flex items-center gap-1">
              📅 Appointment
            </span>
            <span className="cursor-pointer hover:text-[#008985] transition flex items-center gap-1">
              🧪 Lab Report
            </span>
            <span className="cursor-pointer hover:text-[#008985] transition flex items-center gap-1">
              💊 Health Packages
            </span>

            {/* LANGUAGE SELECTOR */}
            <select className="bg-gray-50 text-gray-800 py-1 px-2 rounded outline-none cursor-pointer border border-gray-300 ml-2">
              <option value="en">Language</option>
              <option value="hi">Hindi</option>
              <option value="en-us">English</option>
            </select>
          </div>
        </div>

        {/* --- BOTTOM NAVBAR (Teal Background) --- */}
        <div className="bg-[#008985] px-8 py-3 flex items-center flex-1">

          {/* 1. Left Spacer (Perfect center ke liye zaruri hai) */}
          <div className="flex-1 hidden md:block"></div>

          {/* 2. Main Nav Links */}
          <nav className="hidden md:flex items-center justify-center gap-8 text-sm lg:text-base text-white font-medium">
            {['Home', 'About Us', 'Specialities', 'Service', 'Blog'].map((item) => (
              <span
                key={item}
                onClick={() => handleMenuClick(item)}
                className="cursor-pointer hover:text-gray-200 transition whitespace-nowrap"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* 3. Login/Signup OR Logout Buttons (Right aligned) */}
          <div className="flex items-center justify-end gap-4 flex-1">
           {isLoggedIn ? (
              // 🚀 LOGGED-IN SECTION (Avatar on Right, Red Logout Button)
              <div className="flex items-center gap-4">
                
                {/* Profile Name & Avatar */}
                <div 
                  className="flex items-center gap-3 cursor-pointer group" 
                  onClick={handleProfileClick}
                >
                  {/* User Name (Pehle aayega) */}
                  <span className="font-bold text-white text-sm md:text-base group-hover:text-gray-200 transition-colors hidden lg:block whitespace-nowrap">
                    Hi, {userName}
                  </span>

                  {/* Circular Placeholder Image (Right side aayega) */}
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-white text-[#008985] items-center justify-center font-extrabold text-lg shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                    {userInitial || '👤'}
                  </div>
                </div>

                {/* Logout Button (Wapas purana mast Red color!) */}
                <button
                  onClick={handleLogout}
                  className="bg-[#ef4444] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#dc2626] transition shadow-md text-sm"
                >
                  Logout
                </button>
                
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-5 py-1.5 border-2 border-white text-white bg-transparent font-bold rounded hover:bg-white hover:text-[#008985] transition text-sm"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-5 py-1.5 border-2 border-white bg-white text-[#008985] font-bold rounded hover:bg-gray-100 transition text-sm whitespace-nowrap"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;