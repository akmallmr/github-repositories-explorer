'use client';

import { useSearchProfileGithub } from '@/api/services/home';
import { useCallback, useEffect, useRef } from 'react';
import { useHomeContext } from '../context/HomeContext';

const SearchInput = () => {
  const pendingUserRef = useRef('');
  const { search, setSearch, userRepoList, setSearchUserName, searchUserName } = useHomeContext();
  const { refetch, isFetching: searching } = useSearchProfileGithub(searchUserName);

  useEffect(() => {
    if (!searchUserName) return;
    refetch();
  }, [searchUserName, refetch]);

  const handleFetch = () => {
    const trimmed = search.trim();
    if (!trimmed) return alert('Please enter a username');
    if (userRepoList.some((item) => item.username === trimmed))
      return alert('Username already fetched');

    pendingUserRef.current = trimmed;
    setSearchUserName(trimmed);
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
