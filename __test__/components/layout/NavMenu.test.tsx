import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import NavMenu, { MenuItem } from '@/components/layout/NavMenu';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import MuiButton from '@/components/common/MuiButton';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

jest.mock('next/link', () => {
  const MockLink: React.FC<{
    href: string;
    children: React.ReactNode;
    className?: string;
    passHref?: boolean;
  }> = ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>;
  return MockLink;
});

// Mock MuiButton as a black box
jest.mock('../../../components/common/MuiButton', () => {
  return jest.fn(({ children, ...props }) => <button {...props}>{children}</button>);
});

describe('test NavMenu', () => {
  const mockPush = jest.fn();
  const mockPathname = jest.fn();

  beforeEach(() => {
    // Clear mocks before each test
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (MuiButton as jest.Mock).mockClear();
  });

  it('renders NavMenu with title', () => {
    render(<NavMenu />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders Link components with correct href attributes', () => {
    render(<NavMenu />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveAttribute('href', '/home');
    expect(homeLink).toBeInTheDocument();
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    expect(dashboardLink).toBeInTheDocument();
  });

  it("updates pathname after clicked link", () => {
    const { rerender } = render(<NavMenu />);
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i });
    fireEvent.click(dashboardLink)
    jest.mocked(usePathname).mockReturnValue('/dashboard')
    rerender(<NavMenu />);
    expect(dashboardLink.closest('li')).toHaveClass("bg-highlight pointer-events-none");

    const homeLink = screen.getByRole('link', { name: /home/i });
    fireEvent.click(homeLink)
    jest.mocked(usePathname).mockReturnValue('/home')
    rerender(<NavMenu />);
    expect(homeLink.closest('li')).toHaveClass("bg-highlight pointer-events-none");
  })

  it('calls router.push on logout button click', async () => {
    render(<NavMenu />);
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1)
      expect(mockPush).toHaveBeenCalledWith("/")

    })
  });
});