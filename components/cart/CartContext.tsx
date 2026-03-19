'use client'

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { Product, Packaging } from '@/lib/products'

export interface CartItem {
  product: Product
  packaging: Packaging
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; packaging: Packaging }
  | { type: 'REMOVE_ITEM'; productId: string; packaging: Packaging }
  | { type: 'UPDATE_QTY'; productId: string; packaging: Packaging; quantity: number }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return { ...state, items: action.items }

    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (i) => i.product.id === action.product.id && i.packaging === action.packaging
      )
      if (existingIndex >= 0) {
        const updated = [...state.items]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        }
        return { ...state, items: updated }
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, packaging: action.packaging, quantity: 1 }],
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.product.id === action.productId && i.packaging === action.packaging)
        ),
      }

    case 'UPDATE_QTY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.product.id === action.productId && i.packaging === action.packaging)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId && i.packaging === action.packaging
            ? { ...i, quantity: action.quantity }
            : i
        ),
      }
    }

    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }

    case 'OPEN_CART':
      return { ...state, isOpen: true }

    case 'CLOSE_CART':
      return { ...state, isOpen: false }

    default:
      return state
  }
}

interface CartContextValue {
  state: CartState
  addItem: (product: Product, packaging: Packaging) => void
  removeItem: (productId: string, packaging: Packaging) => void
  updateQty: (productId: string, packaging: Packaging, quantity: number) => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

const FREE_SHIPPING_THRESHOLD = 999

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })
  const [mounted, setMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem('tokuha-cart')
      if (stored) {
        const items = JSON.parse(stored) as CartItem[]
        dispatch({ type: 'LOAD_CART', items })
      }
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tokuha-cart', JSON.stringify(state.items))
    }
  }, [state.items, mounted])

  const addItem = (product: Product, packaging: Packaging) =>
    dispatch({ type: 'ADD_ITEM', product, packaging })

  const removeItem = (productId: string, packaging: Packaging) =>
    dispatch({ type: 'REMOVE_ITEM', productId, packaging })

  const updateQty = (productId: string, packaging: Packaging, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', productId, packaging, quantity })

  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' })
  const openCart = () => dispatch({ type: 'OPEN_CART' })
  const closeCart = () => dispatch({ type: 'CLOSE_CART' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => {
    const price = i.packaging === 'tin' ? i.product.price.tin : (i.product.price.pouch ?? i.product.price.tin)
    return sum + price * i.quantity
  }, 0)

  return (
    <CartContext.Provider
      value={{ state, addItem, removeItem, updateQty, toggleCart, openCart, closeCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export { FREE_SHIPPING_THRESHOLD }
