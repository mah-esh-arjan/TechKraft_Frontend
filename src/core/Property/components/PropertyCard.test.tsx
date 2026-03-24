import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PropertyCard } from './PropertyCard';
import type { Property } from '../schema';

// Mock tanstack router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children }: any) => <div>{children}</div>
}));

// Mock current admin state
vi.mock('@/lib/auth', () => ({
  auth: {
    isAdmin: vi.fn().mockReturnValue(false)
  }
}));

const mockProperty: Property = {
  id: 1,
  name: 'Ocean View Villa',
  description: 'Beautiful villa with ocean view',
  price: 1500000,
  beds: 4,
  baths: 3,
  type: 'VILLA',
  suburb: 'Malibu',
  agentId: 1,
  agent: {
    name: 'John Doe',
    email: 'john@example.com'
  },
  createdAt: new Date().toISOString()
};

describe('PropertyCard', () => {
  it('should render property details correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('$1500000')).toBeInTheDocument();
    expect(screen.getByText('Ocean View Villa')).toBeInTheDocument();
    expect(screen.getByText('Suburb Malibu')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('VILLA')).toBeInTheDocument();
  });

  it('should render view details button', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('View Details')).toBeInTheDocument();
  });
});
