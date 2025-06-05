import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchInput from '../SearchInput';
import { useHomeContext } from '../../context/HomeContext';
import { useSearchProfileGithub } from '@/api/services/home';

jest.mock('../../context/HomeContext');
jest.mock('@/api/services/home');

const mockUseHomeContext = useHomeContext as jest.Mock;
const mockUseSearchProfileGithub = useSearchProfileGithub as jest.Mock;

describe('SearchInput', () => {
  const setSearch = jest.fn();
  const setSearchUserName = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSearchProfileGithub.mockReturnValue({
      refetch: jest.fn(),
      isFetching: false,
    });
  });

  it('renders input, button, and search text', () => {
    mockUseHomeContext.mockReturnValue({
      search: '',
      setSearch,
      userRepoList: [],
      setSearchUserName,
      searchUserName: '',
    });

    render(<SearchInput />);

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Search Repos/i })).toBeInTheDocument();
    expect(screen.getByText(/Searching for users/i)).toBeInTheDocument();
  });

  it('updates search input', () => {
    mockUseHomeContext.mockReturnValue({
      search: '',
      setSearch,
      userRepoList: [],
      setSearchUserName,
      searchUserName: '',
    });

    render(<SearchInput />);
    const input = screen.getByPlaceholderText(/Search/i);

    fireEvent.change(input, { target: { value: 'akmallmr' } });

    expect(setSearch).toHaveBeenCalledWith('akmallmr');
  });

  it('alerts on empty input', () => {
    global.alert = jest.fn();

    mockUseHomeContext.mockReturnValue({
      search: '',
      setSearch,
      userRepoList: [],
      setSearchUserName,
      searchUserName: '',
    });

    render(<SearchInput />);
    fireEvent.click(screen.getByRole('button'));

    expect(global.alert).toHaveBeenCalledWith('Please enter a username');
  });

  it('alerts if username is already fetched', () => {
    global.alert = jest.fn();

    mockUseHomeContext.mockReturnValue({
      search: 'akmallmr',
      setSearch,
      userRepoList: [{ username: 'akmallmr' }],
      setSearchUserName,
      searchUserName: '',
    });

    render(<SearchInput />);
    fireEvent.click(screen.getByRole('button'));

    expect(global.alert).toHaveBeenCalledWith('Username already fetched');
  });

  it('sets username and triggers refetch when valid', () => {
    const refetch = jest.fn();

    mockUseSearchProfileGithub.mockReturnValue({
      refetch,
      isFetching: false,
    });

    mockUseHomeContext.mockReturnValue({
      search: 'akmallmr',
      setSearch,
      userRepoList: [],
      setSearchUserName,
      searchUserName: 'akmallmr',
    });

    render(<SearchInput />);

    expect(refetch).toHaveBeenCalled();
  });
});
