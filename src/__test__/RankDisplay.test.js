import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import RankDisplay from '../components/RankDisplay';
describe('RankDisplay', () => {
  const players = [
    { name: 'player1', hand: [{ code: 'AC' }, { code: 'KS' }] },
    { name: 'player2', hand: [{ code: 'KH' }, { code: 'QC' }] }
  ];
  const communityCards = [{ code: 'JS' }, { code: '10C' }, { code: '2H' }, { code: '3S' }, { code: '4D' }];
  const calculateRank = jest.fn().mockReturnValue(['player1 wins with high card: Ace']);
  let container, button, dialog;

  beforeEach(() => {
    ({ container } = render(<RankDisplay players={players} communityCards={communityCards} calculateRank={calculateRank} />));
    button = container.querySelector('button');
  });

  it('should not display the dialog by default', () => {
    dialog = container.querySelector('div[role="dialog"]');
    expect(dialog).toBeNull();
  });

  it('should open the dialog when the button is clicked', () => {
    fireEvent.click(button);
    dialog = container.querySelector('div[role="dialog"]');
  });

  it('should call calculateRank with the correct arguments', () => {
    fireEvent.click(button);
    expect(calculateRank).toHaveBeenCalledWith({
      Community: ['JS', '10C', '2H', '3S', '4D'],
      player1: ['AC', 'KS'],
      player2: ['KH', 'QC']
    });
  });

});
