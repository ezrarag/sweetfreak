'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X, Heart, Grape, Banana, Citrus, Droplets, Apple, Cherry, ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { fadeInUp, scaleIn, float } from '@/lib/motionPresets';

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
    <div className="relative h-screen overflow-hidden noise-overlay">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/readyaimgo-clients-temp.firebasestorage.app/o/sweetfreaks%2Fsweetfreaks-image-green-1.png?alt=media&token=e75629fd-5acb-44af-8502-5f1218d0f8d1')`
        }}
      />
      
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>

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

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3 btn-shadow"
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
          className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3 btn-shadow"
        >
          <ShoppingCart size={24} />
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Product Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              {/* Product Icon */}
              <div className="mb-12">
                <div className="bg-white/20 backdrop-blur-sm rounded-full w-40 h-40 flex items-center justify-center mx-auto border-2 border-white/30 shadow-2xl">
                  <currentItem.icon size={80} className="text-white" />
                </div>
              </div>

              {/* Product Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <span className={`px-6 py-3 rounded-full text-sm font-accent font-semibold ${
                    currentItem.category === 'candy' 
                      ? 'bg-candy-pink/80 text-white' 
                      : 'bg-grape-purple/80 text-white'
                  }`}>
                    {currentItem.category === 'candy' ? 'Candied Fruit' : 'Adult Drink'}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-3 btn-shadow"
                    onClick={() => handleAddToCart(currentItem)}
                  >
                    <ShoppingCart size={20} />
                  </motion.button>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6">
                  {currentItem.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto font-body">
                  {currentItem.description}
                </p>
                
                <div className="text-4xl md:text-5xl font-display font-bold text-sweet-gradient mb-8">
                  ${currentItem.price}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Navigation Arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-4 btn-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronLeft size={28} />
      </motion.button>
      
      <motion.button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/30 transition-all duration-300 rounded-full p-4 btn-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronRight size={28} />
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-4">
          {galleryItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
