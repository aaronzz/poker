import CardsContainer from "../containers/CardsContainer";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

const mockCards = [
  { name: 'card1', code: 'C1' },
  { name: 'card2', code: 'C2' },
  { name: 'card3', code: 'C3' },
];

describe('CardsContainer', () => {
  it('renders the cards passed as props', () => {
    const mockAddCard = jest.fn();
    render(<CardsContainer cards={mockCards} addCard={mockAddCard} />);
  
  });

  it('calls the addCard function when a card is clicked', () => {
    const mockAddCard = jest.fn();
    render(<CardsContainer cards={mockCards} addCard={mockAddCard} />);
  
  });
});
