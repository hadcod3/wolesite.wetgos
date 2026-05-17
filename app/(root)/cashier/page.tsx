"use client"
import AnimatedList from '@/components/reusable/AnimatedList';
import CartItemCard from '@/components/reusable/CartItemCard';
import CartModal from '@/components/reusable/CartModal';
import Loading from '@/components/reusable/Loading';
import { useCart } from '@/components/reusable/CartContext';
import { useCategories } from '@/hooks/useCategories';
import { useItems } from '@/hooks/useItems';
import { SearchBar } from '@/components/reusable/SearchBar';
import { TrashIcon } from 'lucide-react';

export default function Page() {
  const { categories, isLoading: catsLoading } = useCategories();
  const { itemsByCategory, uncategorizedItems, isLoading: itemsLoading } = useItems(categories);
  const { cart, clearCart } = useCart();

  const isLoading = catsLoading || itemsLoading;

  const grandTotal = cart.reduce(
    (sum, entry) => sum + (entry.item.price + (entry.variantPrice ?? 0)) * entry.quantity,
    0
  );
  const totalQty = cart.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <section>
      <CartModal />
      <div className="w-full flex justify-between max-h-screen h-full">

        {/* ── Category columns ─────────────────────────────── */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar">
          {isLoading ? (
            <div className="flex items-center justify-center w-72 h-screen text-zinc-400">
              <Loading />
            </div>
          ) : (
            <>
              {categories.map((category) => {
                const categoryItems = itemsByCategory[category._id] ?? [];
                return (
                  <div key={category._id} className="flex">
                    <div className="w-16 h-screen flex flex-col overflow-hidden">
                      <div className="px-12 bg-green-700 text-zinc-100 rotate-180 font-bold text-2xl leading-16 [writing-mode:vertical-lr] capitalize shadow-lg flex items-center gap-2 whitespace-nowrap">
                        {category.name}
                      </div>
                      <span className="flex items-center justify-center py-1 text-xs font-normal text-zinc-400">
                        {categoryItems.length}
                      </span>
                      <div className="h-full w-full flex-1 opacity-70"
                        style={{ backgroundImage: "url('/diagonal_lines.png')", backgroundRepeat: 'repeat', backgroundSize: '300px 300px' }}
                      />
                    </div>

                    {categoryItems.length > 0 ? (
                      <AnimatedList
                        items={categoryItems}
                        onItemSelect={(item, index) => console.log(item, index)}
                      />
                    ) : (
                      <div className="w-72 h-screen flex flex-col items-center justify-center text-zinc-400 gap-2 select-none">
                        <p className="text-sm font-medium">No items</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {uncategorizedItems.length > 0 && (
                <div className="flex">
                  <div className="w-16 h-screen flex flex-col overflow-hidden">
                    <h1 className="px-12 bg-zinc-600 text-zinc-100 rotate-180 font-bold text-2xl leading-16 [writing-mode:vertical-lr] capitalize shadow-lg">
                      Other ({uncategorizedItems.length})
                    </h1>
                    <div className="h-full w-full flex-1 opacity-70"
                      style={{ backgroundImage: "url('/diagonal_lines.png')", backgroundRepeat: 'repeat', backgroundSize: '300px 300px' }}
                    />
                  </div>
                  <AnimatedList items={uncategorizedItems} onItemSelect={(item) => console.log(item)} />
                </div>
              )}
            </>
          )}
        </div>

        <div className="relative min-w-xs w-80 h-screen pl-4 shrink-0">
          <div className="absolute inset-0 left-4 h-full opacity-30 -z-10"
            style={{ backgroundImage: "url('/diagonal_lines.png')", backgroundRepeat: 'repeat', backgroundSize: '400px 400px' }}
          />

          <div className="w-full h-screen flex flex-col">
              <div className="flex pt-8 p-4 justify-between">
                <SearchBar onSearch={(query) => console.log(query)} className="bg-zinc-50 shadow-sm" />
              </div>
              <div className="w-full h-2 bg-zinc-100" />

            <div className="flex items-center justify-between pt-8 px-4 pb-4">
              <div className="w-full h-fit flex items-center justify-between bg-zinc-50 shadow-sm">
                <div className='px-3 py-2'>
                  <h1 className='text-lg font-semibold'>Order Track</h1>
                  <p className="text-xs text-zinc-400">{totalQty} item{totalQty !== 1 ? 's' : ''}</p>
                </div>
                
                <button
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className={`h-16 aspect-square flex items-center justify-center bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed border border-zinc-200 hover:border-rose-200`}
                >
                  <TrashIcon size={16} className="stroke-zinc-50" />
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-zinc-200" />

            <div className="flex-1 overflow-y-auto no-scrollbar py-3 px-4 flex flex-col gap-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-300 gap-2 select-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-10 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  <p className="text-sm font-medium">No items yet</p>
                </div>
              ) : (
                cart.map((entry, index) => (
                  <CartItemCard key={index} entry={entry} index={index} />
                ))
              )}
            </div>

              <>
                <div className="w-full h-px bg-zinc-200" />
                <div className="px-4 py-3 bg-zinc-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">Total</span>
                    <span className="text-xl font-bold text-zinc-900">Rp {grandTotal.toLocaleString()}</span>
                  </div>

                  {/* Checkout footer — transparent diagonal bg */}
                  <div className="relative">
                    <div
                      className="absolute inset-0 -z-10 invert-100"
                      style={{ backgroundImage: "url('/diagonal_lines.png')", backgroundRepeat: 'repeat', backgroundSize: '300px 300px' }}
                    />
                    <button className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-zinc-50 text-sm font-semibold transition-colors">
                      Confirm Order
                    </button>
                  </div>
                </div>
              </>

          </div>
        </div>

      </div>
    </section>
  );
}