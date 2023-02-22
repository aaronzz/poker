import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CardsContainer from './containers/CardsContainer';
import TableContainer from './containers/TableContainer';
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
  const [showResult, setShowResult] = useState(false);

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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const toggleResult = () =>{
    if(!validateSelection()){
      alert('please set table to have 5 cards and have each player have at least 2 cards');
    }else{
      setShowResult(!showResult);
    }
  }

  const validateSelection =() =>{
    //need to check if community has 5 cards and each player has at least 2 cards to do calculation
    if(table.length !== 5){
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
  }

  return (
    <div>
      <Header />
      <CardsContainer cards={availableCards()} addCard={addCard} />
      <div className="table-containers">
          <TableContainer
            name="Table"
            area="table"
            cards={table}
            removeCard={removeCard}
            selected={selected}
            setSelected={setSelected}
            limit={5}
          />
          <div className='players'>
        {players.map((player, index) =>
              <TableContainer
              key={index}
              name={player.name}
              area={player.name}
              cards={player.hand}
              removeCard={removeCard}
              selected={selected}
              setSelected={setSelected}
              limit={2}
            />
          )}
         </div>
        </div>
        {showResult &&
        <RankDisplay
          players={players}
          calculateRank={rankPlayers}
          communityCards={table}
        />}
        <div className='utlities'  ref={containerRef}>
        User Name:
        <input type="text" value={name} onChange={handleNameChange} data-testid={'userNameInput'} />
          <button
          className={`addUserButton`}
          onClick={() => {addUser()}}
          data-testid={'addUserButtonTest'}
          >
            {`Add User`}
          </button>
          <button
          className={`calculateRank`}
          onClick={() => {toggleResult()}}
          >
            {`Calculate Result`}
          </button>
          <button
          className={`resetTable`}
          onClick={() => {resetTable()}}
          >
            {`Reset Table`}
          </button>
        </div>
      <Footer/>
      </div>
  )}      
         
export default App;