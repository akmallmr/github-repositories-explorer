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

export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  score: number;
}

interface ISearchProfileGithub {
  incomplete_results: boolean;
  items: GithubUser[];
  total_count: number;
}

export const useGetRepositoriesGithub = (username: string) => {
  return useApiQuery<GithubRepo[]>(['repos', username], `/users/${username}/repos`, {
    enabled: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

export const useSearchProfileGithub = (query: string) => {
  return useApiQuery<ISearchProfileGithub, Error, GithubUser[]>(
    ['users-github', query],
    `/search/users?q=${query}`,
    {
      // enabled: !!query,
      enabled: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      select: (data) => data.items,
    }
  );
};
