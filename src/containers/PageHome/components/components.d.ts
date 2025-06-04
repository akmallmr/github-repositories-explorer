export interface GithubRepos {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  size: number;
  // Add more if needed
}

export type GithubRepo = {
  username: string;
  repos: GithubRepos[];
};
