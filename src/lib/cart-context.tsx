'use client';

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function toCartItem(serverItem: any): CartItem {
  return {
    cartItemId: serverItem.id,
    quantity: serverItem.quantity,
    product: serverItem.product,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const lastUserId = useRef<string | null>(null);

  // Sync with server on login; clear on logout.
  useEffect(() => {
    const currentUserId = user?.id ?? null;
    if (currentUserId === lastUserId.current) return;
    lastUserId.current = currentUserId;

    if (!currentUserId) {
      setItems([]);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const guestItems = items.filter((i) => !i.cartItemId);
        for (const g of guestItems) {
          try {
            await api.cart.add(g.product.id, g.quantity);
          } catch (err) {
            console.error('Failed to merge guest cart item', g.product.id, err);
          }
        }
        const { items: serverItems } = await api.cart.list();
        if (cancelled) return;
        setItems(serverItems.map(toCartItem));
      } catch (err) {
        console.error('Failed to load server cart', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const addToCart = async (product: Product) => {
    if (!user) {
      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
      return;
    }

    try {
      const { item } = await api.cart.add(product.id, 1);
      const newItem = toCartItem(item);
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.product.id === product.id);
        if (idx === -1) return [...prev, newItem];
        const copy = [...prev];
        copy[idx] = newItem;
        return copy;
      });
    } catch (err) {
      console.error('Failed to add to cart', err);
    }
  };

  const removeFromCart = async (productId: string) => {
    const target = items.find((i) => i.product.id === productId);
    if (!target) return;

    if (user && target.cartItemId) {
      try {
        await api.cart.remove(target.cartItemId);
      } catch (err) {
        console.error('Failed to remove from cart', err);
        return;
      }
    }
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    const target = items.find((i) => i.product.id === productId);
    if (!target) return;

    if (user && target.cartItemId) {
      try {
        const { item } = await api.cart.update(target.cartItemId, quantity);
        const updated = toCartItem(item);
        setItems((prev) => prev.map((i) => (i.product.id === productId ? updated : i)));
        return;
      } catch (err) {
        console.error('Failed to update cart quantity', err);
        return;
      }
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = async () => {
    if (user) {
      try {
        await api.cart.clear();
      } catch (err) {
        console.error('Failed to clear server cart', err);
        return;
      }
    }
    setItems([]);
  };

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);

  const getTotalPrice = () =>
    items.reduce((sum, item) => sum + (item.product.price ?? 0) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
