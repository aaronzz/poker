import React from 'react';
import Card from '../components/Card';
import Button from '@mui/material/Button';

const CommunityCardsDisplay = ({
  cards,
  removeCard,
  selected,
  setSelected,
  gamePhase,
  revealFlop,
  revealTurn,
  revealRiver,
  canReveal
}) => {
  const buttonClass = selected.area === 'table' ? 'active-button' : '';

  const getVisibleCards = () => {
    if (gamePhase === 'pre-flop') return [];
    if (gamePhase === 'flop') return cards.slice(0, 3);
    if (gamePhase === 'turn') return cards.slice(0, 4);
    if (gamePhase === 'river') return cards.slice(0, 5);
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="community-cards-container">
      <div className="table-card-containers">
        <button
          className={buttonClass}
          onClick={() => setSelected({ area: 'table', limit: 5 })}
        >
          Community Cards
        </button>
        
        <div className="community-controls">
          {gamePhase === 'pre-flop' && cards.length >= 3 && (
            <Button 
              variant="contained" 
              size="small" 
              onClick={revealFlop}
              disabled={!canReveal}
              style={{ margin: '4px' }}
            >
              Reveal Flop
            </Button>
          )}
          {gamePhase === 'flop' && cards.length >= 4 && (
            <Button 
              variant="contained" 
              size="small" 
              onClick={revealTurn}
              disabled={!canReveal}
              style={{ margin: '4px' }}
            >
              Reveal Turn
            </Button>
          )}
          {gamePhase === 'turn' && cards.length >= 5 && (
            <Button 
              variant="contained" 
              size="small" 
              onClick={revealRiver}
              disabled={!canReveal}
              style={{ margin: '4px' }}
            >
              Reveal River
            </Button>
          )}
        </div>

        <div className="tableCards">
          {visibleCards.map((card, index) => (
            <Card
              key={card?.name || `card-${index}`}
              code={card?.code || card}
              handleClick={() => removeCard(card, 'table')}
            />
          ))}
        </div>

        {cards.length > visibleCards.length && (
          <div className="hidden-cards-info">
            <p>Hidden cards: {cards.length - visibleCards.length}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityCardsDisplay;
