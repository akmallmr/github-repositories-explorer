import React, { createContext, ReactNode, useContext, useState } from 'react';
import { GithubRepo, IHomeContext } from './home';

const HomeContext = createContext<IHomeContext | undefined>(undefined);

const HomeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<string>('');
  const [userRepoList, setUserRepoList] = useState<GithubRepo[]>([]);
  const [searchUserName, setSearchUserName] = useState<string>('');

  return (
    <HomeContext.Provider
      value={{
        search,
        setSearch,
        userRepoList,
        setUserRepoList,
        searchUserName,
        setSearchUserName,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHomeContext must be used within an HomeProvider');
  }

  return context;
};

export { HomeProvider, useHomeContext };
