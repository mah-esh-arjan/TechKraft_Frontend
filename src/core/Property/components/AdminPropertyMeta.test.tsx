import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AdminPropertyMeta } from './AdminPropertyMeta';
import { auth } from '@/lib/auth';

// Mock auth module
vi.mock('@/lib/auth', () => ({
  auth: {
    isAdmin: vi.fn()
  }
}));

describe('AdminPropertyMeta', () => {
  const mockMeta = {
    hasPool: true,
    hasGarage: false,
    yearBuilt: 2022,
    squareFeet: 2500
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not render if user is not an admin', () => {
    (auth.isAdmin as any).mockReturnValue(false);
    
    const { container } = render(<AdminPropertyMeta metaData={mockMeta} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render correct details if user is an admin', () => {
    (auth.isAdmin as any).mockReturnValue(true);
    
    render(<AdminPropertyMeta metaData={mockMeta} />);
    
    expect(screen.getByText('Has Pool')).toBeInTheDocument();
    expect(screen.getByText('Yes')).toBeInTheDocument();
    expect(screen.getByText('Garage')).toBeInTheDocument();
    expect(screen.getByText('No')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();
  });
});
