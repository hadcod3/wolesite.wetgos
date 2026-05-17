import React from 'react'
import { Spinner } from '../ui/spinner'

export default function ChartDialog() {
  return (
    <div
          className="fixed inset-0 bg-zinc-700/50 z-100 flex flex-col items-center justify-center"
        //   onClick={(e) => e.target === e.currentTarget && !deleteLoading && setPendingDeleteId(null)}
        >
          <div className="w-full max-w-sm shadow-lg border border-zinc-300/30">
            <div className="bg-zinc-100 w-full p-4 ">
                <h3 className="text-lg font-medium text-zinc-900 mb-2">Delete ""?</h3>
              {/* {pendingCategory && (
              )} */}
              <p className="text-sm text-zinc-500 mb-2">This action cannot be undone. This will permanently delete from servers.</p>
            </div>
            <div className="relative flex gap-3 justify-end border-t border-zinc-300  p-4">
              <div 
                className="absolute inset-0 w-full h-full -z-10 invert-100"
                style={{
                  backgroundImage: "url('/diagonal_lines.png')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "300px 300px"
                }}>
              </div>
              <button
                // onClick={}
                // disabled={}
                className="px-8 py-2 border border-zinc-400 text-sm font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-300 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                // onClick={}
                // disabled={}
                className="flex items-center gap-2 px-8 py-2 bg-red-500 text-zinc-50 text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-60 cursor-pointer"
              >
                {/* {deleteLoading ? <><Spinner /> Deleting</> : "Delete"} */}
              </button>
            </div>
          </div>
        </div>
  )
}
