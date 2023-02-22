import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from '../components/Card';

describe('Card', () => {
  test('renders card with given code and click handler', () => {
    const handleClick = jest.fn();
    const code = 'AH';
    const { getByAltText } = render(<Card code={code} handleClick={handleClick} />);
    const cardImage = getByAltText('card');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage.getAttribute('src')).toBe(`/imgs/cards/${code}.png`);
    fireEvent.click(cardImage);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
