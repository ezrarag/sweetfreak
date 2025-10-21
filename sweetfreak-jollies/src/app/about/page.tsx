'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function About() {
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4">
                <Users size={40} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-pink-600">About</span>
              <span className="text-purple-600"> Us</span>
            </h1>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                <Heart className="text-red-500" size={24} />
                <span className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>Mother-Daughter Duo</span>
                <Heart className="text-red-500" size={24} />
              </motion.div>
              
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                We&apos;re a passionate mother-daughter team bringing you the sweetest treats and most refreshing drinks! 
                Our candied fruits are made with love and our adult drinks pack a Jolly Rancher punch that&apos;ll make your taste buds dance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Heart className="text-pink-600" size={24} />
                    <h3 className="text-xl font-bold text-pink-800" style={{ fontFamily: 'Georgia, serif' }}>Made with Love</h3>
                  </div>
                  <p className="text-pink-700">
                    Every piece of candied fruit is handcrafted with care, using only the finest ingredients and traditional techniques passed down through generations.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="text-purple-600" size={24} />
                    <h3 className="text-xl font-bold text-purple-800" style={{ fontFamily: 'Georgia, serif' }}>Premium Quality</h3>
                  </div>
                  <p className="text-purple-700">
                    Our adult drinks feature premium spirits and authentic Jolly Rancher flavors, creating the perfect balance of sweetness and sophistication.
                  </p>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-8 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Our Story
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  What started as a fun experiment in our kitchen has grown into Sweet Freak & Jollies, 
                  where we combine the joy of childhood candy with the sophistication of adult beverages. 
                  We believe that life is too short not to indulge in the sweet things, and we&apos;re here to make every moment a little more delicious.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
