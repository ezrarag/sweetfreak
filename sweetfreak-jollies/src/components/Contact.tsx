'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, Instagram, MessageCircle, Send } from 'lucide-react';

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
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 px-4 bg-white/10 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-pink-500 bubble-text">Contact</span>
            <span className="text-purple-500 bubble-text"> Us</span>
          </h2>
          <p className="text-xl text-gray-700">Ready to order? Let's connect!</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Get In Touch
              </h3>
              
              <div className="space-y-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="tel:+1234567890"
                  className="flex items-center gap-4 p-4 bg-pink-100 rounded-2xl hover:bg-pink-200 transition-colors"
                >
                  <div className="bg-pink-500 rounded-full p-3">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Call Us</div>
                    <div className="text-gray-600">(123) 456-7890</div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="https://instagram.com/sweetfreakjollies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-purple-100 rounded-2xl hover:bg-purple-200 transition-colors"
                >
                  <div className="bg-purple-500 rounded-full p-3">
                    <Instagram size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Follow Us</div>
                    <div className="text-gray-600">@sweetfreakjollies</div>
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-green-100 rounded-2xl hover:bg-green-200 transition-colors"
                >
                  <div className="bg-green-500 rounded-full p-3">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">WhatsApp</div>
                    <div className="text-gray-600">Message us directly</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Send Us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us what you'd like to order or any questions you have..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Order Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Order?</h3>
            <p className="text-lg mb-6 opacity-90">
              Scan our QR code or contact us directly to place your order!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-pink-500 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors"
              >
                Order Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white font-bold py-3 px-8 rounded-full hover:bg-white/30 transition-colors border-2 border-white"
              >
                View Menu
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
