import { useApiQuery } from '@/api/hooks/useApiQuery';

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  size: number;
  // Add more if needed
}

export const useGetRepositoriesGithub = (username: string) => {
  return useApiQuery<GithubRepo[]>(['repos', username], `/users/${username}/repos`, {
    enabled: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
