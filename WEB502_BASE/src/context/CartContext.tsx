import React, { createContext, useState, ReactNode } from 'react';

// Định nghĩa cấu trúc một sản phẩm trong giỏ
interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

// Định nghĩa những gì Context sẽ cung cấp
interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, newQuantity: number) => void;
}

// Tạo Context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Tạo Provider (nhà cung cấp)
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCartItems(prevItems => {
            const itemInCart = prevItems.find(item => item.id === product.id);
            if (itemInCart) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        alert('Đã thêm sản phẩm vào giỏ hàng!');
    };

    const removeFromCart = (productId: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            // Nếu số lượng là 0 hoặc ít hơn, xóa sản phẩm khỏi giỏ
            removeFromCart(productId);
        } else {
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );
};