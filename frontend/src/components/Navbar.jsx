import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png'; // Make sure extension is correct

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('patient'); // Naya state role ke liye

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
    setUserRole('patient'); // Reset role

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

  // Profile click handler - Role ke hisaab se redirect
  const handleProfileClick = () => {
    if (userRole === 'doctor') {
      navigate('/doctor-profile');
    } else {
      navigate('/profile');
    }
  };

  // Naya function jo bottom menu ke clicks handle karega
  const handleMenuClick = (item) => {
    if (item === 'Home') {
      navigate('/');
    } else if (item === 'Specialities') {
      navigate('/doctors');
    } else if (item === 'About Us') {
      navigate('/about');
    } else if (item === 'Service') {
      navigate('/services');
    } else if (item === 'Blog') {
      navigate('/blog');
    } else { // Baaki pages ke liye placeholder
      console.log(`Navigating to ${item}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-md flex w-full">

      {/* =========================================
          SECTION 1: LOGO BLOCK (Left Side)
          ========================================= */}
      {/* Logo Container */}
      <div className="flex items-center h-12 md:h-16 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src={myLogo} // Ya jo bhi aapke logo variable ka naam hai
          alt="RuFa Cure"
          className="h-full w-auto object-contain max-w-[180px] md:max-w-[220px]"
        />
      </div>

      {/* =========================================
          SECTION 2: NAVBARS BLOCK (Right Side)
          ========================================= */}
      <div className="flex-1 flex flex-col">

        {/* --- TOP NAVBAR (White Background) --- */}
        <div className="bg-white px-8 py-2 flex justify-end items-center border-b border-gray-100">
          <div className="hidden md:flex items-center gap-6 text-[#005a57] text-xs font-bold">

            <span
              onClick={() => navigate('/doctors')}
              className="cursor-pointer hover:text-[#008985] transition flex items-center gap-1"
            >
              🩺 Find a Doctor
            </span>

            <span
              onClick={handleAppointmentClick}
              className="cursor-pointer hover:text-[#008985] transition flex items-center gap-1"
            >
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

          {/* 2. Main Nav Links (AB YE PERFECT MIDDLE MEIN AAYEGA AUR WORK KAREGA) */}
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
              <>
                <span className="text-white font-semibold hidden lg:block whitespace-nowrap">
                  {/* YAHAN CLICK HANDLER CHANGE KIYA HAI */}
                  <button onClick={handleProfileClick} className="font-bold text-white hover:text-gray-200 transition">
                    Hi, {userName}
                  </button>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-1.5 border-2 border-red-400 text-white bg-red-500 font-bold rounded hover:bg-red-600 hover:border-red-600 transition text-sm shadow-sm"
                >
                  Logout
                </button>
              </>
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