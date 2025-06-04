'use client';

import { useGetRepositoriesGithub } from '@/api/services/home';
import { useEffect, useRef } from 'react';
import { useHomeContext } from '../context/HomeContext';
import { GithubRepo } from './components';

const SearchInput = () => {
  const pendingUserRef = useRef('');
  const { search, setSearch, userRepoList, setUserRepoList, setSearchUserName } = useHomeContext();
  const {
    data,
    isError,
    isLoading,
    refetch,
    isFetching: searching,
  } = useGetRepositoriesGithub(search);

  useEffect(() => {
    if (data && !isLoading && !isError) {
      const username = pendingUserRef.current;
      setUserRepoList((prev: GithubRepo[]) => {
        console.log('prev', prev);
        if (prev.some((item: GithubRepo) => item.username === username)) {
          return prev;
        } else {
          return [{ username, repos: data }, ...prev];
        }
      });
      setSearch('');
      setSearchUserName('');
    }
  }, [data, isLoading, isError, setSearch, setUserRepoList, setSearchUserName]);

  const handleFetch = () => {
    const trimmed = search.trim();
    if (!trimmed) return alert('Please enter a username');
    if (userRepoList.some((item) => item.username === trimmed))
      return alert('Username already fetched');

    pendingUserRef.current = trimmed;
    setSearchUserName(trimmed);
    refetch();
  };

  return (
    <div className='w-full p-5'>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search'
        className='w-full p-2 rounded-2xl border-[1] mb-2'
      />
      <button
        onClick={handleFetch}
        className='bg-amber-500 p-2 my-5 w-full cursor-pointer rounded-xl'
      >
        {searching ? `Searching...` : 'Search Repos'}
      </button>
      <p className='text-sm'>{`Searching for users ${search || '-'}`}</p>
    </div>
  );
};

export default SearchInput;
