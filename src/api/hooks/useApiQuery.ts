'use client';

import { useQuery, QueryKey } from '@tanstack/react-query';
import api from '../clients';

export const useApiQuery = <TData = unknown>(
  key: QueryKey,
  url: string,
  options?: Parameters<typeof useQuery<TData>>[0]
) => {
  return useQuery<TData>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get<TData>(url);
      return res.data;
    },
    ...options,
  });
};
