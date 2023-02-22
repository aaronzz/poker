import React from 'react';

const Card = ({ code, handleClick }) => {
  return (
    <img
      src={`/imgs/cards/${code}.png`}
      alt="card"
      onClick={handleClick}
    />
  );
};

export default Card;
