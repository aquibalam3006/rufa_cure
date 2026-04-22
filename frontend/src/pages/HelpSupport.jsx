import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

function HelpSupport() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('FAQ');
  const [faqCategory, setFaqCategory] = useState('General');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // MOCK FAQ DATA
  const faqs = [
    { category: 'General', q: 'How do I create a RuFa Cure account?', a: 'You can create an account by clicking the "Sign Up" button on the top right corner of the home page. You will need a valid mobile number and email address.' },
    { category: 'General', q: 'Is my medical data secure?', a: 'Yes, your data is 100% secure. We use 256-bit encryption and comply with global healthcare privacy standards (HIPAA) to ensure your Personal Health Information is safe.' },
    { category: 'Appointments', q: 'How do I book a tele-consultation?', a: 'Log in to your account, search for your preferred doctor or specialty, select an available time slot under "Online Consult", and complete the payment.' },
    { category: 'Appointments', q: 'Can I reschedule or cancel my appointment?', a: 'Yes, you can reschedule or cancel up to 2 hours before the scheduled time from your Patient Dashboard for a full refund.' },
    { category: 'Lab Tests', q: 'How do home sample collections work?', a: 'Once you book a lab test, a certified phlebotomist will visit your registered address at the chosen time. Reports will be uploaded directly to your RuFa Cure dashboard within 24-48 hours.' },
    { category: 'Pharmacy', q: 'Do I need a prescription to order medicines?', a: 'For OTC (Over-The-Counter) products, no prescription is required. However, for scheduled drugs, you must upload a valid prescription from a registered medical practitioner.' },
  ];

  const filteredFaqs = faqs.filter(faq => faq.category === faqCategory);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- EMERGENCY BANNER --- */}
      <div className="bg-red-600 text-white py-2 px-4 text-center text-xs sm:text-sm font-bold flex flex-wrap justify-center items-center gap-1 sm:gap-2">
        <span className="text-lg sm:text-xl animate-pulse">🚨</span>
        <p>For Medical Emergencies or Ambulance, please call <span className="text-lg sm:text-xl tracking-wider mx-1">1066</span> immediately.</p>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-12 sm:py-16 px-6 sm:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white opacity-5 rounded-full -mt-10 -mr-10 sm:-mt-20 sm:-mr-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-80 sm:h-80 bg-white opacity-5 rounded-full -mb-12 -ml-12 sm:-mb-20 sm:-ml-20"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-teal-200 font-extrabold tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4 block">We Are Here To Help</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
            Help & Support Center
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-teal-100 font-medium leading-relaxed">
            Have a question, need assistance with an appointment, or want to share feedback? Our dedicated support team is available 24/7.
          </p>
        </div>
      </div>

      {/* --- QUICK CONTACT CARDS --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full -mt-8 sm:-mt-10 relative z-10 mb-8 sm:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#e6f4f4] text-[#008985] rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">📞</div>
            <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1">24/7 Helpline</h3>
            <p className="text-gray-500 font-medium text-xs sm:text-sm mb-2 sm:mb-3">General Enquiries & Support</p>
            <p className="text-lg sm:text-xl font-extrabold text-[#008985]">1800-123-RUFA</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">✉️</div>
            <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1">Email Support</h3>
            <p className="text-gray-500 font-medium text-xs sm:text-sm mb-2 sm:mb-3">Write to us for detailed queries</p>
            <p className="text-base sm:text-lg font-extrabold text-blue-600 truncate px-2">support@rufacure.com</p>
          </div>
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center text-xl sm:text-2xl mx-auto mb-3 sm:mb-4">🏥</div>
            <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1">Corporate Office</h3>
            <p className="text-gray-500 font-medium text-xs sm:text-sm mb-2 sm:mb-3">Visit our headquarters</p>
            <p className="text-xs sm:text-sm font-bold text-gray-700 px-2">Healthcare City, Cyber Hub, ND - 110001</p>
          </div>
        </div>
      </div>

      {/* --- TABBED INTERFACE --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pb-16 sm:pb-20 flex-1 flex flex-col lg:flex-row gap-6 sm:gap-8">
        
        {/* Sidebar Menu - Horizontal on Mobile, Vertical on Laptop */}
        <div className="w-full lg:w-1/4 shrink-0">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:sticky lg:top-28">
            <h3 className="hidden lg:block text-xs sm:text-sm font-extrabold text-gray-400 uppercase tracking-wider mb-4 px-4 pt-2">Support Menu</h3>
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto hide-scrollbar pb-1 lg:pb-0" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
              <button onClick={() => setActiveTab('FAQ')} className={`shrink-0 text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'FAQ' ? 'bg-[#e6f4f4] text-[#008985] shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}>
                <span className="text-lg sm:text-xl">❓</span> Frequently Asked
              </button>
              <button onClick={() => setActiveTab('WriteUs')} className={`shrink-0 text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'WriteUs' ? 'bg-[#e6f4f4] text-[#008985] shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}>
                <span className="text-lg sm:text-xl">📝</span> Write to Us
              </button>
              <button onClick={() => setActiveTab('Grievance')} className={`shrink-0 text-left px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${activeTab === 'Grievance' ? 'bg-red-50 text-red-600 shadow-sm' : 'hover:bg-gray-50 text-gray-600'}`}>
                <span className="text-lg sm:text-xl">⚖️</span> Grievance Redressal
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-3/4 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 p-5 sm:p-8 md:p-12 lg:min-h-[600px]">
          
          {/* --- 1. FAQ SECTION --- */}
          {activeTab === 'FAQ' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium mb-6 sm:mb-8">Find quick answers to common questions about our services.</p>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8 border-b border-gray-100 pb-5 sm:pb-6">
                {['General', 'Appointments', 'Lab Tests', 'Pharmacy'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setFaqCategory(cat)}
                    className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition ${faqCategory === cat ? 'bg-gray-900 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* FAQ Accordion */}
              <div className="space-y-3 sm:space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <div key={index} className={`border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-[#008985] bg-[#f8fdfc] shadow-sm' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                    <button 
                      className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center focus:outline-none"
                      onClick={() => toggleFaq(index)}
                    >
                      <span className={`font-bold pr-3 sm:pr-4 text-sm sm:text-base ${openFaqIndex === index ? 'text-[#008985]' : 'text-gray-800'}`}>{faq.q}</span>
                      <span className={`text-lg sm:text-xl transition-transform duration-300 shrink-0 ${openFaqIndex === index ? 'rotate-45 text-[#008985]' : 'text-gray-400'}`}>+</span>
                    </button>
                    {openFaqIndex === index && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-gray-600 font-medium leading-relaxed text-sm sm:text-base animate-fade-in border-t border-[#b3e5e1]/30 pt-3 sm:pt-4">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- 2. WRITE TO US (Form) --- */}
          {activeTab === 'WriteUs' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Write to Us</h2>
              <p className="text-sm sm:text-base text-gray-500 font-medium mb-6 sm:mb-8">Send us your queries regarding health packages, lab reports, or general feedback. We usually reply within 24 hours.</p>

              <form className="space-y-4 sm:space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Mobile Number</label>
                    <input type="text" placeholder="+91 XXXXX XXXXX" className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium" />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Query Category</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-bold text-gray-600 cursor-pointer">
                    <option>Health Queries (Ask a Doctor)</option>
                    <option>Lab Tests & Reports</option>
                    <option>Pharmacy Orders</option>
                    <option>Technical Support</option>
                    <option>Other Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2">Your Message</label>
                  <textarea rows="5" placeholder="Please describe your query in detail..." className="w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 outline-none focus:border-[#008985] focus:bg-white transition text-sm font-medium resize-none"></textarea>
                </div>

                <button type="button" className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#008985] text-white font-bold rounded-lg sm:rounded-xl hover:bg-[#005a57] transition shadow-md w-full md:w-auto text-sm sm:text-base">
                  Submit Request
                </button>
              </form>
            </div>
          )}

          {/* --- 3. GRIEVANCE REDRESSAL --- */}
          {activeTab === 'Grievance' && (
            <div className="animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl sm:text-2xl shrink-0">⚖️</div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Grievance Redressal</h2>
                  <p className="text-sm sm:text-base text-gray-500 font-medium">We take patient satisfaction seriously.</p>
                </div>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 p-4 sm:p-5 rounded-xl sm:rounded-2xl mb-6 sm:mb-8">
                <p className="text-xs sm:text-sm font-medium text-orange-800 leading-relaxed">
                  RuFa Cure is committed to resolving your concerns promptly. If you are not satisfied with the standard support response, you may escalate your issue using the matrix below.
                </p>
              </div>

              {/* Timeline Container */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gray-200">
                
                {/* Level 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-gray-900 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 text-sm sm:text-base">L1</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1">Customer Support</h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2 sm:mb-3">First point of contact for all queries.</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800">Email: <span className="text-[#008985] break-all">support@rufacure.com</span></p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">TAT: <span className="text-gray-500">24-48 Hours</span></p>
                  </div>
                </div>

                {/* Level 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-orange-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 text-sm sm:text-base">L2</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm">
                    <h3 className="font-extrabold text-gray-900 text-base sm:text-lg mb-1">Escalation Desk</h3>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mb-2 sm:mb-3">If L1 fails to resolve in 48 hours.</p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800">Email: <span className="text-orange-600 break-all">escalations@rufacure.com</span></p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">TAT: <span className="text-gray-500">3 Working Days</span></p>
                  </div>
                </div>

                {/* Level 3 (Nodal Officer) */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-red-600 text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md z-10 text-sm sm:text-base">L3</div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-red-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-red-100 shadow-sm">
                    <h3 className="font-extrabold text-red-900 text-base sm:text-lg mb-1">Grievance Nodal Officer</h3>
                    <p className="text-xs sm:text-sm text-red-700 font-medium mb-3 sm:mb-4">Highest level of escalation for severe issues.</p>
                    <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl border border-red-100">
                      <p className="text-xs sm:text-sm font-bold text-gray-900">Mr. Rakesh Sharma</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 mb-2">Chief Grievance Officer</p>
                      <p className="text-xs sm:text-sm font-bold text-gray-800">Email: <span className="text-red-600 break-all">nodal@rufacure.com</span></p>
                      <p className="text-xs sm:text-sm font-bold text-gray-800 mt-1">Phone: <span className="text-gray-600">+91 11 4567 XXXX</span></p>
                      <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2 font-medium">(Mon - Fri, 10 AM to 5 PM)</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HelpSupport;