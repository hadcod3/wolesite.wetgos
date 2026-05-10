"use client"
import AnimatedList from '@/components/reusable/AnimatedList';
import React from 'react'

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10']; 

export default function page() {
  return (
    <section className="">
      <div className="w-full flex justify-between max-h-screen h-full ">

        <div className='flex flex-nowrap overflow-x-auto no-scrollbar'>

          <div className='flex'>
            <div className='w-16 h-screen flex flex-col overflow-hidden'>
              <h1 className='px-12 bg-green-700 text-zinc-100 rotate-180 font-bold text-2xl leading-16 [writing-mode:vertical-lr] capitalize shadow-lg'>Other</h1>
              <div className='h-full w-full flex-1 opacity-70'
                style={{
                    backgroundImage: "url('/diagonal_lines.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "300px 300px",
                }}>

              </div>
            </div>
            <AnimatedList
              items={items}
              onItemSelect={(item, index) => console.log(item, index)}
            />
          </div>
          
        </div>

        <div className='relative min-w-sm h-screen pl-4'>
          <div className='absolute inset-0 left-4 h-full opacity-30 -z-10'
              style={{
                  backgroundImage: "url('/diagonal_lines.png')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "400px 400px",
              }}>
          </div>
          <div className='w-full h-screen py-8 px-4 flex flex-col gap-4'>
            <div className='flex gap-4 justify-between'>
              <div className='w-full flex flex-1 items-center justify-between gap-2 px-3 py-2 text-md font-medium text-zinc-700 bg-zinc-50 shadow-sm'>
                <h1>12/01/2026</h1>
                <h1>|</h1>
                <h1>12:55 AM</h1>
              </div>
              <button className='px-6 py-2 text-lg font-semibold bg-green-700 hover:bg-green-800 text-zinc-50 shadow-sm cursor-pointer transition-colors duration-300 ease'>
                Dashboard
              </button>
            </div>
            <h1 className='px-3 py-2 text-lg font-semibold bg-zinc-50 shadow-sm'>Order Track</h1>
          </div>
        </div>

      </div>      
    </section>
  )
}
  