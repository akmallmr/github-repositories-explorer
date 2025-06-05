import { useGetRepositoriesGithub } from '@/api/services/home';
import { fireEvent, render, screen } from '@testing-library/react';
import AccordionItem from '../AccordionItem';

jest.mock('@/api/services/home');

const mockUseGetRepositoriesGithub = useGetRepositoriesGithub as jest.Mock;

const mockUser = { login: 'testuser' };

describe('AccordionItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders closed state by default', () => {
    mockUseGetRepositoriesGithub.mockReturnValue({
      refetch: jest.fn(),
      data: [],
      isFetching: false,
      isLoading: false,
      isFetched: false,
    });

    render(<AccordionItem user={mockUser} isOpen={false} onToggle={jest.fn()} />);
    expect(screen.getByText(/testuser/i)).toBeInTheDocument();
    expect(screen.queryByText(/Fetching/i)).not.toBeInTheDocument();
  });

  it('shows loading message when open and loading', () => {
    mockUseGetRepositoriesGithub.mockReturnValue({
      refetch: jest.fn(),
      data: [],
      isFetching: true,
      isLoading: true,
      isFetched: false,
    });

    render(<AccordionItem user={mockUser} isOpen={true} onToggle={jest.fn()} />);
    expect(screen.getByText(/Fetching/i)).toBeInTheDocument();
  });

  it('shows "No Repositories" when data is empty and fetched', () => {
    mockUseGetRepositoriesGithub.mockReturnValue({
      refetch: jest.fn(),
      data: [],
      isFetching: false,
      isLoading: false,
      isFetched: true,
    });

    render(<AccordionItem user={mockUser} isOpen={true} onToggle={jest.fn()} />);
    expect(screen.getByText(/No Repositories/i)).toBeInTheDocument();
  });

  it('renders repository list when data is available', () => {
    mockUseGetRepositoriesGithub.mockReturnValue({
      refetch: jest.fn(),
      data: [
        {
          id: 1,
          name: 'repo1',
          description: 'A test repo',
          stargazers_count: 10,
          html_url: 'https://github.com/test/repo1',
          size: 2048,
        },
      ],
      isFetching: false,
      isLoading: false,
      isFetched: true,
    });

    render(<AccordionItem user={mockUser} isOpen={true} onToggle={jest.fn()} />);
    expect(screen.getByText(/repo1/i)).toBeInTheDocument();
    expect(screen.getByText(/A test repo/i)).toBeInTheDocument();
    expect(screen.getByText('2.00 MB')).toBeInTheDocument();
  });

  it('calls onToggle when the header is clicked', () => {
    const onToggle = jest.fn();
    mockUseGetRepositoriesGithub.mockReturnValue({
      refetch: jest.fn(),
      data: [],
      isFetching: false,
      isLoading: false,
      isFetched: false,
    });

    render(<AccordionItem user={mockUser} isOpen={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByText(/testuser/i));
    expect(onToggle).toHaveBeenCalled();
  });
});
