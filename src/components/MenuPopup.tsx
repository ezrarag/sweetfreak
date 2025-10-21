'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Apple, Grape, Cherry, Droplets, Banana, Citrus, Heart, ShoppingCart, Plus } from 'lucide-react';
import { candiedFruits, adultDrinks } from '@/data/products';
import CheckoutPopup from './CheckoutPopup';
import Button from './ui/Button';
import { scaleIn, buttonHover } from '@/lib/motionPresets';

interface MenuPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

export default function MenuPopup({ isOpen, onClose }: MenuPopupProps) {
  const [activeTab, setActiveTab] = useState<'candied-fruits' | 'adult-drinks'>('candied-fruits');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

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
    return <IconComponent size={48} />;
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

  const getProductImage = (productId: string) => {
    // Placeholder images - you can replace these with actual product images
    const imageMap: { [key: string]: string } = {
      strawberry: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop&crop=center',
      grapes: 'https://images.unsplash.com/photo-1537640538966-79f369143b8f?w=400&h=400&fit=crop&crop=center',
      banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop&crop=center',
      orange: 'https://images.unsplash.com/photo-1557800634-7bf3c73be389?w=400&h=400&fit=crop&crop=center',
      'berry-freaky': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center',
      'gag-green-apple': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop&crop=center',
      'gut-gushing-grape': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center',
      'mouth-water-melons': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center',
      'cherry-bust': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center',
    };
    return imageMap[productId] || 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=400&fit=crop&crop=center';
  };

  const addToCart = (product: { id: string; name: string; price?: string }) => {
    if (!product.price) return; // Skip if no price
    
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: getProductImage(product.id)
      }]);
    }
  };

  const currentProducts = activeTab === 'candied-fruits' ? candiedFruits : adultDrinks;

  // ProductCard Component
  const ProductCard = ({ product, index }: { product: typeof candiedFruits[0]; index: number }) => (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-[0_0_20px_-5px_rgba(155,53,255,0.2)] hover:scale-102 hover:ring-2 hover:ring-candy-pink/50 transition-all duration-300"
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden rounded-xl mb-4">
        <img
          src={getProductImage(product.id)}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Add to Cart Button */}
        <motion.button
          whileHover={buttonHover.hover}
          whileTap={buttonHover.tap}
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 hover:text-candy-pink transition-all duration-300 rounded-full p-3 opacity-0 group-hover:opacity-100"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-accent font-semibold uppercase ${
            activeTab === 'candied-fruits' 
              ? 'bg-candy-pink/20 text-candy-pink' 
              : 'bg-grape-purple/20 text-grape-purple'
          }`}>
            {activeTab === 'candied-fruits' ? 'Candied Fruit' : 'Adult Drink'}
          </span>
          <div className={`${getColor(product.id)}`}>
            {getIcon(product.id)}
          </div>
        </div>

        <h3 className="text-xl font-display font-bold text-white tracking-tight">
          {product.name}
        </h3>
        
        <p className="text-sm font-body text-white/80 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-display font-bold text-candy-pink">
            {product.price}
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={() => addToCart(product)}
            className="px-4 py-2"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 backdrop-blur-xl bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative w-full h-full max-w-7xl max-h-[95vh] overflow-hidden rounded-3xl shadow-[0_0_40px_-5px_rgba(255,79,154,0.3)]"
            style={{
              background: 'linear-gradient(#141414, #141414), linear-gradient(90deg, #FF4F9A, #9B35FF)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'content-box, border-box',
              border: '1px solid transparent'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Radial Background Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#FF4F9A22,_#9B35FF11,_transparent_70%)]" />
            
            {/* Header */}
            <div className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
              <div className="flex items-center justify-between p-6">
                {/* Tab Navigation */}
                <div className="flex bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/20">
                  <motion.button
                    onClick={() => setActiveTab('candied-fruits')}
                    className={`px-6 py-3 rounded-full font-body font-semibold text-sm transition-all ${
                      activeTab === 'candied-fruits'
                        ? 'bg-sweet-gradient text-white shadow-lg'
                        : 'bg-transparent text-white/70 hover:text-white'
                    }`}
                    layout
                  >
                    Candied Fruits
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('adult-drinks')}
                    className={`px-6 py-3 rounded-full font-body font-semibold text-sm transition-all ${
                      activeTab === 'adult-drinks'
                        ? 'bg-sweet-gradient text-white shadow-lg'
                        : 'bg-transparent text-white/70 hover:text-white'
                    }`}
                    layout
                  >
                    Adult Drinks
                  </motion.button>
                </div>

                {/* Right Side Controls */}
                <div className="flex items-center gap-4">
                  {/* Cart Button */}
                  <motion.button
                    whileHover={buttonHover.hover}
                    whileTap={buttonHover.tap}
                    onClick={() => setShowCheckout(true)}
                    className="relative bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 rounded-full p-3"
                  >
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-candy-pink text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-body font-semibold">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </motion.button>
                  
                  {/* Close Button */}
                  <motion.button
                    whileHover={buttonHover.hover}
                    whileTap={buttonHover.tap}
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X size={32} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 pt-8 pb-8 px-8 h-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Checkout Popup */}
      <CheckoutPopup 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)}
        cart={cart}
        onUpdateCart={setCart}
      />
    </AnimatePresence>
  );
}