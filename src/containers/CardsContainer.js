import React from 'react';
import Card from '../components/Card';

const CardsContainer = ({ cards, addCard }) => {
  return (
    <div className="cards-container">
      {cards.map(card => (
        <Card
          key={card.name}
          code={card.code}
          handleClick={() => addCard(card)}
        />
      ))}
    </div>
  );
};

export default CardsContainer;
