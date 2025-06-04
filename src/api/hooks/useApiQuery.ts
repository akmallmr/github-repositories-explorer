'use client';

import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import api from '../clients';

export function useApiQuery<TResponse = unknown, TError = Error, TData = TResponse>(
  key: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TResponse, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> {
  return useQuery<TResponse, TError, TData, QueryKey>({
    queryKey: key,
    queryFn: async () => {
      const res = await api.get<TResponse>(url);
      return res.data;
    },
    ...options,
  });
}
