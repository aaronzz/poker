import React from 'react';
import Card from '../components/Card';

const TableContainer = ({
  name,
  area,
  cards,
  removeCard,
  selected,
  setSelected,
  limit
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
      <div>
        {cards.map((card) => (
          <Card
            key={card.name}
            code={card.code}
            handleClick={() => removeCard(card, area)}
          />
        ))}
      </div>
    </div>
  );
};

export default TableContainer;
