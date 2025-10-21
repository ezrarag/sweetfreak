'use client';

import { motion } from 'framer-motion';
import { QrCode, Heart, Grape, Banana, Citrus } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f3e8ff%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
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
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-pink-600">SWEET</span>
            <br />
            <span className="text-purple-600">FREAK</span>
            <br />
            <span className="text-yellow-500">&</span>
            <br />
            <span className="text-green-600">JOLLIES</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
            The energy of nature
          </h2>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700">
            in every bite
          </h3>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Premium candied fruits and adult drinks that fill you with joy and flavor. 
            Each creation combines natural ingredients with modern craftsmanship.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300"
          >
            Order Now
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-50 text-gray-800 font-semibold py-4 px-8 rounded-full text-lg shadow-lg border border-gray-200 transition-all duration-300"
          >
            View Menu
          </motion.button>
        </motion.div>

        {/* QR Code Section - Cleaner Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-md mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode size={32} className="text-blue-600" />
            <span className="text-lg font-semibold text-gray-800">Scan → Shop</span>
          </div>
          <div className="text-gray-600 text-sm mb-4">
            Scan the QR code to view our menu and place an order!
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex justify-center">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <QrCode size={32} className="text-gray-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
