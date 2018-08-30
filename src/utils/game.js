export const prepareDeck = () => {
  const facedDownDeck = setFacedDown(createDeck())
  const shuffledDeck = shuffle(facedDownDeck)
  const preparedDeck = setOptions(shuffledDeck)
  return preparedDeck
}

function shuffle (deck) {
  let cards = deck.slice()
  for (let i = cards.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const randomCard = cards[randomIndex]
    cards[randomIndex] = cards[i]
    cards[i] = randomCard
  }
  return cards
}

export const createDeck = () => {
  let deck = []
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const suits = ['sword', 'gold', 'heart', 'wood']
  values.forEach(value => {
    suits.forEach(suit => {
      deck.push({ value, suit })
    })
  })
  return deck
}

export const setFacedDown = (deck) => {
  return deck.map(card => {
    return {
      ...card,
      facedDown: true
    }
  })
}

export const setOptions = (deck) => {
  return deck.map((card, index) => {
    return {
      index,
      ...card,
      facedDown: true,
      selected: false,
      position: 'deck',
      positionIndex: null,
      dealed: false
    }
  })
}

export const areEquals = (cards) => {
  const firstCard = cards[0]
  const secondCard = cards[1]
  if (firstCard.suit === secondCard.suit) {
    return true
  }
  return false
}

export const getAllCombinations = (commonCards) => {
  let combinations = []
  let temp = {
    quantity: 0,
    cards: []
  }
  const totalCombinations = Math.pow(2, commonCards.length)
  for (let i = 0; i < totalCombinations; i++) {
    temp = {quantity: 0, cards: []}
    for (let j = 0; j < commonCards.length; j++) {
      if ((i & Math.pow(2, j))) {
        temp.quantity += commonCards[j].value
        temp.cards.push(commonCards[j])
      }
    }
    if (temp.quantity !== 0) {
      combinations.push(temp)
    }
  }
  return combinations
}

export const getPlays = (hand, combinations) => {
  let handPlays = []
  for (let i = 0; i < hand.length; i++) {
    const quantityNedded = 15 - hand[i].value
    const cardPlays = combinations.filter(item => item.quantity === quantityNedded)
    const playsWithCard = cardPlays.map(play => {
      play.cards.push(hand[i])
      return play
    })
    handPlays.push(playsWithCard)
  }
  return handPlays
}
export const getPlaysSingleCard = (card, combinations) => {
  let plays = []
  const quantityNedded = 15 - card.value
  const matched = combinations.filter(item => item.quantity === quantityNedded)
  plays.push(matched)
  return plays
}

export const getBestPlay = (handPlays) => {
  let bestPlay = []
  for (let i = 0; i < handPlays.length; i++) {
    const cardPlays = handPlays[i]
    for (let j = 0; j < cardPlays.length; j++) {
      const cards = cardPlays[j].cards
      for (let k = 0; k < cards.length; k++) {
        const card = cards[k]
        bestPlay = handPlays[i][j].cards
        if (isGoldSeven(card)) {
          console.log('break gold seven', i, j, k)
          // return `${i}${j}${k}`
          bestPlay = handPlays[i][j].cards
          return bestPlay
        }
        if (isSeven(card)) {
          console.log('break seven', i, j, k)
          // return `${i}${j}${k}`
          bestPlay = handPlays[i][j].cards
          return bestPlay
        }
        if (isGold(card)) {
          console.log('break gold', i, j, k)
          // return `${i}${j}${k}`
          bestPlay = handPlays[i][j].cards
          return bestPlay
        }
        // console.log('no lucky', i, j, k)
      }
    }
  }
  return bestPlay
}

export const isFifteen = (play) => {
}

export const isGoldSeven = (card) => {
  if (card.value === 7 && card.suit === 'gold') {
    // console.log('gold seven!!')
    return true
  }
  return false
}
export const isSeven = (card) => {
  if (card.value === 7) {
    // console.log('seven!!')
    return true
  }
  return false
}
export const isGold = (card) => {
  if (card.suit === 'gold') {
    // console.log('gold!!')
    return true
  }
  return false
}
export const hasMoreCards = (card) => {
  if (card.suit === 'gold') {
    // console.log('gold!!')
    return true
  }
  return false
}
