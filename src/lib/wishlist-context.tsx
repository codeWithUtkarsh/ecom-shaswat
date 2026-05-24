'use client';

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Product, WishlistItem } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';

interface WishlistContextType {
  items: WishlistItem[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function toWishlistItem(serverItem: any): WishlistItem {
  return {
    wishlistItemId: serverItem.id,
    product: serverItem.product,
  };
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const lastUserId = useRef<string | null>(null);

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
        const guestItems = items.filter((i) => !i.wishlistItemId);
        for (const g of guestItems) {
          try {
            await api.wishlist.add(g.product.id);
          } catch (err: any) {
            if (!String(err?.message).toLowerCase().includes('already in wishlist')) {
              console.error('Failed to merge guest wishlist item', g.product.id, err);
            }
          }
        }
        const { items: serverItems } = await api.wishlist.list();
        if (cancelled) return;
        setItems(serverItems.map(toWishlistItem));
      } catch (err) {
        console.error('Failed to load wishlist', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  const isWishlisted = (productId: string) =>
    items.some((i) => i.product.id === productId);

  const addToWishlist = async (product: Product) => {
    if (!user) {
      setItems((prev) => {
        if (prev.some((i) => i.product.id === product.id)) return prev;
        return [...prev, { product }];
      });
      return;
    }

    try {
      const { item } = await api.wishlist.add(product.id);
      const newItem = toWishlistItem(item);
      setItems((prev) => {
        if (prev.some((i) => i.product.id === product.id)) return prev;
        return [...prev, newItem];
      });
    } catch (err) {
      console.error('Failed to add to wishlist', err);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    const target = items.find((i) => i.product.id === productId);
    if (!target) return;

    if (user && target.wishlistItemId) {
      try {
        await api.wishlist.remove(target.wishlistItemId);
      } catch (err) {
        console.error('Failed to remove from wishlist', err);
        return;
      }
    }
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    if (isWishlisted(product.id)) {
      void removeFromWishlist(product.id);
    } else {
      void addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ items, isWishlisted, toggleWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
