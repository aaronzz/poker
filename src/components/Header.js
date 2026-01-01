import React from 'react';

const Header = () => {
  return (
    <header style={{ padding: '2rem 1rem 1rem' }}>
      <h1>🎰 Texas Hold'em Poker Analyzer 🎰</h1>
      <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1rem' }}>
        Select an area by clicking its header button (e.g., <b style={{color:'#ffd700'}}>Table Cards</b> or <b style={{color:'#ffd700'}}>Player Cards</b>), 
        then click cards from the deck to add them to that area.
      </p>
      <p style={{ maxWidth: '800px', margin: '0.5rem auto 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
        Calculate win rates at each stage: Pre-flop → Flop → Turn → River
      </p>
    </header>
  );
};

export default Header;
