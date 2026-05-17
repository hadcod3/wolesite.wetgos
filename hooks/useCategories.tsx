import useSWR from 'swr';
import { IItemCategory } from '@/lib/database/models/category.model';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<IItemCategory[]>(
    '/api/categories',
    fetcher,
    { dedupingInterval: 60000 }
  );

  return {
    categories: data ?? [],
    isLoading,
    isError: !!error,
    mutate,
  };
}