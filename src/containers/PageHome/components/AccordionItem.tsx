'use client';

import { useGetRepositoriesGithub } from '@/api/services/home';
import { ChevronDown, FolderGit2, Github, Link, Star } from 'lucide-react';
import { useEffect } from 'react';
import { GithubRepos, Props } from './components';

const AccordionItem = ({ user, isOpen, onToggle }: Props) => {
  const {
    refetch,
    data: repoData,
    isFetching,
    isLoading,
    isFetched,
  } = useGetRepositoriesGithub(user.login);

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [isOpen, refetch]);

  return (
    <div>
      <div
        onClick={onToggle}
        className='flex justify-between items-center cursor-pointer bg-slate-800 p-2 rounded-t-xl'
      >
        <div className='flex gap-2 items-center'>
          <Github size={30} className='fill-amber-500 text-amber-500' />
          <p className='text-amber-500 text-lg font-bold'>{user.login}</p>
        </div>
        <ChevronDown
          size={30}
          className={`text-amber-500 transition-all ease-in-out ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {isOpen && (
        <div className='p-2 rounded-b-xl bg-slate-50'>
          {(isLoading || isFetching) && <p className='text-sm px-2'>Fetching...</p>}

          {isFetched && repoData?.length === 0 && <p className='text-sm px-2'>No Repositories</p>}

          {isFetched && repoData && (
            <div className='flex flex-col gap-5'>
              {repoData.map((item: GithubRepos) => (
                <div key={item.id} className='bg-slate-500 p-2 rounded-xl shadow-2xl'>
                  <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-row gap-5 items-center px-5'>
                      <FolderGit2 className='text-white' />
                      <div className='flex flex-col'>
                        <div className='flex flex-row items-center gap-10'>
                          <p className='font-semibold text-white text-md'>{item.name}</p>
                          <div className='flex flex-row items-center gap-2'>
                            <Star size={15} className='text-white fill-white' />
                            <p className='text-sm text-white'>{item.stargazers_count}</p>
                          </div>
                        </div>
                        <p className='text-sm text-white'>{item.description}</p>
                        <p className='text-xs text-white'>{`${(item.size / 1024).toFixed(
                          2
                        )} MB`}</p>
                      </div>
                    </div>
                    <a
                      title='Go To Github Repo'
                      href={item.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Link className='text-white cursor-pointer' size={20} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AccordionItem;
