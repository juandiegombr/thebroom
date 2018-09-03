// PREPARING DECK

export const prepareDeck = () => {
	const facedDownDeck = setFacedDown(createDeck())
	const shuffledDeck = shuffle(facedDownDeck)
	const preparedDeck = setOptions(shuffledDeck)
	return preparedDeck
}

const shuffle = (deck) => {
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
			positionIndex: index,
			dealed: false
		}
	}).reverse()
}

// CALCULATE PASS MOVE

export const dealerPassMove = (commonCards, cards) => {
	let cardToPass
	const sumValues = (prev, current) => prev + current.value
	const commonCardsValue = commonCards.reduce(sumValues, 0)
	cards.forEach(card => {
		if ((card.value + commonCardsValue) < 5) {
			cardToPass = card
		}
	})
	if (!cardToPass) {
		cards.forEach(card => {
			if (commonCardsValue < 15 && (card.value + commonCardsValue) > 15) {
				cardToPass = card
			}
		})
	}
	if (!cardToPass) {
		cardToPass = selectThePricelessCard(cards)
	}
	return cardToPass
}

const compareCards = (a, b) => {
	if ((a.value === 7 && a.suit === 'gold') || (a.value === 7 && b.value !== 7) || (a.suit === 'gold' && b.value !== 7)) {
		return 1
	}
	if (a.value !== 7 || a.suit !== 'gold') {
		return -1
	}
	return 0
}

export const selectThePricelessCard = (cards) => {
	const sortedCards = cards.sort(compareCards)
	return sortedCards[0]
}

// CALCULATE MOVE
const clone = (arr) => {
	return JSON.parse(JSON.stringify(arr))
}

const getCommonCardsCombinations = (commonCards) => {
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

const getMoves = (hand, combinations, commonCards) => {
	let moves = []
	const quantityCardsToBroom = commonCards.length + 1
	for (let i = 0; i < hand.length; i++) {
		const quantityNedded = 15 - hand[i].value
		const cardMoves = combinations.filter(item => item.quantity === quantityNedded)
		const cardMovesClone = clone(cardMoves)
		const movesWithPlayerCard = cardMovesClone.map((move, index) => {
			move.cards.push(hand[i])
			move.broom = false
			move.goldSeven = false
			move.card = 0
			move.seven = 0
			move.gold = 0
			move.cards.forEach(card => {
				move.moveValue = 'no_value'
				move.card++
				if (card.value !== 7 && card.suit === 'gold') {
					move.gold++
					if (move.moveValue !== 'seven' && move.moveValue !== 'seven_gold') {
						move.moveValue = 'gold'
					}
				} else
				if (card.value === 7 && card.suit !== 'gold') {
					move.seven++
					if (move.moveValue !== 'seven_gold') {
						move.moveValue = 'seven'
					}
				} else
				if (card.value === 7 && card.suit === 'gold') {
					move.gold++
					move.seven++
					move.goldSeven = true
					move.moveValue = 'seven_gold'
				}
				if (move.cards.length === quantityCardsToBroom) {
					move.moveValue = 'broom'
				}
			})
			return move
		})
		moves.push(...movesWithPlayerCard)
	}
	return moves
}

const comparePlays = (a, b) => {
	if (a.moveValue === 'seven_gold' && b.moveValue !== 'seven_gold') {
		return -1
	}
	if (a.moveValue === 'seven' && b.moveValue !== 'seven_gold' && b.moveValue !== 'seven') {
		return -1
	}
	if (a.moveValue === 'seven' && (b.moveValue === 'seven_gold')) {
		return 1
	}
	if (a.moveValue === 'gold' && (b.moveValue !== 'seven' && b.moveValue !== 'gold' && b.moveValue !== 'seven_gold')) {
		return -1
	}
	if (a.moveValue === 'gold' && (b.moveValue === 'seven' || b.moveValue === 'seven_gold')) {
		return 1
	}
	if (a.moveValue === 'no_value' && b.moveValue !== 'no_value') {
		return 1
	}
	if (a.cards.length > b.cards.length) {
		return -1
	}
	if ((a.cards.length < b.cards.length)) {
		return 1
	}
	return 0
}

const sortByMoveValueAndQuantityCards = (moves) => {
	const isBroom = moves.find(move => move.moveValue === 'broom')
	if (isBroom) {
		return [isBroom]
	}
	const sortedPlays = moves.sort(comparePlays)
	return sortedPlays
}

export const getTheBestMove = (hand, commonCards) => {
	const combinations = getCommonCardsCombinations(commonCards)
	const moves = getMoves(hand, combinations, commonCards)
	const sortedMoves = sortByMoveValueAndQuantityCards(moves)
	return sortedMoves[0]
}

const common = [
	{value: 4, suit: 'heart'},
	{value: 4, suit: 'sword'},
	{value: 10, suit: 'heart'},
	{value: 10, suit: 'gold'},
	{value: 3, suit: 'gold'}
]
const dealer = [
	{value: 7, suit: 'gold'},
	{value: 7, suit: 'sword'}
]
