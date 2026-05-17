'use client'

import Image from 'next/image'
import { IconMinus, IconPlus, IconTrash } from '@tabler/icons-react'
import { useCart } from './CartContext'
import { useCartModal } from './CartModalContext'
import { CartEntry } from '@/types'

interface CartItemCardProps {
  entry: CartEntry
  index: number
}

const CartItemCard = ({ entry, index }: CartItemCardProps) => {
  const { updateCartItem, removeCartItem } = useCart()
  const { openModal } = useCartModal()

  const subtotal = (entry.item.price + (entry.variantPrice ?? 0)) * entry.quantity
  const minOrder = entry.item.minOrder ?? 1

  const decrement = () => {
    if (entry.quantity <= minOrder) {
      removeCartItem(index)
    } else {
      updateCartItem(index, { ...entry, quantity: entry.quantity - 1 })
    }
  }

  const increment = () => {
    updateCartItem(index, { ...entry, quantity: entry.quantity + 1 })
  }

  return (
    <div className="flex w-full group">

      {/* Image */}
      <div className="relative min-w-16 w-16 min-h-16 h-16 flex-shrink-0">
        <div
          className="absolute inset-0 bg-zinc-100 opacity-50"
          style={{
            backgroundImage: "url('/diagonal_lines.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px',
          }}
        />
        <Image
          src={entry.item.imgUrl}
          alt={entry.item.name}
          width={200}
          height={200}
          className="w-full h-full object-cover shadow-sm"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between flex-1 min-w-0 px-3 py-1.5 bg-zinc-50 shadow-sm">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-800 capitalize truncate leading-tight">
            {entry.item.name}
          </p>
          {entry.variantLabel && (
            <p className="text-xs text-zinc-400 truncate mt-0.5">{entry.variantLabel}</p>
          )}
        </div>

        {/* Qty controls + subtotal */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-center gap-1">
            <button
              onClick={decrement}
              className="w-5 h-5 flex items-center justify-center border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-600"
            >
              {entry.quantity <= minOrder
                ? <IconTrash className="size-3 text-rose-500" />
                : <IconMinus className="size-3" />
              }
            </button>
            <span className="w-6 text-center text-xs font-semibold text-zinc-800">
              {entry.quantity}
            </span>
            <button
              onClick={increment}
              className="w-5 h-5 flex items-center justify-center border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 transition-colors text-zinc-600"
            >
              <IconPlus className="size-3" />
            </button>
          </div>

          <p className="text-sm font-bold text-zinc-900">
            Rp {subtotal.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Edit button — visible on hover */}
      <button
        onClick={() => openModal(entry.item, 'edit', index)}
        className="w-0 overflow-hidden group-hover:w-8 transition-all duration-150 flex items-center justify-center bg-zinc-100 hover:bg-zinc-200 border-l border-zinc-200 text-zinc-500 hover:text-zinc-800 flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      </button>

    </div>
  )
}

export default CartItemCard