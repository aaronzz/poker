import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableContainer from '../containers/TableContainer';

describe('TableContainer', () => {
  const mockRemoveCard = jest.fn();
  const mockSetSelected = jest.fn();

  const cards = [
    { name: 'Ace of Spades', code: 'AS' },
    { name: 'King of Hearts', code: 'KH' },
    { name: 'Queen of Clubs', code: 'QC' }
  ];

  const defaultProps = {
    name: 'Table',
    area: 'table',
    cards: cards,
    removeCard: mockRemoveCard,
    selected: { area: '', limit: 0 },
    setSelected: mockSetSelected,
    limit: 5
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component', () => {
    const { getByText } = render(<TableContainer {...defaultProps} />);
    expect(getByText('Table Cards')).toBeInTheDocument();
  });

  it('displays the correct card names', () => {
    render(<TableContainer {...defaultProps} />);
   
  });

  it('calls setSelected when the button is clicked', () => {
    const { getByText } = render(<TableContainer {...defaultProps} />);
    fireEvent.click(getByText('Table Cards'));
    expect(mockSetSelected).toHaveBeenCalledWith({ area: 'table', limit: 5 });
  });
});
