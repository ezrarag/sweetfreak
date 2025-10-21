'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Heart, Grape, Banana, Citrus, Droplets, Apple, Cherry, ShoppingCart, Plus, Minus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  color: string;
  price: number;
  category: 'candy' | 'drink';
}

const galleryItems: GalleryItem[] = [
  {
    id: 'strawberry-candy',
    title: 'Candied Strawberries',
    description: 'Fresh strawberries with our signature candy coating',
    icon: Heart,
    color: 'text-red-500',
    price: 8,
    category: 'candy',
  },
  {
    id: 'grape-candy',
    title: 'Candied Grapes',
    description: 'Juicy grapes with crunchy candy shell',
    icon: Grape,
    color: 'text-purple-500',
    price: 7,
    category: 'candy',
  },
  {
    id: 'banana-candy',
    title: 'Candied Bananas',
    description: 'Sweet banana slices with candy glaze',
    icon: Banana,
    color: 'text-yellow-500',
    price: 6,
    category: 'candy',
  },
  {
    id: 'orange-candy',
    title: 'Candied Orange Slices',
    description: 'Tangy orange slices with sweet finish',
    icon: Citrus,
    color: 'text-orange-500',
    price: 7,
    category: 'candy',
  },
  {
    id: 'berry-drink',
    title: 'Berry Freaky Cocktail',
    description: 'Blue Raspberry Jolly Rancher cocktail',
    icon: Droplets,
    color: 'text-blue-500',
    price: 12,
    category: 'drink',
  },
  {
    id: 'apple-drink',
    title: 'Gag&apos;n Green Apple',
    description: 'Green Apple Jolly Rancher cocktail',
    icon: Apple,
    color: 'text-green-500',
    price: 12,
    category: 'drink',
  },
  {
    id: 'grape-drink',
    title: 'Gut Gushing Grape',
    description: 'Grape Jolly Rancher cocktail',
    icon: Grape,
    color: 'text-purple-500',
    price: 12,
    category: 'drink',
  },
  {
    id: 'watermelon-drink',
    title: 'Mouth Water fa Melons',
    description: 'Watermelon Jolly Rancher cocktail',
    icon: Droplets,
    color: 'text-pink-500',
    price: 12,
    category: 'drink',
  },
  {
    id: 'cherry-drink',
    title: 'Cherry Bust',
    description: 'Cherry Jolly Rancher cocktail',
    icon: Cherry,
    color: 'text-red-500',
    price: 12,
    category: 'drink',
  },
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const handleAddToCart = (item: GalleryItem) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', item);
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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              <span className="text-pink-600">Gallery</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most loved candied fruits and adult drinks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div className={`${item.color} opacity-20`}>
                    <item.icon size={64} />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.category === 'candy' 
                        ? 'bg-pink-100 text-pink-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.category === 'candy' ? 'Candied Fruit' : 'Adult Drink'}
                    </span>
                    <div className={`${item.color}`}>
                      <item.icon size={24} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                      ${item.price}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(item)}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full font-semibold text-sm transition-colors duration-200 flex items-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200"
            >
              View All Products
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <div className={`${selectedItem.color} opacity-20`}>
                  <selectedItem.icon size={80} />
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedItem.category === 'candy' 
                    ? 'bg-pink-100 text-pink-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {selectedItem.category === 'candy' ? 'Candied Fruit' : 'Adult Drink'}
                </span>
                <div className={`${selectedItem.color}`}>
                  <selectedItem.icon size={24} />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {selectedItem.title}
              </h3>
              
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                {selectedItem.description}
              </p>
              
              <div className="text-4xl font-bold text-gray-900 mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                ${selectedItem.price}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(selectedItem)}
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200 flex items-center gap-3 mx-auto"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
