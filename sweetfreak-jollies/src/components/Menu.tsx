'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Apple, Grape, Cherry, Droplets, Banana, Orange, Heart } from 'lucide-react';
import { candiedFruits, adultDrinks } from '@/data/products';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'candied-fruits' | 'adult-drinks'>('candied-fruits');

  const getIcon = (productId: string) => {
    const iconMap: { [key: string]: any } = {
      strawberry: Heart,
      grapes: Grape,
      banana: Banana,
      orange: Orange,
      'berry-freaky': Droplets,
      'gag-green-apple': Apple,
      'gut-gushing-grape': Grape,
      'mouth-water-melons': Droplets,
      'cherry-bust': Cherry,
    };
    const IconComponent = iconMap[productId] || Heart;
    return <IconComponent size={24} />;
  };

  const getColor = (productId: string) => {
    const colorMap: { [key: string]: string } = {
      strawberry: 'text-red-500',
      grapes: 'text-purple-500',
      banana: 'text-yellow-500',
      orange: 'text-orange-500',
      'berry-freaky': 'text-blue-500',
      'gag-green-apple': 'text-green-500',
      'gut-gushing-grape': 'text-purple-500',
      'mouth-water-melons': 'text-pink-500',
      'cherry-bust': 'text-red-500',
    };
    return colorMap[productId] || 'text-pink-500';
  };

  return (
    <section className="py-20 px-4 bg-white/10 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-pink-500 bubble-text">Our</span>
            <span className="text-purple-500 bubble-text"> Menu</span>
          </h2>
          <p className="text-xl text-gray-700">Delicious treats made with love</p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('candied-fruits')}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeTab === 'candied-fruits'
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              Candied Fruits
            </button>
            <button
              onClick={() => setActiveTab('adult-drinks')}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                activeTab === 'adult-drinks'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-purple-500'
              }`}
            >
              Adult Drinks
            </button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(activeTab === 'candied-fruits' ? candiedFruits : adultDrinks).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  activeTab === 'candied-fruits' ? 'bg-pink-100' : 'bg-purple-100'
                }`}>
                  <span className={getColor(product.id)}>
                    {getIcon(product.id)}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm">
                  {product.description}
                </p>
                
                <div className="text-2xl font-bold text-pink-500 mb-4">
                  {product.price}
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-6 rounded-full font-bold text-white transition-colors ${
                    activeTab === 'candied-fruits'
                      ? 'bg-pink-500 hover:bg-pink-600'
                      : 'bg-purple-500 hover:bg-purple-600'
                  }`}
                >
                  Order Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Note for Adult Drinks */}
        {activeTab === 'adult-drinks' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                🍹 Jolly Rancher Flavors Available:
              </h3>
              <p className="text-purple-600">
                Blue Raspberry • Green Apple • Grape • Watermelon • Cherry
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
