'use client'

import { useCart } from './CartContext'
import { useCartModal } from './CartModalContext'
import { useEffect, useState } from 'react'
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react"

const CartModal = () => {
  const { isOpen, selectedItem, mode, closeModal, editIndex } = useCartModal()
  const { addToCart, updateCartItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!selectedItem) return;
    if (selectedItem.variants) {
      const defaultOptions: Record<string, string> = {}
      selectedItem.variants.forEach(variant => {
        defaultOptions[variant.name] = variant.options[0]?.label || ''
      })
      setSelectedOptions(defaultOptions)
    }
    setQuantity(selectedItem.minOrder ?? 1)
  }, [selectedItem])

  if (!isOpen || !selectedItem) return null

  const handleSubmit = () => {
    const variantStrings = Object.entries(selectedOptions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, label]) => {
        const variant = selectedItem.variants?.find(v => v.name === name)
        const option = variant?.options.find(opt => opt.label === label)
        return option?.label || label
      })
      .filter(Boolean)

    const variantLabel = variantStrings.join(' | ')

    let variantPrice = 0
    selectedItem.variants?.forEach((variant) => {
      const selectedLabel = selectedOptions[variant.name]
      const foundOption = variant.options.find((opt) => opt.label === selectedLabel)
      if (foundOption) variantPrice += foundOption.price
    })

    const cartEntry = {
      item: selectedItem,
      quantity,
      variantLabel: variantLabel || undefined,
      variantPrice: variantPrice || 0,
      selectedVariants: selectedOptions,
    }

    if (mode === 'edit' && editIndex !== null) {
      updateCartItem(editIndex, cartEntry)
    } else {
      addToCart(cartEntry)
    }

    closeModal()
  }

  let variantPrice = 0
  selectedItem.variants?.forEach((variant) => {
    const selectedLabel = selectedOptions[variant.name]
    const foundOption = variant.options.find((opt) => opt.label === selectedLabel)
    if (foundOption) variantPrice += foundOption.price
  })
  const totalPrice = (selectedItem.price + variantPrice) * quantity

  return (
    <div
      className="fixed inset-0 bg-zinc-700/50 z-100 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div className="w-full max-w-sm shadow-lg border border-zinc-300/30">

        <div className="bg-zinc-100 w-full p-4 py-6">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 capitalize leading-tight">
                {selectedItem.name}
              </h3>
              <p className="text-sm text-zinc-500 capitalize">
                {selectedItem.category?.name || 'Uncategorized'}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="p-1 hover:bg-zinc-200 transition-colors"
            >
              <IconX className="size-4 text-zinc-500" />
            </button>
          </div>
          <p className="text-xl font-bold text-zinc-900 mt-2">
            Rp {selectedItem.price.toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-50 p-4 pb-0 space-y-4">

          {selectedItem.variants && selectedItem.variants.length > 0 && (
            <div className="space-y-3">
              {selectedItem.variants.map((variant, idx) => (
                <div key={idx}>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
                    {variant.name}
                  </label>
                  <select
                    value={selectedOptions[variant.name]}
                    onChange={(e) =>
                      setSelectedOptions(prev => ({ ...prev, [variant.name]: e.target.value }))
                    }
                    className="w-full border border-zinc-300 bg-zinc-100 p-2 text-sm text-zinc-800 focus:outline-none focus:border-zinc-500"
                  >
                    {variant.options.map((option, oidx) => (
                      <option key={oidx} value={option.label}>
                        {option.label} {option.price > 0 ? `+Rp ${option.price.toLocaleString()}` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1">
              Quantity
            </label>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setQuantity(prev => Math.max(selectedItem.minOrder || 1, prev - 1))}
                disabled={quantity <= (selectedItem.minOrder || 1)}
                className="min-w-9 w-9 min-h-9 h-9 flex items-center justify-center border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <IconMinus className="size-4" />
              </button>
              <input
                type="number"
                min={selectedItem.minOrder || 1}
                value={quantity}
                onChange={(e) => {
                  const q = parseInt(e.target.value) || selectedItem.minOrder || 1
                  setQuantity(Math.max(selectedItem.minOrder || 1, q))
                }}
                className="w-16 h-9 text-center border border-zinc-300 bg-zinc-100 text-sm font-medium focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="min-w-9 w-9 min-h-9 h-9 flex items-center justify-center border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 transition-colors"
              >
                <IconPlus className="size-4" />
              </button>
            </div>
          </div>

          {/* Total — bottom of body, owns bg-zinc-50, separated by border */}
          <div className="flex items-center justify-between border-t border-zinc-200 py-3">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Total</span>
            <span className="text-xl font-bold text-zinc-900">Rp {totalPrice.toLocaleString()}</span>
          </div>

        </div>

        {/* Footer — transparent diagonal bg, buttons only */}
        <div className="relative flex items-center justify-end gap-2 border-t border-zinc-300 p-4">
          <div
            className="absolute inset-0 w-full h-full -z-10 invert-100"
            style={{
              backgroundImage: "url('/diagonal_lines.png')",
              backgroundRepeat: 'repeat',
              backgroundSize: '300px 300px',
            }}
          />
          <button onClick={closeModal} className="px-6 py-2 border border-zinc-400 text-sm font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-300 transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-green-700 text-zinc-50 text-sm font-medium hover:bg-green-800 transition-colors">
            {mode === 'add' ? 'Add to Cart' : 'Update'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default CartModal