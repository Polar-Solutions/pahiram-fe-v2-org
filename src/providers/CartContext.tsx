'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { IItem } from '../lib/interfaces';

interface CartContextType {
    cartItems: IItem[];
    addItemToCart: (item: IItem) => void;
    removeItem: (itemId: string) => void; 
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<IItem[]>([]);

     // Load cart items from localStorage on initial render
     useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    // Update localStorage whenever the cartItems state changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);
  
    const addItemToCart = (item: IItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeItem = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addItemToCart, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
