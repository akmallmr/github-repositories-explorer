'use client';

import RepoList from './components/RepoList';
import SearchInput from './components/SearchInput';
import { HomeProvider } from './context/HomeContext';

const PageHome = () => {
  return (
    <HomeProvider>
      <SearchInput />
      <RepoList />
    </HomeProvider>
  );
};

export default PageHome;
