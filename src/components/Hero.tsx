'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Grape, Banana, Citrus, Apple } from 'lucide-react';
import Link from 'next/link';
import MenuPopup from './MenuPopup';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/sweetfreaks%2Fsquare-version-1.jpg?alt=media&token=04279062-72f5-4747-92be-a82705a0b6f8')`
          }}
        />
        
        {/* Overlay with transparency */}
        <div className="absolute inset-0 bg-[#FAF5FE] opacity-75"></div>

        {/* Dropdown Menu */}
        <div className="absolute top-6 right-6 z-20">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-transparent border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white transition-all duration-300 rounded-full p-3 group"
          >
            <Apple size={32} />
          </motion.button>

          {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.3 
                  }}
                  className="absolute top-16 right-0 bg-transparent backdrop-blur-sm rounded-2xl shadow-xl border-2 border-orange-400 py-2 min-w-48"
                >
                <Link href="/about">
                  <div
                    className="px-6 py-3 text-pink-600 hover:text-orange-300 transition-colors cursor-pointer"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About Us
                  </div>
                </Link>
                  <Link href="/contact">
                    <div
                      className="px-6 py-3 text-pink-600 hover:text-orange-300 transition-colors cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Contact Us
                    </div>
                  </Link>
                  <Link href="/gallery">
                    <div
                      className="px-6 py-3 text-pink-600 hover:text-orange-300 transition-colors cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Gallery
                    </div>
                  </Link>
                <div
                  className="px-6 py-3 text-pink-600 hover:text-orange-300 transition-colors cursor-pointer border-t border-orange-400"
                  onClick={() => {
                    setIsMenuOpen(true);
                    setIsDropdownOpen(false);
                  }}
                >
                  View Menu
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating fruits - more subtle */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-pink-200"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Heart size={32} />
          </motion.div>
          <motion.div
            className="absolute top-32 right-20 text-purple-200"
            animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          >
            <Grape size={28} />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-20 text-yellow-200"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          >
            <Banana size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-orange-200"
            animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, delay: 3 }}
          >
            <Citrus size={28} />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl font-bold" style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold' }}>
              <span className="text-pink-600">SWEET</span>
              <br />
              <span className="text-purple-600">FREAK</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/gallery">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
              >
                Order Now
              </motion.button>
            </Link>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(true)}
              className="bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300"
            >
              View Menu
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Menu Popup */}
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
