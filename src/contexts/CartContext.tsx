'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '@/types';
import { cartStorage } from '@/lib/storage';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  isInCart: (itemId: string, type: 'product' | 'service') => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from storage utility on mount
    const storedCart = cartStorage.get();
    setItems(storedCart);
  }, []);

  useEffect(() => {
    // Save cart to storage utility whenever it changes
    cartStorage.set(items);
  }, [items]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        cartItem => cartItem.itemId === item.itemId && cartItem.type === item.type
      );

      if (existingItem) {
        // Update quantity if item exists
        return prevItems.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item with unique ID
        const newItem: CartItem = {
          ...item,
          id: `${item.type}-${item.itemId}-${Date.now()}`
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = (): number => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = (): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (itemId: string, type: 'product' | 'service'): boolean => {
    return items.some(item => item.itemId === itemId && item.type === type);
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
