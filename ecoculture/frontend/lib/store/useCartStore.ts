import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/data/products";

export interface CartItem extends Product {
  qty: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, delta: number) => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find((i) => i.id === product.id);

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === product.id ? { ...i, qty: i.qty + quantity } : i
            ),
          });
        } else {
          set({ items: [...items, { ...product, qty: quantity }] });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((i) => i.id !== productId),
        });
      },

      updateQty: (productId, delta) => {
        set({
          items: get().items.map((i) => {
            if (i.id === productId) {
              const newQty = Math.max(1, i.qty + delta);
              return { ...i, qty: newQty };
            }
            return i;
          }),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      setCartOpen: (isOpen) => {
        set({ isCartOpen: isOpen });
      },
    }),
    {
      name: "ecoculture-cart", // Key used in local storage
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
    }
  )
);
