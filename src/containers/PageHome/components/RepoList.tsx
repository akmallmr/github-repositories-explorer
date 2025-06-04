import { useSearchProfileGithub } from '@/api/services/home';
import { useState } from 'react';
import { useHomeContext } from '../context/HomeContext';
import AccordionItem from './AccordionItem';

const RepoList = () => {
  const { search, searchUserName } = useHomeContext();
  const { data, isError, isLoading: searching } = useSearchProfileGithub(searchUserName);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]));
  };

  if (searching) return <p className='px-5 text-center'>searching...</p>;

  if (isError) return <p className='px-5'>{`Error fetching repositories for ${searchUserName}`}</p>;

  if (data?.length === 0) return <p className='text-center'>There is no {search}</p>;

  return (
    <div className='p-5 w-full h-full flex flex-col gap-2'>
      {data?.map((user, idx) => (
        <AccordionItem
          key={user.login}
          user={user}
          isOpen={openIndexes.includes(idx)}
          onToggle={() => toggleIndex(idx)}
        />
      ))}
    </div>
  );
};

export default RepoList;
