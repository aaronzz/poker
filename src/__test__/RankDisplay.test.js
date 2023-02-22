import React from 'react';
import { render } from '@testing-library/react';
import RankDisplay from '../components/RankDisplay';
describe('RankDisplay', () => {
  it('should render the rank result for players', () => {
    const players = [
      { name: 'Player1', hand: [{ code: 'AS' }, { code: 'KS' }] },
      { name: 'Player2', hand: [{ code: 'AD' }, { code: 'KD' }] },
    ];
    const communityCards = [{ code: '10C' }, { code: 'JH' }, { code: 'QD' }, { code: 'KC' }, { code: 'AH' }];
    const calculateRank = (input) => ['Player2 wins!', 'Player1 loses.'];

    const { getByText } = render(<RankDisplay players={players} calculateRank={calculateRank} communityCards={communityCards} />);

    expect(getByText('Rank Result')).toBeInTheDocument();
    expect(getByText('Player2 wins!')).toBeInTheDocument();
    expect(getByText('Player1 loses.')).toBeInTheDocument();
  });
});