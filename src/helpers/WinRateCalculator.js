// Monte Carlo simulation to calculate win rates
export function calculateWinRate(playerHand, communityCards, numPlayers, numSimulations = 1000) {
  if (!playerHand || playerHand.length !== 2) {
    return { winRate: 0, tieRate: 0, loseRate: 0 };
  }

  const deck = createDeck();
  const usedCards = [...playerHand, ...communityCards];
  const availableDeck = deck.filter(card => 
    !usedCards.some(used => used.code === card.code)
  );

  let wins = 0;
  let ties = 0;
  let losses = 0;

  for (let i = 0; i < numSimulations; i++) {
    const shuffled = [...availableDeck];
    shuffleArray(shuffled);

    // Complete the community cards if needed
    const neededCommunityCards = 5 - communityCards.length;
    const simulatedCommunity = [...communityCards];
    for (let j = 0; j < neededCommunityCards; j++) {
      simulatedCommunity.push(shuffled.pop());
    }

    // Deal cards for opponents
    const opponents = [];
    for (let j = 0; j < numPlayers - 1; j++) {
      opponents.push([shuffled.pop(), shuffled.pop()]);
    }

    // Evaluate all hands
    const playerHandRank = evaluateHand([...playerHand, ...simulatedCommunity]);
    const opponentRanks = opponents.map(oppHand => 
      evaluateHand([...oppHand, ...simulatedCommunity])
    );

    // Compare hands
    let isBest = true;
    let isTied = false;
    for (const oppRank of opponentRanks) {
      const comparison = compareHandRanks(playerHandRank, oppRank);
      if (comparison < 0) {
        isBest = false;
        break;
      } else if (comparison === 0) {
        isTied = true;
      }
    }

    if (isBest && isTied) {
      ties++;
    } else if (isBest) {
      wins++;
    } else {
      losses++;
    }
  }

  return {
    winRate: (wins / numSimulations) * 100,
    tieRate: (ties / numSimulations) * 100,
    loseRate: (losses / numSimulations) * 100
  };
}

function createDeck() {
  const suits = ['h', 'd', 'c', 's'];
  const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({
        code: `${value}${suit}`,
        name: `${value} of ${getSuitName(suit)}`
      });
    }
  }

  return deck;
}

function getSuitName(suit) {
  const names = { 'h': 'Hearts', 'd': 'Diamonds', 'c': 'Clubs', 's': 'Spades', 
                  'H': 'Hearts', 'D': 'Diamonds', 'C': 'Clubs', 'S': 'Spades' };
  return names[suit] || suit;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function parseCard(cardCode) {
  const valueString = cardCode.substring(0, cardCode.length - 1);
  const suit = cardCode.charAt(cardCode.length - 1).toUpperCase();
  let value;
  switch (valueString) {
    case "2": value = 2; break;
    case "3": value = 3; break;
    case "4": value = 4; break;
    case "5": value = 5; break;
    case "6": value = 6; break;
    case "7": value = 7; break;
    case "8": value = 8; break;
    case "9": value = 9; break;
    case "10": value = 10; break;
    case "J": value = 11; break;
    case "Q": value = 12; break;
    case "K": value = 13; break;
    case "A": value = 14; break;
    default: throw new Error(`Invalid card value: ${valueString}`);
  }
  return { value, suit };
}

function evaluateHand(cards) {
  const parsedCards = cards.map(card => parseCard(card.code || card));
  parsedCards.sort((a, b) => b.value - a.value);

  let bestRank = { rank: 0, hand: [] };
  const numCards = parsedCards.length;

  for (let i = 0; i < numCards - 4; i++) {
    for (let j = i + 1; j < numCards - 3; j++) {
      for (let k = j + 1; k < numCards - 2; k++) {
        for (let l = k + 1; l < numCards - 1; l++) {
          for (let m = l + 1; m < numCards; m++) {
            const fiveCards = [parsedCards[i], parsedCards[j], parsedCards[k], parsedCards[l], parsedCards[m]];
            const rank = rankFiveCards(fiveCards);
            if (rank > bestRank.rank) {
              bestRank = { rank, hand: fiveCards };
            }
          }
        }
      }
    }
  }

  return bestRank;
}

function rankFiveCards(fiveCards) {
  const isFlush = (new Set(fiveCards.map(card => card.suit))).size === 1;
  const isStraight = (fiveCards[0].value === fiveCards[1].value + 1 &&
    fiveCards[1].value === fiveCards[2].value + 1 &&
    fiveCards[2].value === fiveCards[3].value + 1 &&
    fiveCards[3].value === fiveCards[4].value + 1) ||
    (fiveCards[0].value === 14 &&
      fiveCards[1].value === 5 &&
      fiveCards[2].value === 4 &&
      fiveCards[3].value === 3 &&
      fiveCards[4].value === 2);

  const groupedCards = {};
  for (const card of fiveCards) {
    if (!groupedCards[card.value]) {
      groupedCards[card.value] = [];
    }
    groupedCards[card.value].push(card);
  }

  const numGroups = Object.keys(groupedCards).length;
  const hasFourOfAKind = numGroups === 2 && Object.values(groupedCards).some(cards => cards.length === 4);
  const hasFullHouse = numGroups === 2 && Object.values(groupedCards).some(cards => cards.length === 3);
  const hasThreeOfAKind = numGroups === 3 && Object.values(groupedCards).some(cards => cards.length === 3);
  const hasTwoPair = numGroups === 3 && Object.values(groupedCards).some(cards => cards.length === 2);
  const hasOnePair = numGroups === 4 && Object.values(groupedCards).some(cards => cards.length === 2);

  if (isFlush && isStraight && fiveCards[0].value === 14) {
    return 9; // Royal Flush
  } else if (isFlush && isStraight) {
    return 8; // Straight Flush
  } else if (hasFourOfAKind) {
    return 7; // Four of a Kind
  } else if (hasFullHouse) {
    return 6; // Full House
  } else if (isFlush) {
    return 5; // Flush
  } else if (isStraight) {
    return 4; // Straight
  } else if (hasThreeOfAKind) {
    return 3; // Three of a Kind
  } else if (hasTwoPair) {
    return 2; // Two Pair
  } else if (hasOnePair) {
    return 1; // One Pair
  } else {
    return 0; // High Card
  }
}

function compareHandRanks(hand1, hand2) {
  if (hand1.rank > hand2.rank) {
    return 1;
  } else if (hand1.rank < hand2.rank) {
    return -1;
  } else {
    const hand1Values = hand1.hand.map(card => card.value);
    const hand2Values = hand2.hand.map(card => card.value);
    for (let i = 0; i < 5; i++) {
      if (hand1Values[i] > hand2Values[i]) {
        return 1;
      } else if (hand1Values[i] < hand2Values[i]) {
        return -1;
      }
    }
    return 0;
  }
}
