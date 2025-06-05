import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header component', () => {
  it('renders the header text', () => {
    render(<Header />);
    const heading = screen.getByText(/Repositories Explorer/i);
    expect(heading).toBeInTheDocument();
  });

  it('has the correct styling classes', () => {
    render(<Header />);
    const heading = screen.getByText(/Repositories Explorer/i);
    expect(heading).toHaveClass('bg-amber-500');
    expect(heading).toHaveClass('p-5');
    expect(heading).toHaveClass('text-center');
  });
});