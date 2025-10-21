'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, Heart, Grape, Banana, Citrus, Droplets, Apple, Cherry } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 'strawberry-candy',
    title: 'Candied Strawberries',
    description: 'Fresh strawberries with our signature candy coating',
    icon: Heart,
    color: 'text-red-500',
  },
  {
    id: 'grape-candy',
    title: 'Candied Grapes',
    description: 'Juicy grapes with crunchy candy shell',
    icon: Grape,
    color: 'text-purple-500',
  },
  {
    id: 'banana-candy',
    title: 'Candied Bananas',
    description: 'Sweet banana slices with candy glaze',
    icon: Banana,
    color: 'text-yellow-500',
  },
  {
    id: 'orange-candy',
    title: 'Candied Orange Slices',
    description: 'Tangy orange slices with sweet finish',
    icon: Citrus,
    color: 'text-orange-500',
  },
  {
    id: 'berry-drink',
    title: 'Berry Freaky Cocktail',
    description: 'Blue Raspberry Jolly Rancher cocktail',
    icon: Droplets,
    color: 'text-blue-500',
  },
  {
    id: 'apple-drink',
    title: 'Gag\'n Green Apple',
    description: 'Green Apple Jolly Rancher cocktail',
    icon: Apple,
    color: 'text-green-500',
  },
  {
    id: 'grape-drink',
    title: 'Gut Gushing Grape',
    description: 'Grape Jolly Rancher cocktail',
    icon: Grape,
    color: 'text-purple-500',
  },
  {
    id: 'watermelon-drink',
    title: 'Mouth Water fa Melons',
    description: 'Watermelon Jolly Rancher cocktail',
    icon: Droplets,
    color: 'text-pink-500',
  },
  {
    id: 'cherry-drink',
    title: 'Cherry Bust',
    description: 'Cherry Jolly Rancher cocktail',
    icon: Cherry,
    color: 'text-red-500',
  },
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
            <span className="text-pink-500 bubble-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-700">See our delicious creations</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
              onClick={() => setSelectedItem(item)}
            >
              <div className="text-center">
                <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className={item.color} />
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-xs">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for actual images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              📸 Product Photos Coming Soon!
            </h3>
            <p className="text-gray-600">
              We're working on capturing beautiful photos of our candied fruits and adult drinks. 
              Check back soon for mouth-watering visuals!
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <selectedItem.icon size={40} className={selectedItem.color} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedItem.title}
              </h3>
              
              <p className="text-gray-600 mb-6">
                {selectedItem.description}
              </p>
              
              <div className="bg-gray-100 rounded-2xl p-8 mb-6">
                <p className="text-gray-500 text-sm">
                  📷 Product photo placeholder
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
              >
                Order This Item
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
