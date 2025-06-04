import { useGetRepositoriesGithub } from '@/api/services/home';
import { useHomeContext } from '../context/HomeContext';
import AccordionProfile from './AccordionProfile';

const RepoList = () => {
  const { search, searchUserName, userRepoList } = useHomeContext();
  const { isError, isLoading: searching } = useGetRepositoriesGithub(search);

  if (searching) return <p className='px-5 text-center'>searching...</p>;
  if (isError) return <p className='px-5'>{`Error fetching repositories for ${searchUserName}`}</p>;

  return (
    <div className='p-5 w-full h-full flex flex-col gap-2'>
      <AccordionProfile data={userRepoList} />
    </div>
  );
};

export default RepoList;
