import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// 🚀 YAHAN SAARI NAYI IMAGES EXACT FILENAME KE SATH IMPORT KI GAYI HAIN
import foodImg from '../assets/food.jpg';
import skincareImg from '../assets/Skincare.jpg';
import medTechImg from '../assets/Medicaltech.jpg';
import yogaImg from '../assets/Yoga.jpg';
import breathImg from '../assets/Breath.jpg';

function Blog() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Wellness & Diet', 'Medical Tech', 'Mental Health', 'Dermatology', 'Cardiology'];

  // MOCK BLOG DATA (Images add kar di gayi hain)
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the Silent Epidemic: Managing Diabetes in 2026",
      excerpt: "Diabetes is growing at an alarming rate globally. Discover the latest AI-driven monitoring tools and dietary shifts that are helping patients reverse Type 2 diabetes effectively.",
      category: "Wellness & Diet",
      readTime: "6 min read",
      date: "March 28, 2026",
      author: "Dr. Abdul Barr",
      authorRole: "Endocrinology",
      featured: true,
      imageColor: "bg-blue-100"
      // Isme image nahi thi toh isko blank chhod diya hai, purana UI dikhega
    },
    {
      id: 2,
      title: "5 Superfoods for a Stronger Heart",
      excerpt: "Your heart works non-stop. Give it the fuel it deserves. Learn about the top 5 everyday superfoods that naturally lower cholesterol and blood pressure.",
      category: "Cardiology",
      readTime: "4 min read",
      date: "March 25, 2026",
      author: "Dr. Sarah Jenkins",
      authorRole: "Cardiologist",
      featured: false,
      image: foodImg, 
      imageColor: "bg-red-100"
    },
    {
      id: 3,
      title: "Skincare Myths Debunked: What Actually Works?",
      excerpt: "From sunscreen to expensive serums, the skincare industry is full of myths. We break down the clinical truths behind glowing, healthy skin.",
      category: "Dermatology",
      readTime: "5 min read",
      date: "March 22, 2026",
      author: "Dr. Abdul Barr",
      authorRole: "Dermatologist",
      featured: false,
      image: skincareImg, 
      imageColor: "bg-pink-100"
    },
    {
      id: 4,
      title: "The Rise of Telemedicine and AI in Diagnostics",
      excerpt: "How tools like the RuFa Cure Cough Scanner are revolutionizing early diagnostics. Find out how AI is assisting doctors in making faster, more accurate decisions.",
      category: "Medical Tech",
      readTime: "8 min read",
      date: "March 18, 2026",
      author: "Dr. Emily Chen",
      authorRole: "Chief of Tech",
      featured: false,
      image: medTechImg, 
      imageColor: "bg-teal-100"
    },
    {
      id: 5,
      title: "Recognizing Burnout: It's More Than Just Stress",
      excerpt: "Burnout is an official medical condition now. Learn to spot the early psychological and physical signs of burnout before it affects your long-term health.",
      category: "Mental Health",
      readTime: "7 min read",
      date: "March 15, 2026",
      author: "Dr. Alan Smith",
      authorRole: "Psychiatrist",
      featured: false,
      image: yogaImg, 
      imageColor: "bg-purple-100"
    },
    {
      id: 6,
      title: "Post-Viral Respiratory Care: Strengthening Lungs",
      excerpt: "Many patients experience long-term shortness of breath after viral infections. Here are 5 clinically approved breathing exercises for recovery.",
      category: "Wellness & Diet",
      readTime: "5 min read",
      date: "March 10, 2026",
      author: "Dr. Raj Patel",
      authorRole: "Pulmonologist",
      featured: false,
      image: breathImg, 
      imageColor: "bg-orange-100"
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  
  const filteredPosts = activeCategory === 'All' 
    ? blogPosts.filter(post => !post.featured) 
    : blogPosts.filter(post => post.category === activeCategory && !post.featured);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="bg-gradient-to-r from-[#008985] to-[#005a57] py-12 md:py-16 px-4 sm:px-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-white opacity-5 rounded-full -ml-10 -mt-10 md:-ml-20 md:-mt-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-white opacity-5 rounded-full -mr-10 -mb-10 md:-mr-20 md:-mb-20"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-teal-200 font-extrabold tracking-wider uppercase text-xs md:text-sm mb-3 md:mb-4 block">RuFa Cure Insights</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 md:mb-4 leading-tight">
            Health & Wellness Blog
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-teal-100 font-medium leading-relaxed max-w-2xl mx-auto px-4 sm:px-0">
            Stay informed with the latest medical research, lifestyle tips, and health news directly from our expert doctors and specialists.
          </p>
        </div>
      </div>

      {/* --- CATEGORY FILTERS --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full -mt-6 relative z-10 mb-8 md:mb-12">
        {/* Hide scrollbar with a custom class or inline style */}
        <div className="bg-white p-1.5 sm:p-2 rounded-2xl shadow-md border border-gray-100 flex overflow-x-auto hide-scrollbar" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <div className="flex space-x-1 sm:space-x-2 w-full min-w-max px-1 sm:px-2 py-1">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-[#008985] text-white shadow-sm' 
                    : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN BLOG CONTENT --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-12 md:pb-20 w-full flex-1">
        
        {/* Featured Post (Only shows when 'All' is selected) */}
        {activeCategory === 'All' && featuredPost && (
          <div className="mb-10 md:mb-16 bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition duration-300 group cursor-pointer">
            <div className={`w-full md:w-1/2 h-64 sm:h-80 md:min-h-[300px] ${featuredPost.imageColor} relative overflow-hidden flex items-center justify-center`}>
              <span className="text-5xl sm:text-6xl group-hover:scale-110 transition duration-500">🩺</span>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#008985] text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Featured
              </div>
            </div>
            <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              <span className="text-[#008985] font-extrabold text-xs sm:text-sm mb-2 sm:mb-3 tracking-wider uppercase">{featuredPost.category}</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-snug md:leading-tight group-hover:text-[#008985] transition">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed mb-5 sm:mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#008985] text-white flex items-center justify-center font-bold shadow-sm text-xs sm:text-sm">
                    {featuredPost.author.split(' ')[1][0] + (featuredPost.author.split(' ')[2]?.[0] || '')}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs sm:text-sm">{featuredPost.author}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">{featuredPost.date} • {featuredPost.readTime}</p>
                  </div>
                </div>
                <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 text-[#008985] flex items-center justify-center group-hover:bg-[#008985] group-hover:text-white transition shadow-sm text-sm sm:text-base">
                  ➔
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300 group cursor-pointer flex flex-col h-full">
                
                {/* 🚀 YAHAN IMAGES FIT KI GAYI HAIN */}
                <div className={`w-full h-40 sm:h-48 ${!post.image ? post.imageColor : 'bg-gray-100'} relative flex items-center justify-center overflow-hidden shrink-0`}>
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                  ) : (
                    <span className="text-4xl sm:text-5xl opacity-50 group-hover:scale-110 transition duration-500">📄</span>
                  )}
                  
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-600 text-[10px] sm:text-xs font-extrabold px-2 sm:px-3 py-1 rounded-full shadow-sm">
                    {post.readTime}
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <span className="text-[#008985] font-extrabold text-[10px] sm:text-xs mb-2 sm:mb-3 tracking-wider uppercase">{post.category}</span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 leading-snug group-hover:text-[#008985] transition">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 font-medium text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center gap-2 sm:gap-3 pt-4 sm:pt-5 border-t border-gray-50">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-[10px] sm:text-xs shrink-0">
                      {post.author.charAt(4)}
                    </div>
                    <div className="truncate">
                      <p className="font-bold text-gray-900 text-[10px] sm:text-xs truncate">{post.author}</p>
                      <p className="text-[9px] sm:text-[10px] text-gray-500 truncate">{post.authorRole} • {post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 md:py-20 text-center">
              <span className="text-5xl md:text-6xl mb-4 block">📭</span>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">No articles found</h3>
              <p className="text-sm md:text-base text-gray-500 mt-2">Check back later for updates in this category.</p>
            </div>
          )}
        </div>

      </div>

      {/* --- NEWSLETTER SUBSCRIPTION --- */}
      <div className="bg-[#e6f4f4] py-12 md:py-16 px-6 sm:px-8 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-3xl sm:text-4xl mb-3 sm:mb-4 block">💌</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3 sm:mb-4 leading-tight">Subscribe to our Health Newsletter</h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 md:mb-8 max-w-lg mx-auto">
            Get the latest medical news, wellness tips, and exclusive updates from RuFa Cure delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-gray-200 outline-none focus:border-[#008985] text-xs sm:text-sm font-medium shadow-sm w-full"
            />
            <button className="bg-[#008985] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-bold hover:bg-[#005a57] transition shadow-md w-full sm:w-auto text-sm sm:text-base whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-4">We respect your privacy. No spam, ever.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Blog;