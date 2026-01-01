import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CardsContainer from './containers/CardsContainer';
import TableContainer from './containers/TableContainer';
import CommunityCardsDisplay from './components/CommunityCardsDisplay';
import RankDisplay from './components/RankDisplay';
import {rankPlayers} from './helpers/RankUtil';
import cards from './helpers/cardData';
import './App.scss';

const App = () => {
  const containerRef = useRef(null);
  const [players, setPlayers] = useState([]);
  const [table, setTable] = useState([]);
  const [selected, setSelected] = useState({ area: "", limit: 0 });
  const [name, setName] = useState('');
  const [gamePhase, setGamePhase] = useState('pre-flop'); // pre-flop, flop, turn, river

  useEffect(() => {
    if(containerRef && containerRef.current){
      containerRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [players]);

  const availableCards = () => {
    // all remainning cards not in community or players hands
    return cards.filter(card => {
      return (
        !players.some(player => player.hand.includes(card)) &&
        !table.includes(card)
      )
    })
  }

  const addCard = (selectedCard) => {
    // add the selected card to community table or players hands
    if (selected.area === "table") {
      if (table.length < 5) {
        setTable([...table, selectedCard])
      } else {
        alert("You can't add any more cards to the table!")
      }
    } else {
      const currentPlayerIndex = players.findIndex(player => player.name === selected.area);
      if(currentPlayerIndex < 0){
        alert('pick an area for cards');
      }
      else if (players[currentPlayerIndex].hand.length < selected.limit) {
        const updatedPlayers = [...players]
        updatedPlayers[currentPlayerIndex].hand.push(selectedCard)
        setPlayers(updatedPlayers)
      } else {
        alert("You can't add any more cards to this player's hand!")
      }
    }
  }

  const removeCard = (selectedCard, area) => {
    // remove the card from functional area to deck
    if (area === "table") {
      setTable(table.filter(card => card !== selectedCard))
    } else {
      const currentPlayerIndex = players.findIndex(player => player.name === area)
      const updatedPlayers = [...players]
      updatedPlayers[currentPlayerIndex].hand = updatedPlayers[currentPlayerIndex].hand.filter(card => card !== selectedCard)
      setPlayers(updatedPlayers)
    }
  }


  const addUser =() =>{
    //add a user with userName to play in the rank game
    const noneSpaceName =  name.replace(/\s/g, '');
    const newUser = { name: noneSpaceName, hand: [] };
    const newPlayers = [...players];
    const exist = newPlayers.some((item)=> item.name === noneSpaceName);
    if(name === ''){
       alert('can not add user with no name');
    }
    else if(exist){
      alert('User already exists')
    }else{
      newPlayers.push(newUser);
      setPlayers(newPlayers);
      containerRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const addRandomUsers = (count) => {
    const randomNames = [
      'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry',
      'Ivy', 'Jack', 'Kate', 'Leo', 'Maya', 'Noah', 'Olivia', 'Peter',
      'Quinn', 'Ruby', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zoe'
    ];
    
    const newPlayers = [...players];
    let added = 0;
    
    for (let i = 0; i < count && added < count; i++) {
      // Try to find a name that doesn't exist
      const availableNames = randomNames.filter(
        randomName => !newPlayers.some(player => player.name === randomName)
      );
      
      if (availableNames.length === 0) {
        // If all predefined names are used, generate numbered names
        let num = 1;
        let generatedName;
        do {
          generatedName = `Player${num}`;
          num++;
        } while (newPlayers.some(player => player.name === generatedName));
        
        newPlayers.push({ name: generatedName, hand: [] });
        added++;
      } else {
        // Pick a random name from available names
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        const selectedName = availableNames[randomIndex];
        newPlayers.push({ name: selectedName, hand: [] });
        added++;
      }
    }
    
    setPlayers(newPlayers);
    containerRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const validateSelection =() =>{
    //need to check if community has 5 cards and each player has at least 2 cards to do calculation
    if(table.length !== 5){
      return false;
    }

    if(players.length === 0){
      return false;
    }

    for(let i = 0; i < players.length; i++){
      if(players[i].hand.length !== 2){
        return false;
      }
    }
    return true;

  }

  const resetTable =() =>{
    setTable([]);
    setPlayers([]);
    setGamePhase('pre-flop');
  }

  const revealFlop = () => {
    if (table.length >= 3 && players.length >= 2 && players.every(p => p.hand.length === 2)) {
      setGamePhase('flop');
    }
  };

  const revealTurn = () => {
    if (table.length >= 4 && gamePhase === 'flop') {
      setGamePhase('turn');
    }
  };

  const revealRiver = () => {
    if (table.length >= 5 && gamePhase === 'turn') {
      setGamePhase('river');
    }
  };

  const canRevealCards = () => {
    return players.length >= 2 && players.every(p => p.hand.length === 2);
  };

  const getVisibleCommunityCards = () => {
    if (gamePhase === 'pre-flop') return [];
    if (gamePhase === 'flop') return table.slice(0, 3);
    if (gamePhase === 'turn') return table.slice(0, 4);
    if (gamePhase === 'river') return table.slice(0, 5);
    return table;
  };

  function shuffledCardsAndDeal() {
    const shuffled = [...availableCards()];
  
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const tableCopy = [...table];
    for(let i = tableCopy.length; i < 5; i++){
      tableCopy.push(shuffled.pop());
    }
    const playerCopy = [...players];
    for(let j = 0; j < playerCopy.length; j++){
      let player = playerCopy[j];
      for(let k = player.hand.length; k < 2; k++ ){
        player.hand.push(shuffled.pop());
      }
    }
    setTable(tableCopy);
    setPlayers(playerCopy);
    setGamePhase('pre-flop');
  }

  return (
    <div>
      <Header />
      <CardsContainer cards={availableCards()} addCard={addCard} />
      <div className="table-containers">
          <CommunityCardsDisplay
            cards={table}
            removeCard={removeCard}
            selected={selected}
            setSelected={setSelected}
            gamePhase={gamePhase}
            revealFlop={revealFlop}
            revealTurn={revealTurn}
            revealRiver={revealRiver}
            canReveal={canRevealCards()}
          />
          <div className='players'>
        {players.map((player, index) =>
              <TableContainer
              key={index}
              className={'playerCards'}
              name={player.name}
              area={player.name}
              cards={player.hand}
              removeCard={removeCard}
              selected={selected}
              setSelected={setSelected}
              limit={2}
              communityCards={getVisibleCommunityCards()}
              totalPlayers={players.length}
              showWinRate={true}
            />
          )}
         </div>
        </div>
        <RankDisplay
          players={players}
          calculateRank={rankPlayers}
          communityCards={table}
          isEnabled={validateSelection()}
        />
        <div className='utlities'  ref={containerRef}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '1.1rem' }}>
              👤 Add Player
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={handleNameChange} 
              data-testid={'userNameInput'} 
              placeholder="Enter player name..."
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className={`addUserButton`}
              onClick={() => {addUser()}}
              data-testid={'addUserButtonTest'}
            >
              ➕ Add User
            </button>
            <button
              onClick={() => {addRandomUsers(3)}}
              style={{ background: 'linear-gradient(135deg, rgba(138, 43, 226, 0.3), rgba(75, 0, 130, 0.3))' }}
            >
              🎲 Add 3 Random Users
            </button>
            <button
              className={`dealCard`}
              onClick={() => {shuffledCardsAndDeal()}}
              disabled={players.length < 2}
            >
              🎴 Auto Deal
            </button>
            <button
              className={`resetTable`}
              onClick={() => {resetTable()}}
            >
              🔄 Reset Table
            </button>
          </div>
        </div>
      <Footer/>
      </div>
  )}      
         
export default App;