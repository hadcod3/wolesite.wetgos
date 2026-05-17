'use client'

import { IItem } from '@/lib/database/models/item.model'
import { useRouter } from 'next/navigation'
import { SquarePen } from 'lucide-react'
import React from 'react'
import { useCartModal } from './CartModalContext'
import Image from 'next/image'

interface MenuCardProps {
  data: IItem
  editable?: boolean
}

const MenuCard = ({ data, editable }: MenuCardProps) => {
  const router = useRouter()
  const { openModal } = useCartModal()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/dashboard/menu/${data._id}/update`)
  }

  const handleClick = () => {
    if (editable) {
      router.push(`/dashboard/menu/${data._id}`)
    } else {
      openModal(data)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="p-2 flex rounded-lg aspect-22/7 h-fit w-fit cursor-pointer group"
    >
      <div className="relative min-w-28 w-28 min-h-28 h-28 flex p-2 aspect-square!">
        <div
          className="absolute inset-0 w-full h-full bg-zinc-100 -z-10 opacity-50"
          style={{
            backgroundImage: "url('/diagonal_lines.png')",
            backgroundRepeat: 'repeat',
            backgroundSize: '300px 300px',
          }}
        />
        <Image
          src={data.imgUrl}
          alt={data.name}
          width={2000}
          height={4000}
          className="w-full h-full object-cover bg-zinc-100 shadow-sm transition-opacity group-hover:opacity-90"
        />

        {/* Edit button overlay */}
        {editable && (
          <button
            onClick={handleEdit}
            className="absolute top-1 right-1 z-10 p-1 bg-zinc-100/90 hover:bg-zinc-200 transition-colors shadow-sm"
          >
            <SquarePen className="w-3.5 h-3.5 text-blue-700" />
          </button>
        )}
      </div>

      {/* Info block */}
      <div className="p-2 px-4 flex flex-col justify-between max-h-28 h-28 min-h-28 max-w-60 w-60 min-w-60 bg-zinc-50 shadow-sm group-hover:bg-zinc-100 transition-colors">
        <div>
          <h1 className="text-md font-semibold text-zinc-700 capitalize leading-tight">
            {data.name}
          </h1>
          <p className="text-sm font-medium text-zinc-500 capitalize">
            {data.category?.name || 'Uncategorized'}
          </p>
        </div>
        <div className="flex items-end justify-between">
          <h1 className="text-xl font-bold text-zinc-900">
            Rp {data.price.toLocaleString()}
          </h1>
        </div>
      </div>
    </div>
  )
}

export default MenuCard