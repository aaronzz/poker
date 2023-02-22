import React from 'react';

const RankDisplay = ({ players, calculateRank,communityCards }) => {

  const input = {
    Community: communityCards.map((i)=>i.code)
  };
  
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    let hands = player.hand.map((item)=>item.code);
    input[player.name] = hands;
  }
  const ranks = calculateRank(input);

  return (
    <div>
      <p>Rank Result</p>
      {ranks.map((rank, index) => (
        <p key={index}>
          {rank}
        </p>
      ))}
    </div>
  );
};

export default RankDisplay;