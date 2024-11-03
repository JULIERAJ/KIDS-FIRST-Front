import { render, screen } from '@testing-library/react';

import DashboardHeader from '../DashboardHeader.jsx';

const testUser = {
  firstName: 'Test',
  lastName: 'User',
};

beforeEach(() => {
  render(<DashboardHeader title='Home' user={testUser} />);
});

describe('Dashboard Header component', () => {
  it('renders user first name', async () => {
    const headerElement = await screen.findByText('Hello Test!');

    expect(headerElement).toBeInTheDocument();
  });

  it('renders user initials', async () => {
    const headerElement = await screen.findByText('TU');

    expect(headerElement).toBeInTheDocument();
  });
  
  it('renders Home title', async () => {
    const headerElement = await screen.findByText('Home');

    expect(headerElement).toBeInTheDocument();
  });
});
