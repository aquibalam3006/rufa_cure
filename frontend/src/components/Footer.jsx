import React from 'react';
import { useNavigate } from 'react-router-dom';
import myLogo from '../assets/logo.png'; // Aapka logo yahan import kar liya hai

function Footer() {
  const navigate = useNavigate();

  const footerData = [
    {
      title: 'About RuFa Cure',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us / Grievance', path: '/support' },
        { name: 'FAQs', path: '/support' },
        { name: 'Health Queries', path: '/support' },
        { name: 'Terms and Conditions', path: '/legal' },
        { name: 'Returns Policy', path: '/legal' },
        { name: 'Refund Policy', path: '/legal' },
        { name: 'Privacy Policy', path: '/legal' },
        { name: 'Other Policies', path: '/legal' },
        { name: 'RuFa Cure Android App', path: '/download-app' },
        { name: 'RuFa Cure iOS App', path: '/download-app' },
        { name: 'Corporate Disclosures', path: '/corporate' },
        { name: 'Corporate Partnerships', path: '/corporate' },
        { name: 'RuFa Cure Sitemap', path: '#' },
        { name: 'Online Doctor App', path: '/download-app' },
        { name: 'Online Medicine App', path: '/download-app' },
        { name: 'RuFa Cure Pharmacy', path: '/network' },
        { name: 'Hospitals And Clinics', path: '/network' },
        { name: 'Disease and Conditions', path: '/network' },
        { name: 'Blogs', path: '/blog' },
        { name: 'Lab Tests Queries', path: '/support' }
      ],
    },
    {
      title: 'Services',
      links: [
        { name: 'Online Doctor Consultation', path: '/services' },
        { name: 'RuFa Cure Circle Membership', path: '/services' },
        { name: 'Online Medicines', path: '/services' },
        { name: 'Cough Scanner', path: '/services' },
        { name: 'RuFa Cure Pro Health Program', path: '/services' },
        { name: 'Doctors by Specialty', path: '/doctors' },
        { name: 'Doctors by City', path: '/doctors' },
        { name: 'All Doctors List', path: '/doctors' },
        { name: 'RuFa Cure Diabetes Reversal', path: '/services' },
        { name: 'International Patients Login', path: '/services' }
      ],
    },
    {
      title: 'Top Specialties',
      links: [
        { name: 'Covid Consultation', path: '/doctors' }, 
        { name: 'Consult Physicians', path: '/doctors' }, 
        { name: 'Consult Dermatologists', path: '/doctors' },
        { name: 'Consult Paediatricians', path: '/doctors' }, 
        { name: 'Consult Gynaecologists', path: '/doctors' }, 
        { name: 'Consult Gastroenterologists', path: '/doctors' },
        { name: 'Consult Cardiologists', path: '/doctors' }, 
        { name: 'Consult Dietitians', path: '/doctors' }, 
        { name: 'Consult ENT Specialists', path: '/doctors' },
        { name: 'Consult Geriatricians', path: '/doctors' }, 
        { name: 'Consult Diabetologists', path: '/doctors' }
      ],
    },
    {
      title: 'Book Lab Tests at Home',
      links: [
        { name: 'RT PCR Test at Home', path: '/lab-tests' }, 
        { name: 'Book Lab Tests at Home', path: '/lab-tests' }, 
        { name: 'Renal Profile (KFT, RFT Test)', path: '/lab-tests' },
        { name: 'Hemogram Test', path: '/lab-tests' }, 
        { name: 'Lipid Profile Test', path: '/lab-tests' }, 
        { name: 'Thyroid Profile Test', path: '/lab-tests' },
        { name: 'D Dimer Test', path: '/lab-tests' }, 
        { name: 'Urine Culture Test', path: '/lab-tests' }, 
        { name: 'Complete Blood Count', path: '/lab-tests' },
        { name: 'Widal Test', path: '/lab-tests' }, 
        { name: 'Liver Function Test', path: '/lab-tests' }
      ],
    },
    {
      title: 'Momverse',
      links: [
        { name: 'Momverse Home', path: '/momverse' }, 
        { name: 'Preconception', path: '/momverse' }, 
        { name: 'Pregnancy', path: '/momverse' }, 
        { name: 'Postpartum', path: '/momverse' }, 
        { name: 'Newborn & Infant', path: '/momverse' }, 
        { name: 'First Trimester', path: '/momverse' }, 
        { name: 'Second Trimester', path: '/momverse' }, 
        { name: 'Third Trimester', path: '/momverse' }, 
        { name: 'Ovulation', path: '/momverse' },
        { name: 'Infertility', path: '/momverse' }, 
        { name: 'Postpartum Mental Health', path: '/momverse' }, 
        { name: 'Pregnancy Articles', path: '/momverse' }, 
        { name: 'Postpartum Articles', path: '/momverse' }, 
        { name: '3 months Pregnancy', path: '/momverse' }, 
        { name: '2 months Pregnancy', path: '/momverse' }, 
        { name: 'Breastfeeding', path: '/momverse' }, 
        { name: 'Baby Food', path: '/momverse' }, 
        { name: 'Baby Vaccination', path: '/momverse' }, 
        { name: '6 Month Old Baby', path: '/momverse' }, 
        { name: 'Popular Girl Baby Names', path: '/momverse' }
      ],
    },
  ];

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    if (path !== '#') {
      navigate(path);
      window.scrollTo(0, 0); 
    }
  };

  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 text-gray-700 px-8 md:px-16 py-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        
        {footerData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="footer-column">
            <h4 className="text-lg font-bold text-[#008985] mb-4 uppercase tracking-wider">
              {section.title}
            </h4>
            
            <ul className="text-sm space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <button 
                    onClick={(e) => handleLinkClick(e, link.path)} 
                    className="text-left hover:text-[#008985] transition-colors duration-200 cursor-pointer w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>

      {/* --- BOTTOM BAR (Logo added here) --- */}
      <div className="max-w-7xl mx-auto border-t border-gray-100 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>&copy; {new Date().getFullYear()} RuFa Cure. All rights reserved.</p>
        <div className="flex items-center gap-3">
           {/* Text ki jagah Logo laga diya gaya hai */}
           <img src={myLogo} alt="RuFa Cure Logo" className="h-8 w-auto object-contain cursor-pointer" onClick={() => navigate('/')} />
           <span className="text-gray-300 font-light">|</span>
           <span className="text-gray-400 font-medium">Quality Healthcare</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;