'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Plus, Minus, CreditCard, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CheckoutPopupProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateCart: (cart: CartItem[]) => void;
}

export default function CheckoutPopup({ isOpen, onClose, cart, onUpdateCart }: CheckoutPopupProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      const newCart = cart.filter(item => item.id !== productId);
      onUpdateCart(newCart);
    } else {
      const newCart = cart.map(item => 
        item.id === productId 
          ? { ...item, quantity }
          : item
      );
      onUpdateCart(newCart);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate Stripe checkout process
    setTimeout(() => {
      alert('Payment processed successfully! Thank you for your order.');
      onUpdateCart([]);
      onClose();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl w-full h-full max-w-6xl max-h-[95vh] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
              <div className="flex items-center justify-between p-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                    <span className="text-pink-600">Checkout</span>
                  </h2>
                  <p className="text-xl text-gray-600 mt-2">Review your order and complete payment</p>
                </div>
                
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={32} />
                </button>
              </div>
            </div>

            <div className="pt-24 h-full overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Order Summary */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Order Summary
                  </h3>
                  
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                              {item.name}
                            </h4>
                            <p className="text-gray-600">{item.price}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition-colors"
                            >
                              <Minus size={16} />
                            </motion.button>
                            
                            <span className="w-8 text-center font-bold">{item.quantity}</span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 transition-colors"
                            >
                              <Plus size={16} />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Payment Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                    Payment Details
                  </h3>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax:</span>
                        <span className="font-bold">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-gray-900">Total:</span>
                          <span className="text-2xl font-bold text-pink-600">
                            ${(getTotalPrice() * 1.08).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={cart.length === 0 || isProcessing}
                    className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      cart.length === 0 || isProcessing
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        Pay ${(getTotalPrice() * 1.08).toFixed(2)}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
