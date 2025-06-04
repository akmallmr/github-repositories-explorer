import { ChevronDown, FolderGit2, Github, Link, Star } from 'lucide-react';
import { GithubRepo, GithubRepos } from './components';
import { useState } from 'react';

const AccordionProfile = ({ data }: { data: GithubRepo[] }) => {
  console.log(data);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleAccordion = (idx: number) => {
    setOpenIndexes((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  return (
    <>
      {data?.map((user: GithubRepo, idx: number) => (
        <div key={idx}>
          <div
            onClick={() => toggleAccordion(idx)}
            className='flex justify-between items-center cursor-pointer bg-slate-800 p-2 rounded-t-xl'
          >
            <div className='flex gap-2 items-center'>
              <Github size={30} className='fill-amber-500 text-amber-500' />
              <p className='text-amber-500 text-lg font-bold'>{`${user.username} -`}</p>
              <p className='text-amber-500 text-sm'>{`(${user.repos.length}) Repository`}</p>
            </div>
            <ChevronDown
              size={30}
              className={`text-amber-500 transition-all ease-in-out ${
                openIndexes.includes(idx) ? 'rotate-180' : ''
              } `}
            />
          </div>
          {openIndexes.includes(idx) && (
            <div className='p-2 rounded-b-xl bg-slate-50'>
              {user.repos.length === 0 && 'No Repositories'}
              <div className='flex flex-col gap-5'>
                {user?.repos?.map((item: GithubRepos) => {
                  if (!item) return <p key={item}>No Repositories</p>;
                  return (
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
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default AccordionProfile;
