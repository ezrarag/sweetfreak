'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section className="py-20 px-4 bg-white/10 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-4">
              <Users size={40} className="text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            <span className="text-pink-500 bubble-text">About</span>
            <span className="text-purple-500 bubble-text"> Us</span>
          </h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Heart className="text-red-500" size={24} />
              <span className="text-2xl font-bold text-gray-800">Mother-Daughter Duo</span>
              <Heart className="text-red-500" size={24} />
            </motion.div>
            
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
              We're a passionate mother-daughter team bringing you the sweetest treats and most refreshing drinks! 
              Our candied fruits are made with love and our adult drinks pack a Jolly Rancher punch that'll make your taste buds dance.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="text-pink-500" size={24} />
                  <h3 className="text-xl font-bold text-pink-700">Candied Fruits</h3>
                </div>
                <p className="text-pink-600">
                  Fresh, juicy fruits coated in our signature candy glaze. Each bite is a burst of sweetness!
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="text-purple-500" size={24} />
                  <h3 className="text-xl font-bold text-purple-700">Adult Drinks</h3>
                </div>
                <p className="text-purple-600">
                  Refreshing cocktails with a Jolly Rancher twist. Perfect for any celebration!
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
