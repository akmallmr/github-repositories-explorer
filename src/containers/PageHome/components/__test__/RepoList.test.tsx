import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RepoList from '../RepoList';
import { useHomeContext } from '../../context/HomeContext';
import { useSearchProfileGithub } from '@/api/services/home';

jest.mock('../../context/HomeContext');
jest.mock('@/api/services/home');
jest.mock('../AccordionItem', () => ({ user, isOpen, onToggle }: any) => (
  <div data-testid="accordion-item">
    <p>{user.login}</p>
    <button onClick={onToggle}>{isOpen ? 'Close' : 'Open'}</button>
  </div>
));

const mockUseHomeContext = useHomeContext as jest.Mock;
const mockUseSearchProfileGithub = useSearchProfileGithub as jest.Mock;

describe('RepoList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    mockUseHomeContext.mockReturnValue({ search: '', searchUserName: 'testuser' });
    mockUseSearchProfileGithub.mockReturnValue({ isLoading: true, isError: false });

    render(<RepoList />);
    expect(screen.getByText(/searching/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    mockUseHomeContext.mockReturnValue({ search: '', searchUserName: 'testuser' });
    mockUseSearchProfileGithub.mockReturnValue({ isLoading: false, isError: true });

    render(<RepoList />);
    expect(screen.getByText(/Error fetching repositories/i)).toBeInTheDocument();
  });

  it('shows empty state when no users returned', () => {
    mockUseHomeContext.mockReturnValue({ search: 'abc', searchUserName: 'abc' });
    mockUseSearchProfileGithub.mockReturnValue({ isLoading: false, isError: false, data: [] });

    render(<RepoList />);
    expect(screen.getByText(/There is no abc/i)).toBeInTheDocument();
  });

  it('renders a list of AccordionItems when data is present', () => {
    const users = [
      { login: 'user1' },
      { login: 'user2' },
    ];

    mockUseHomeContext.mockReturnValue({ search: '', searchUserName: 'testuser' });
    mockUseSearchProfileGithub.mockReturnValue({ isLoading: false, isError: false, data: users });

    render(<RepoList />);
    expect(screen.getAllByTestId('accordion-item')).toHaveLength(2);
    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('user2')).toBeInTheDocument();
  });

  it('toggles open/close state on click', () => {
    const users = [{ login: 'user1' }];

    mockUseHomeContext.mockReturnValue({ search: '', searchUserName: 'testuser' });
    mockUseSearchProfileGithub.mockReturnValue({ isLoading: false, isError: false, data: users });

    render(<RepoList />);
    const button = screen.getByRole('button', { name: /Open/i });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();
  });
});
