import { Dispatch } from 'react';

export interface IHomeContext {
  search: string;
  userRepoList: any[];
  searchUserName: string;
  setSearchUserName: Dispatch<React.SetStateAction<string>>;
  setUserRepoList: Dispatch<React.SetStateAction<any[]>>;
  setSearch: Dispatch<React.SetStateAction<string>>;
}
