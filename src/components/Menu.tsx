'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Apple, Grape, Cherry, Droplets, Banana, Citrus, Heart } from 'lucide-react';
import { candiedFruits, adultDrinks } from '@/data/products';
import Button from './ui/Button';
import { fadeInUp, scaleIn } from '@/lib/motionPresets';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'candied-fruits' | 'adult-drinks'>('candied-fruits');

  const getIcon = (productId: string) => {
    const iconMap: { [key: string]: React.ComponentType<{ size: number }> } = {
      strawberry: Heart,
      grapes: Grape,
      banana: Banana,
      orange: Citrus,
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
    <section className="py-20 lg:py-32 px-4 section-gradient">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="text-sweet-gradient">Our</span>
            <span className="text-sweet-gradient"> Menu</span>
          </h2>
          <p className="text-xl md:text-2xl text-deep-charcoal/80 font-body max-w-2xl mx-auto">
            Delicious treats made with love and premium ingredients
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          {/* Desktop Layout */}
          <div className="hidden md:block bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-candy-pink/20">
            <button
              onClick={() => setActiveTab('candied-fruits')}
              className={`px-8 py-3 rounded-full font-body font-semibold text-lg transition-all ${
                activeTab === 'candied-fruits'
                  ? 'bg-sweet-gradient text-white shadow-lg'
                  : 'text-deep-charcoal hover:text-candy-pink'
              }`}
            >
              Candied Fruits
            </button>
            <button
              onClick={() => setActiveTab('adult-drinks')}
              className={`px-8 py-3 rounded-full font-body font-semibold text-lg transition-all ${
                activeTab === 'adult-drinks'
                  ? 'bg-sweet-gradient text-white shadow-lg'
                  : 'text-deep-charcoal hover:text-grape-purple'
              }`}
            >
              Adult Drinks
            </button>
          </div>

          {/* Mobile Layout - Dropdown */}
          <div className="md:hidden relative">
            <button
              onClick={() => setActiveTab(activeTab === 'candied-fruits' ? 'adult-drinks' : 'candied-fruits')}
              className={`px-6 py-3 rounded-full font-body font-semibold text-lg transition-all bg-white/90 backdrop-blur-sm shadow-lg border border-candy-pink/20 ${
                activeTab === 'candied-fruits'
                  ? 'bg-sweet-gradient text-white'
                  : 'bg-sweet-gradient text-white'
              }`}
            >
              {activeTab === 'candied-fruits' ? 'Candied Fruits' : 'Adult Drinks'}
              <span className="ml-2">▼</span>
            </button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          key={activeTab}
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {(activeTab === 'candied-fruits' ? candiedFruits : adultDrinks).map((product, index) => (
            <motion.div
              key={product.id}
              variants={scaleIn}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-candy-pink/10 card-hover"
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                  activeTab === 'candied-fruits' ? 'bg-candy-pink/10' : 'bg-grape-purple/10'
                }`}>
                  <span className={getColor(product.id)}>
                    {getIcon(product.id)}
                  </span>
                </div>
                
                <h3 className="text-2xl font-display font-bold text-deep-charcoal mb-3">
                  {product.name}
                </h3>
                
                <p className="text-deep-charcoal/70 mb-6 font-body leading-relaxed">
                  {product.description}
                </p>
                
                <div className="text-3xl font-display font-bold text-sweet-gradient mb-6">
                  {product.price}
                </div>
                
                <Button 
                  variant="primary" 
                  className="w-full"
                >
                  Order Now
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Special Note for Adult Drinks */}
        {activeTab === 'adult-drinks' && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-grape-purple/10 to-candy-pink/10 rounded-3xl p-8 max-w-3xl mx-auto border border-grape-purple/20">
              <h3 className="text-2xl font-display font-bold text-grape-purple mb-4">
                🍹 Jolly Rancher Flavors Available:
              </h3>
              <p className="text-grape-purple/80 font-body text-lg">
                Blue Raspberry • Green Apple • Grape • Watermelon • Cherry
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
