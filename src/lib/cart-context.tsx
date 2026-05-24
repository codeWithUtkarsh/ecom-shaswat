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
  /**
   * Submits a quote request for every cart item with price === 0,
   * sharing the given message across the batch. Each item becomes its own
   * quote_requests row server-side. Successfully-submitted items are
   * removed from the cart.
   *
   * Returns { submitted, failed } counts so the caller can show feedback.
   */
  submitQuoteRequest: (message: string) => Promise<{ submitted: number; failed: number }>;
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
  // Debounced quantity-sync state: per-product timers + pending target values.
  // Rapid +/− clicks update local state immediately and queue one server call.
  const pendingTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const pendingValues = useRef<Map<string, { cartItemId: string; quantity: number }>>(new Map());

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

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      void removeFromCart(productId);
      return;
    }
    const target = items.find((i) => i.product.id === productId);
    if (!target) return;

    // 1. Optimistic local update — UI reflects the new quantity immediately.
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    // 2. Debounced server sync for signed-in users. Rapid clicks reset the
    //    timer so we only send one PATCH with the final value (~400ms after
    //    the last click). Guests have no server cart, so we skip.
    if (!user || !target.cartItemId) return;

    pendingValues.current.set(productId, {
      cartItemId: target.cartItemId,
      quantity,
    });

    const existing = pendingTimers.current.get(productId);
    if (existing) clearTimeout(existing);

    pendingTimers.current.set(
      productId,
      setTimeout(async () => {
        const pending = pendingValues.current.get(productId);
        if (!pending) return;
        pendingValues.current.delete(productId);
        pendingTimers.current.delete(productId);
        try {
          await api.cart.update(pending.cartItemId, pending.quantity);
        } catch (err) {
          console.error('Failed to sync cart quantity', err);
        }
      }, 400)
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

  const submitQuoteRequest = async (message: string) => {
    const quoteItems = items.filter((i) => i.product.price === 0);
    if (quoteItems.length === 0) return { submitted: 0, failed: 0 };

    // ONE batched POST → ONE row of N items on the server → ONE email each
    // direction. All-or-nothing: if validation fails for any product, nothing
    // is inserted and nothing is removed from cart.
    try {
      await api.quoteRequests.createBatch({
        items: quoteItems.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
        message: message.trim() || undefined,
      });
      for (const item of quoteItems) {
        await removeFromCart(item.product.id);
      }
      return { submitted: quoteItems.length, failed: 0 };
    } catch (err) {
      console.error('Failed to submit quote batch', err);
      return { submitted: 0, failed: quoteItems.length };
    }
  };

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
        submitQuoteRequest,
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
