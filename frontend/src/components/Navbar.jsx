import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png'; 

function Navbar() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('patient'); 
  const [userInitial, setUserInitial] = useState(''); 
  
  // 🚀 NAYA STATE: Mobile Hamburger Menu ko open/close karne ke liye
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          setUserInitial(name.charAt(0).toUpperCase()); 

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

  const handleLogin = () => {
    setIsMobileMenuOpen(false); // Mobile menu band karo
    navigate('/login');
  };
  
  const handleSignUp = () => {
    setIsMobileMenuOpen(false); 
    navigate('/register');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    setUserRole('patient'); 
    setUserInitial('');
    setIsMobileMenuOpen(false);

    alert("Logged out successfully!");
    navigate('/');
  };

  const handleAppointmentClick = () => {
    setIsMobileMenuOpen(false);
    if (isLoggedIn) {
      navigate('/appointment');
    } else {
      alert("Please login or register first to book an appointment.");
      navigate('/login');
    }
  };

  const handleProfileClick = () => {
    setIsMobileMenuOpen(false);
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user?.role === 'doctor' && user?.hasProfile === false) {
      navigate('/doctor/setup-profile');
    } else if (userRole === 'doctor') {
      navigate('/doctor-profile');
    } else {
      navigate('/profile');
    }
  };

  const handleMenuClick = (item) => {
    setIsMobileMenuOpen(false); // Link click hone pe menu band ho jayega
    if (item === 'Home') navigate('/');
    else if (item === 'Specialities') navigate('/doctors');
    else if (item === 'About Us') navigate('/about');
    else if (item === 'Service') navigate('/services');
    else if (item === 'Blog') navigate('/blog');
    else console.log(`Navigating to ${item}`);
  };

  return (
    // 🚀 'relative' add kiya hai taaki mobile dropdown header ke theek niche se nikle
    <header className="sticky top-0 z-50 shadow-md flex w-full relative">

      {/* =========================================
          SECTION 1: LOGO BLOCK 
          ========================================= */}
      <div
        className="flex items-center cursor-pointer px-4 lg:px-6 py-2 bg-white border-r border-gray-200 flex-shrink-0"
        onClick={() => { setIsMobileMenuOpen(false); navigate('/'); }}
      >
        <img
          src={myLogo}
          alt="RuFa Cure Logo"
          className="h-16 sm:h-20 lg:h-24 w-auto object-contain" 
        />
      </div>

      {/* =========================================
          SECTION 2: NAVBARS BLOCK
          ========================================= */}
      <div className="flex-1 flex flex-col">

        {/* --- TOP NAVBAR (Laptop pe dikhega, Mobile pe hide) --- */}
        <div className="bg-white px-8 py-2 justify-end items-center border-b border-gray-100 hidden md:flex">
          <div className="flex items-center gap-6 text-[#005a57] text-xs font-bold">
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

            <select className="bg-gray-50 text-gray-800 py-1 px-2 rounded outline-none cursor-pointer border border-gray-300 ml-2">
              <option value="en">Language</option>
              <option value="hi">Hindi</option>
              <option value="en-us">English</option>
            </select>
          </div>
        </div>

        {/* --- BOTTOM NAVBAR (Teal Background) --- */}
        <div className="bg-[#008985] px-4 md:px-8 py-3 flex items-center flex-1 justify-end md:justify-between">

          <div className="flex-1 hidden md:block"></div>

          {/* Main Nav Links (Laptop Only) */}
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

          {/* Login/Signup OR Logout Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 flex-1">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="flex items-center gap-2 sm:gap-3 cursor-pointer group" 
                  onClick={handleProfileClick}
                >
                  <span className="font-bold text-white text-xs sm:text-sm md:text-base group-hover:text-gray-200 transition-colors hidden sm:block whitespace-nowrap">
                    Hi, {userName}
                  </span>
                  <div className="flex w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-[#008985] items-center justify-center font-extrabold text-sm sm:text-lg shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                    {userInitial || '👤'}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-[#ef4444] text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg font-bold hover:bg-[#dc2626] transition shadow-md text-xs sm:text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="px-3 sm:px-5 py-1.5 border-2 border-white text-white bg-transparent font-bold rounded hover:bg-white hover:text-[#008985] transition text-xs sm:text-sm"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-3 sm:px-5 py-1.5 border-2 border-white bg-white text-[#008985] font-bold rounded hover:bg-gray-100 transition text-xs sm:text-sm whitespace-nowrap"
                >
                  Sign up
                </button>
              </>
            )}

            {/* 🚀 HAMBURGER ICON (MOBILE ONLY) */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white text-2xl ml-2 focus:outline-none"
            >
              {isMobileMenuOpen ? '✖' : '☰'}
            </button>

          </div>
        </div>
      </div>

      {/* =========================================
          🚀 MOBILE DROPDOWN MENU (Sirf tab dikhega jab isMobileMenuOpen true ho)
          ========================================= */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 flex flex-col md:hidden z-50">
          
          {/* Main Links (Jo Teal bar me the) */}
          <div className="flex flex-col px-6 py-4 space-y-4 border-b border-gray-100">
            {['Home', 'About Us', 'Specialities', 'Service', 'Blog'].map((item) => (
              <span
                key={item}
                onClick={() => handleMenuClick(item)}
                className="font-bold text-gray-800 hover:text-[#008985] cursor-pointer text-lg"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Top Bar Links (Jo White bar me the) */}
          <div className="flex flex-col px-6 py-4 bg-gray-50 space-y-4 text-sm font-bold text-gray-600">
            <span onClick={() => { setIsMobileMenuOpen(false); navigate('/doctors'); }} className="cursor-pointer hover:text-[#008985] flex items-center gap-2">
              🩺 Find a Doctor
            </span>
            <span onClick={handleAppointmentClick} className="cursor-pointer hover:text-[#008985] flex items-center gap-2">
              📅 Appointment
            </span>
            <span className="cursor-pointer hover:text-[#008985] flex items-center gap-2">
              🧪 Lab Report
            </span>
            <span className="cursor-pointer hover:text-[#008985] flex items-center gap-2">
              💊 Health Packages
            </span>
            <div className="pt-2">
              <select className="bg-white text-gray-800 py-2 px-3 rounded outline-none cursor-pointer border border-gray-300 w-full">
                <option value="en">Language (English)</option>
                <option value="hi">Hindi</option>
              </select>
            </div>
          </div>

        </div>
      )}

    </header>
  );
}

export default Navbar;