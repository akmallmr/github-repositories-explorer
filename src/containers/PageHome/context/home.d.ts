import { Dispatch } from 'react';

export interface IHomeContext {
  search: string;
  userRepoList: GithubRepo[];
  searchUserName: string;
  setSearchUserName: Dispatch<React.SetStateAction<string>>;
  setUserRepoList: Dispatch<React.SetStateAction<GithubRepo[]>>;
  setSearch: Dispatch<React.SetStateAction<string>>;
}

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
