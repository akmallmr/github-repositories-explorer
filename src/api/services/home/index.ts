import { useApiQuery } from '@/api/hooks/useApiQuery';

export const useGetRepositoriesGithub = (username: string) => {
  return useApiQuery<any>(['repos', username], `/users/${username}/repos`, {
    enabled: false,
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
