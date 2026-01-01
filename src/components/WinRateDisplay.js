import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateWinRate } from '../helpers/WinRateCalculator';

const WinRateDisplay = ({ playerHand, communityCards, totalPlayers }) => {
  const [winRate, setWinRate] = useState(null);
  const [calculating, setCalculating] = useState(false);

  const handleCalculate = () => {
    setCalculating(true);
    // Use setTimeout to allow UI to update before heavy calculation
    setTimeout(() => {
      const result = calculateWinRate(playerHand, communityCards, totalPlayers, 5000);
      setWinRate(result);
      setCalculating(false);
    }, 100);
  };

  const isEnabled = playerHand && playerHand.length === 2 && communityCards.length > 0 && totalPlayers >= 2;

  return (
    <div className="win-rate-container">
      <Button 
        variant="outlined" 
        size="small" 
        onClick={handleCalculate}
        disabled={!isEnabled || calculating}
        style={{ marginTop: '8px', fontSize: '0.75rem' }}
      >
        {calculating ? <CircularProgress size={20} /> : 'Calculate Win Rate'}
      </Button>
      
      {winRate && (
        <div className="win-rate-stats">
          <div className="win-stat">
            <span className="stat-label">Win:</span>
            <span className="stat-value win">{winRate.winRate.toFixed(1)}%</span>
          </div>
          <div className="win-stat">
            <span className="stat-label">Tie:</span>
            <span className="stat-value tie">{winRate.tieRate.toFixed(1)}%</span>
          </div>
          <div className="win-stat">
            <span className="stat-label">Lose:</span>
            <span className="stat-value lose">{winRate.loseRate.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinRateDisplay;
