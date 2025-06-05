import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetRepositoriesGithub, useSearchProfileGithub } from '../services/home';
import api from '@/api/clients';

jest.mock('@/api/clients');

const mockedApi = api as jest.Mocked<typeof api>;

const createTestWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// 🔹 Test component to call useGetRepositoriesGithub
const ReposTestComponent = ({ username }: { username: string }) => {
  const { data, isError, isLoading, error, refetch } = useGetRepositoriesGithub(username);

  React.useEffect(() => {
    refetch(); // manually trigger fetch since enabled: false
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((repo) => (
        <div key={repo.id}>{repo.name}</div>
      ))}
    </div>
  );
};

// 🔹 Test component to call useSearchProfileGithub
const UsersTestComponent = ({ query }: { query: string }) => {
  const { data, isError, isLoading, error, refetch } = useSearchProfileGithub(query);

  React.useEffect(() => {
    refetch(); // manually trigger fetch since enabled: false
  }, [refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (isError && error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.map((user) => (
        <div key={user.id}>{user.login}</div>
      ))}
    </div>
  );
};

describe('useGetRepositoriesGithub', () => {
  it('fetches and displays repos', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: [{ id: 1, name: 'test-repo', description: '', stargazers_count: 0, html_url: '', size: 100 }],
    });

    render(<ReposTestComponent username="akmallmr" />, {
      wrapper: createTestWrapper(),
    });

    expect(await screen.findByText('test-repo')).toBeInTheDocument();
  });

  it('handles error when fetching repos fails', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<ReposTestComponent username="akmallmr" />, {
      wrapper: createTestWrapper(),
    });

    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/Failed to fetch/)).toBeInTheDocument();
  });
});

describe('useSearchProfileGithub', () => {
  it('fetches and displays users', async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        incomplete_results: false,
        total_count: 1,
        items: [
          {
            login: 'octocat',
            id: 1,
            node_id: '',
            avatar_url: '',
            gravatar_id: '',
            url: '',
            html_url: '',
            followers_url: '',
            following_url: '',
            gists_url: '',
            starred_url: '',
            subscriptions_url: '',
            organizations_url: '',
            repos_url: '',
            events_url: '',
            received_events_url: '',
            type: 'User',
            site_admin: false,
            score: 1,
            user_view_type: '',
          },
        ],
      },
    });

    render(<UsersTestComponent query="octocat" />, {
      wrapper: createTestWrapper(),
    });

    expect(await screen.findByText('octocat')).toBeInTheDocument();
  });

  it('handles error when fetching users fails', async () => {
    mockedApi.get.mockRejectedValueOnce(new Error('User fetch failed'));

    render(<UsersTestComponent query="octocat" />, {
      wrapper: createTestWrapper(),
    });

    expect(await screen.findByText(/Error:/)).toBeInTheDocument();
    expect(screen.getByText(/User fetch failed/)).toBeInTheDocument();
  });
});
