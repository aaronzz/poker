import React from 'react';
import Card from '../components/Card';
import WinRateDisplay from '../components/WinRateDisplay';

const TableContainer = ({
  name,
  area,
  cards,
  removeCard,
  selected,
  setSelected,
  limit,
  className,
  communityCards,
  totalPlayers,
  showWinRate
}) => {
  const buttonClass = selected.area === area ? 'active-button' : '';

  return (
    <div className="table-card-containers">
      <button
        className={buttonClass}
        onClick={() => setSelected({ area, limit })}
      >
        {`${name} Cards`}
      </button>
      <div className={className}>
        {cards.map((card) => (
          <Card
            key={card.name}
            code={card.code}
            handleClick={() => removeCard(card, area)}
          />
        ))}
      </div>
      {showWinRate && (
        <WinRateDisplay 
          playerHand={cards}
          communityCards={communityCards || []}
          totalPlayers={totalPlayers || 2}
        />
      )}
    </div>
  );
};

export default TableContainer;
