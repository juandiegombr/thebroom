export const prepareDeck = () => {
  const facedDownDeck = setFacedDown(createDeck())
  const shuffledDeck = shuffle(facedDownDeck)
  const preparedDeck = setIndex(shuffledDeck)
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
  const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
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

export const setIndex = (deck) => {
  return deck.map((card, index) => {
    return {
      index,
      ...card,
      facedDown: false
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

const hand = [7, 3, 10]
const commonCards = [2, 6, 4, 9]

const card1 = {
  facedDown: true,
  index: 0,
  suit: "sword",
  value: 2
}
const card2 = {
  facedDown: true,
  index: 0,
  suit: "sword",
  value: 6
}
const card3 = {
  facedDown: true,
  index: 0,
  suit: "sword",
  value: 4
}

function getAllCombinations(commonCards) {
  let combinations = []
  let temp = {
    quantity: 0,
    cards: []
  }
  const totalCombinations = Math.pow(2, commonCards.length)
  for ( let i = 0; i < totalCombinations; i++) {
    temp = {}
    for ( let j = 0; j < commonCards.length; j++) {
      if ((i & Math.pow(2, j))) {
        temp.quantity += commonCards[j].value
        temp.cards.push(commonCards[j])
      }
    }
    if (temp !== 0) {
      combinations.push(temp)
    }
  }
  return combinations
}


const combinations = [2, 6, 8, 4, 6, 10, 12, 9, 11, 15, 17, 13, 15, 19, 21]
const combinations2 = [
  {
    "quantity": 2,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 2
      }
    ]
  },
  {
    "quantity": 6,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 6
      }
    ]
  },
  {
    "quantity": 8,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 2
      },
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 6
      }
    ]
  },
  {
    "quantity": 4,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 4
      }
    ]
  },
  {
    "quantity": 6,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 2
      },
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 4
      }
    ]
  },
  {
    "quantity": 10,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 6
      },
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 4
      }
    ]
  },
  {
    "quantity": 12,
    "cards": [
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 2
      },
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 6
      },
      {
        "facedDown": true,
        "index": 0,
        "suit": "sword",
        "value": 4
      }
    ]
  }
]

function getPlays(hand, combinations) {
  let plays = []
  for (let i = 0; i < hand.length; i++) {
    const quantityNedded = 15 - hand[i]
    const matched = combinations.filter(item => item.quantity === quantityNedded)
    plays.push(matched)
  }
  return plays
}