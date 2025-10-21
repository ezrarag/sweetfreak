'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Heart, Grape, Banana, Citrus, Droplets, Apple, Cherry, ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleAddToCart = (item: GalleryItem) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', item);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentItem = galleryItems[currentIndex];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/sweetfreaks%2Fsweetfreaks-image-green-1.png?alt=media&token=e75629fd-5acb-44af-8502-5f1218d0f8d1')`
        }}
      />
      
      {/* Overlay with transparency */}
      <div className="absolute inset-0 bg-[#FAF5FE] opacity-75"></div>

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

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3"
          >
            <ArrowLeft size={24} />
          </motion.button>
        </Link>
      </div>

      {/* Cart Button */}
      <div className="absolute top-6 right-6 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3"
        >
          <ShoppingCart size={24} />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Product Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              {/* Product Icon */}
              <div className="mb-8">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center mx-auto border-2 border-white/30">
                  <currentItem.icon size={64} className="text-white" />
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    currentItem.category === 'candy' 
                      ? 'bg-pink-500/80 text-white' 
                      : 'bg-blue-500/80 text-white'
                  }`}>
                    {currentItem.category === 'candy' ? 'Candied Fruit' : 'Adult Drink'}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  {currentItem.title}
                </h1>
                
                <p className="text-xl text-white/90 mb-6 leading-relaxed max-w-2xl mx-auto">
                  {currentItem.description}
                </p>
                
                <div className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                  ${currentItem.price}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Button */}
          <div className="flex justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToCart(currentItem)}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {galleryItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
