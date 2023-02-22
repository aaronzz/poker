import Footer from "../components/Footer";

import React from 'react';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('renders the footer text correctly', () => {
    const { getByText } = render(<Footer />);
    const footerText = getByText(/Implemented as React Single page application/i);
    expect(footerText).toBeInTheDocument();
  });
});