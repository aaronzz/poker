export function rankPlayers(input) {  
    const community = parseCommunity(input.Community);
    const players = Object.keys(input).filter(key => key !== "Community");
    const playerHands = players.map(player => {
    const holeCards = parseHand(input[player]);
    const cards = community.concat(holeCards);
    return {
    name: player,
    hand: getBestHand(cards)
    };
    });
    playerHands.sort((a, b) => compareHands(b.hand, a.hand));
    let result = [];
    for (let i = 0; i < playerHands.length; i++) {
      const playerHand = playerHands[i];
      result.push(`Rank ${i + 1}: ${playerHand.name}`);
      
    }
    return result;

}


function parseCard(cardString) {
  const valueString = cardString.substring(0, cardString.length - 1);
  const suit = cardString.charAt(cardString.length - 1);
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

function parseHand(hand) {
  return hand.map(parseCard);
}

function parseCommunity(community) {
  return community.map(parseCard);
}

function getBestHand(cards) {
  cards.sort((a, b) => b.value - a.value);
  let handRank = 0;
  let hand = [];
  const numCards = cards.length;
  for (let i = 0; i < numCards - 4; i++) {
    for (let j = i + 1;  j < numCards - 3;
      j++) {
      for (let k = j + 1; k < numCards - 2; k++) {
        for (let l = k + 1; l < numCards - 1; l++) {
          for (let m = l + 1; m < numCards; m++) {
            const fiveCards = [cards[i], cards[j], cards[k], cards[l], cards[m]];
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
            let rank;
            if (isFlush && isStraight && fiveCards[0].value === 14) {
              rank = 9; // Royal Flush
            } else if (isFlush && isStraight) {
              rank = 8; // Straight Flush
            } else if (hasFourOfAKind) {
              rank = 7; // Four of a Kind
            } else if (hasFullHouse) {
              rank = 6; // Full House
            } else if (isFlush) {
              rank = 5; // Flush
            } else if (isStraight) {
              rank = 4; // Straight
            } else if (hasThreeOfAKind) {
              rank = 3; // Three of a Kind
            } else if (hasTwoPair) {
              rank = 2; // Two Pair
            } else if (hasOnePair) {
              rank = 1; // One Pair
            } else {
              rank = 0; // High Card
            }
            if (rank > handRank) {
              handRank = rank;
              hand = fiveCards;
            }
          }
        }
      }
    }
  }
  return { rank: handRank, hand };

}      



function compareHands(hand1, hand2) {
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