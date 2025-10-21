'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Grape, Banana, Citrus, Apple } from 'lucide-react';
import Link from 'next/link';
import MenuPopup from './MenuPopup';
import Button from './ui/Button';
import { heroTitle, fadeInUp, float } from '@/lib/motionPresets';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden noise-overlay">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/sweetfreaks%2Fsquare-version-1.jpg?alt=media&token=04279062-72f5-4747-92be-a82705a0b6f8')`
          }}
        />
        
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>

        {/* Dropdown Menu */}
        <div className="absolute top-6 right-6 z-20">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3 group btn-shadow ring-2 ring-candy-pink/70 hover:ring-grape-purple/70 hover:animate-pulse-slow"
          >
            <Apple size={32} />
          </motion.button>

          {/* Premium Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute top-16 right-0 backdrop-blur-xl bg-white/5 border border-transparent bg-clip-padding rounded-3xl shadow-[0_0_30px_-8px_rgba(255,79,154,0.25)] py-2 min-w-64 md:min-w-64 sm:min-w-56 relative"
                  style={{
                    background: 'linear-gradient(#ffffff05, #ffffff05), linear-gradient(90deg, #FF4F9A, #9B35FF)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box',
                    border: '1px solid transparent'
                  }}
                >
                  {/* Gradient border overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-candy-pink to-grape-purple p-[1px] -z-10">
                    <div className="w-full h-full rounded-3xl bg-black/10"></div>
                  </div>
                  
                  <Link href="/about">
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      className="px-6 py-3 text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-sweet-gradient transition-all duration-200 cursor-pointer font-display text-sm md:text-base font-bold text-center md:text-left bubble-text"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      🍓 About Us
                    </motion.div>
                  </Link>
                  
                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-candy-pink/30 to-transparent my-1"></div>
                  
                  <Link href="/contact">
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      className="px-6 py-3 text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-sweet-gradient transition-all duration-200 cursor-pointer font-display text-sm md:text-base font-bold text-center md:text-left bubble-text"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      💌 Contact Us
                    </motion.div>
                  </Link>
                  
                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-candy-pink/30 to-transparent my-1"></div>
                  
                  <Link href="/gallery">
                    <motion.div
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                      className="px-6 py-3 text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-sweet-gradient transition-all duration-200 cursor-pointer font-display text-sm md:text-base font-bold text-center md:text-left bubble-text"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      📸 Gallery
                    </motion.div>
                  </Link>
                  
                  {/* Divider */}
                  <div className="h-px w-full bg-gradient-to-r from-candy-pink/30 to-transparent my-1"></div>
                  
                  <motion.div
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    className="px-6 py-3 text-white/90 hover:text-transparent hover:bg-clip-text hover:bg-sweet-gradient transition-all duration-200 cursor-pointer font-display text-lg font-medium"
                    onClick={() => {
                      setIsMenuOpen(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    🍭 View Menu
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>

        {/* Floating fruits - enhanced with motion presets */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 text-pink-200"
            variants={float}
            animate="animate"
          >
            <Heart size={32} />
          </motion.div>
          <motion.div
            className="absolute top-32 right-20 text-purple-200"
            variants={float}
            animate="animate"
            transition={{ delay: 1 }}
          >
            <Grape size={28} />
          </motion.div>
          <motion.div
            className="absolute bottom-40 left-20 text-yellow-200"
            variants={float}
            animate="animate"
            transition={{ delay: 2 }}
          >
            <Banana size={24} />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 text-orange-200"
            variants={float}
            animate="animate"
            transition={{ delay: 3 }}
          >
            <Citrus size={28} />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto py-20 lg:py-32">
          <motion.div
            variants={heroTitle}
            initial="hidden"
            animate="visible"
            className="mb-16"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold">
              <span className="text-sweet-gradient bubble-text">SWEET</span>
              <br />
              <span className="text-sweet-gradient bubble-text">FREAK</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-body mt-6 max-w-2xl mx-auto">
              Indulge in our premium candied fruits & craft cocktails
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/gallery">
              <Button variant="primary" size="lg">
                Order Now
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsMenuOpen(true)}
            >
              View Menu
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Menu Popup */}
      <MenuPopup isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
