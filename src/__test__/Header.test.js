import Header from "../components/Header";

import React from 'react';
import { render } from '@testing-library/react';

describe('Header', () => {
  it('renders the component with the correct text', () => {
    const { getByText } = render(<Header />);
    expect(getByText('Texas Hold\'em Hand Ranker')).toBeInTheDocument();
    expect(getByText(/Click on area header button For example/i)).toBeInTheDocument();
    expect(getByText('Table Cards')).toHaveStyle('color: red');
  });
});