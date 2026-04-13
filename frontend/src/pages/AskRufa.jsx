import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
// GoogleGenerativeAI import hata diya gaya hai bcz ab hum backend use karenge

function AskRufa() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // --- STRICT LOGIN CHECK ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    const isLoggedIn = token && token !== 'null' && token !== 'undefined' && token !== '';

    if (!isLoggedIn) {
      alert("🔒 Please login or register first to chat with RuFa AI.");
      navigate('/login'); 
    }
  }, [navigate]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am RuFa, your personal AI Health Assistant. I can help you understand symptoms, provide wellness tips, or guide you to the right specialist. How can I help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const suggestions = [
    "I have a mild fever and headache.",
    "What are the symptoms of Diabetes?",
    "How to improve my sleep cycle?",
    "Which doctor should I see for a skin rash?"
  ];

  const handleSend = async (text) => {
    const userMsg = text || input;
    if (!userMsg.trim()) return;

    const newUserMsg = {
      id: Date.now(),
      sender: 'user',
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true); 

    try {
      // Naya Logic: Backend API ko call kar rahe hain
      const response = await fetch('http://localhost:5000/api/ai/ask-rufa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agar aapne token system fully implement kiya hai toh Authorization header yahan aayega
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: userMsg,
          // Gemini format mein history bhej rahe hain
          history: messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Server error");
      }

      const newAiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: data.text, // Backend se aaya hua response
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newAiMsg]);

    } catch (error) {
      console.error("AI API Error:", error);
      
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "I'm sorry, I am having trouble connecting to my medical database right now. Please try again later.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="bg-orange-50 border-b border-orange-100 py-2 px-4 text-center text-xs md:text-sm font-medium text-orange-800 shrink-0">
        <span className="font-bold">⚠️ AI Medical Disclaimer:</span> RuFa AI provides information for educational purposes only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. In an emergency, dial 1066.
      </div>

      <div className="flex-1 max-w-5xl mx-auto w-full bg-white md:border-x border-gray-100 shadow-sm flex flex-col relative overflow-hidden">
        
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#008985] to-[#005a57] flex items-center justify-center text-white text-xl shadow-md">
              ✨
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg leading-tight">Ask RuFa AI <sup className="text-[10px] text-[#008985] bg-[#e6f4f4] px-1.5 py-0.5 rounded">BETA</sup></h2>
              <p className="text-xs text-green-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online and ready
              </p>
            </div>
          </div>
          <button onClick={() => setMessages([messages[0]])} className="text-gray-400 hover:text-[#008985] text-sm font-bold transition">
            Clear Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#fcfdfd] space-y-6 scroll-smooth">
          
          {messages.length === 1 && (
            <div className="mb-8 animate-fade-in">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Try asking about</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggest, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSend(suggest)}
                    className="bg-white border border-[#b3e5e1] text-[#005a57] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e6f4f4] transition shadow-sm"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg) => (
            <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#008985] text-white flex items-center justify-center text-sm mr-3 shrink-0 mt-1 shadow-sm">
                  ✨
                </div>
              )}

              <div className={`max-w-[85%] md:max-w-[70%] p-4 shadow-sm relative ${
                msg.sender === 'user' 
                  ? 'bg-gray-800 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm' 
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm'
              }`}>
                <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </div>
                <span className={`text-[9px] font-bold mt-2 block ${msg.sender === 'user' ? 'text-gray-400 text-right' : 'text-gray-400'}`}>
                  {msg.time}
                </span>
              </div>

            </div>
          ))}

          {isTyping && (
            <div className="flex w-full justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-[#008985] text-white flex items-center justify-center text-sm mr-3 shrink-0 shadow-sm">
                ✨
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
                <div className="w-2 h-2 bg-[#008985] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-[#008985] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-[#008985] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="flex items-center gap-3 bg-gray-50 border border-gray-200 p-1.5 rounded-full focus-within:border-[#008985] focus-within:bg-white transition-all shadow-inner"
          >
            <button type="button" className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#008985] transition rounded-full hover:bg-gray-100">
              📎
            </button>
            
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms or ask a health question..." 
              className="flex-1 bg-transparent outline-none text-sm font-medium px-2 text-gray-800"
              disabled={isTyping}
            />
            
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition shadow-md ${
                input.trim() && !isTyping 
                  ? 'bg-[#008985] text-white hover:bg-[#005a57]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              ➤
            </button>
          </form>
          <div className="text-center mt-2">
            <p className="text-[10px] text-gray-400 font-bold">RuFa AI can make mistakes. Always verify medical information.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AskRufa;