import useSWR from 'swr';
import { IItem } from '@/lib/database/models/item.model';
import { IItemCategory } from '@/lib/database/models/category.model';
import { useMemo } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useItems(categories: IItemCategory[] = []) {
  const { data, error, isLoading, mutate } = useSWR<IItem[]>(
    '/api/items',
    fetcher,
    { dedupingInterval: 60000 }
  );

  const items = data ?? [];

  // Group items by category _id — recomputes only when items or categories change
  const itemsByCategory = useMemo(() => {
    return categories.reduce<Record<string, IItem[]>>((acc, category) => {
      acc[category._id] = items.filter(item => item.category?._id === category._id);
      return acc;
    }, {});
  }, [items, categories]);

  // Items whose category doesn't match any known category
  const uncategorizedItems = useMemo(() => {
    const knownIds = new Set(categories.map(c => c._id));
    return items.filter(item => !item.category?._id || !knownIds.has(item.category._id));
  }, [items, categories]);

  return {
    items,
    itemsByCategory,
    uncategorizedItems,
    isLoading,
    isError: !!error,
    mutate,
  };
}