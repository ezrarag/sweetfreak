'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'sweetfreak-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    try {
      return JSON.parse(stored) as CartItem[];
    } catch (error) {
      console.error('Failed to restore cart:', error);
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: CartItem) => {
      setItems((current) => {
        const existing = current.find((entry) => entry.productId === item.productId);

        if (existing) {
          return current.map((entry) =>
            entry.productId === item.productId
              ? { ...entry, quantity: entry.quantity + item.quantity }
              : entry
          );
        }

        return [...current, item];
      });
    };

    const removeItem = (productId: string) => {
      setItems((current) => current.filter((entry) => entry.productId !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
      setItems((current) =>
        current
          .map((entry) => (entry.productId === productId ? { ...entry, quantity } : entry))
          .filter((entry) => entry.quantity > 0)
      );
    };

    const clearCart = () => setItems([]);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error('useCart must be used within CartProvider.');
  }

  return value;
};
