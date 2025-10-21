'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Apple, Grape, Cherry, Droplets, Banana, Citrus, Heart, ShoppingCart, Plus } from 'lucide-react';
import { candiedFruits, adultDrinks } from '@/data/products';
import CheckoutPopup from './CheckoutPopup';

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

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const currentProducts = activeTab === 'candied-fruits' ? candiedFruits : adultDrinks;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-transparent backdrop-blur-sm rounded-3xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden relative border-2 border-orange-400"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-transparent backdrop-blur-sm border-b border-orange-400">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                    <span className="text-pink-600">Our</span>
                    <span className="text-purple-600"> Menu</span>
                  </h2>
                  <p className="text-xl text-white mt-2">Premium candied fruits & adult drinks</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowCheckout(true)}
                    className="relative bg-transparent border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 rounded-full p-3"
                  >
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    )}
                  </motion.button>
                  
                  {/* Close Button */}
                  <button
                    onClick={onClose}
                    className="text-white hover:text-orange-300 transition-colors"
                  >
                    <X size={32} />
                  </button>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex justify-center pb-6">
                <div className="bg-transparent backdrop-blur-sm border-2 border-orange-400 rounded-full p-2">
                  <button
                    onClick={() => setActiveTab('candied-fruits')}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                      activeTab === 'candied-fruits'
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'text-white hover:text-pink-300'
                    }`}
                  >
                    Candied Fruits
                  </button>
                  <button
                    onClick={() => setActiveTab('adult-drinks')}
                    className={`px-8 py-3 rounded-full font-bold text-lg transition-all ${
                      activeTab === 'adult-drinks'
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'text-white hover:text-purple-300'
                    }`}
                  >
                    Adult Drinks
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="pt-48 pb-8 px-8 h-full overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={getProductImage(product.id)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Add to Cart Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product)}
                        className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 hover:text-pink-600 transition-all duration-300 rounded-full p-3 opacity-0 group-hover:opacity-100"
                      >
                        <Plus size={20} />
                      </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          activeTab === 'candied-fruits' 
                            ? 'bg-pink-100 text-pink-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {activeTab === 'candied-fruits' ? 'Candied Fruit' : 'Adult Drink'}
                        </span>
                        <div className={`${getColor(product.id)}`}>
                          {getIcon(product.id)}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {product.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                          {product.price}
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToCart(product)}
                          className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 border-2 ${
                            activeTab === 'candied-fruits'
                              ? 'bg-transparent border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
                              : 'bg-transparent border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
                          }`}
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
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
