'use client';

import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import api from '../clients';

export function useApiQuery<TData = unknown, TError = Error>(
  key: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery<TData, TError, TData, QueryKey>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get<TData>(url);
      return res.data;
    },
    ...options,
  });
}
