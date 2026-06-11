'use client'
import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === item.id)
      return {
        items: existing
          ? s.items.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          : [...s.items, { ...item, quantity: 1 }],
        // Open the drawer only on the first item so rapid multi-adds from the
        // menu aren't interrupted; the nav badge animates on every add.
        isOpen: s.items.length === 0 ? true : s.isOpen,
      }
    }),

  removeItem: (id) =>
    set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

  updateQty: (id, qty) =>
    set((s) => ({
      items:
        qty <= 0
          ? s.items.filter((i) => i.id !== id)
          : s.items.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    })),

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
