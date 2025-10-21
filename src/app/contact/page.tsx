'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Instagram, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We&apos;ll get back to you soon.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent border-2 border-gray-400 text-gray-400 hover:bg-gray-400 hover:text-white transition-all duration-300 rounded-full p-3"
          >
            <ArrowLeft size={24} />
          </motion.button>
        </Link>
      </div>

      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-pink-600">Contact</span>
              <span className="text-purple-600"> Us</span>
            </h1>
            <p className="text-xl text-gray-700">Ready to order? Let&apos;s connect!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Get in Touch
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-100 to-pink-200 rounded-2xl">
                    <div className="bg-pink-500 rounded-full p-3">
                      <Phone size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Call Us</h3>
                      <p className="text-gray-600">(555) 123-SWEET</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl">
                    <div className="bg-purple-500 rounded-full p-3">
                      <Instagram size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Follow Us</h3>
                      <p className="text-gray-600">@sweetfreakjollies</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-2xl">
                    <div className="bg-yellow-500 rounded-full p-3">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Message Us</h3>
                      <p className="text-gray-600">We&apos;ll respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your order or any questions you have..."
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
