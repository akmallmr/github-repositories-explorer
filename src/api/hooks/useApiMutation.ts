'use client';

import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import api from '../clients';
import { Method } from './method';

const axiosMethodMap = {
  post: api.post,
  update: api.put,
  patch: api.patch,
  delete: api.patch,
} as const;

export const useApiMutation = <TInput, TResponse>(
  url: string,
  method: Method = 'post',
  options?: UseMutationOptions<TResponse, Error, TInput>
) => {
  return useMutation<TResponse, Error, TInput>({
    mutationFn: async (input: TInput) => {
      const res = await axiosMethodMap[method]<TResponse>(url, input);
      return res.data;
    },
    ...options,
  });
};
