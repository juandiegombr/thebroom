import Vue from 'vue'
import Vuex from 'vuex'

import { prepareDeck, createDeck, setFacedDown, setIndex, areEquals } from '@/utils/game'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    broomDeck: [],
    hands: [{cards: []},{cards: []}],
    commonCards: [],
    selectedCards: [],
    selectedOwnCard: false,
    playerCardsWinned: [],
    dealerCardsWinned: [],
    turn: 'player',
    deal: 0,
    results: {
      player: {},
      dealer: {}
    }
  },
  mutations: {
    setNewBroomDeck (state, deck) {
      state.broomDeck = deck
    },

    deal (state, handIndex) {
      const hands = ['player', 'dealer']
      let firstCardOfDeck = state.broomDeck.find(card => card.dealed === false)
      if (handIndex === 'commonCard') {
        firstCardOfDeck.player = 'common'
        firstCardOfDeck.position = 'common'
        firstCardOfDeck.positionIndex = state.commonCards.length
        firstCardOfDeck.dealed = true
        state.commonCards.push(firstCardOfDeck)
        return
      }
      firstCardOfDeck.player = hands[handIndex]
      firstCardOfDeck.position = hands[handIndex]
      firstCardOfDeck.positionIndex = state.hands[handIndex].cards.length
      firstCardOfDeck.dealed = true
      const hand = state.hands[handIndex]
      hand.cards.push(firstCardOfDeck)
    },

    dealerSelectedCards (state, cards) {
      state.selectedCards = cards
      const dealerSelectedCard = cards.filter(card => card.player === 'dealer')[0]
      const dealerCards = state.hands[1].cards
      const commonSelectedCard = cards.filter(card => card.player === 'common')
      const commonCards = state.commonCards
      dealerCards.forEach((el, i) => {
        if (el.suit === dealerSelectedCard.suit && el.value === dealerSelectedCard.value) {
          dealerCards[i].selected = true
        }
      })
      commonSelectedCard.forEach((selectCard, i) => {
        commonCards.forEach((commonCard, j) => {
          if (selectCard.suit === commonCard.suit && selectCard.value === commonCard.value) {
            commonCards[j].selected = true
          }
        })
      })
    },

    selectCard (state, card) {
      const { index } = card
      state.selectedCards.push(card)
      state.broomDeck[index].selected = true
    },

    deselectCard (state, card) {
      const { index } = card
      state.broomDeck[index].selected = false
      state.selectedCards.some((selectedCard, i) => {
        if (selectedCard === card) {
          state.selectedCards.splice(i, 1)
          return
        }
      })
    },

    removePlayedCard (state, card) {
      const { player, index } = card
      state.broomDeck[index].position = `${state.turn}Deck`
      state.broomDeck[index].selected = false
      state.broomDeck[index].positionIndex = 0
      const players = {
        dealer: state.hands[1].cards,
        player: state.hands[0].cards,
        common: state.commonCards
      }
      players[player].forEach((playerCard, i) => {
        if (playerCard === card) {
          players[player].splice(i, 1)
          return
        }
      })
    },
    resetSelectedCards (state) {
      state.selectedCards = []
    },

    changeTurn (state) {
      const turns = {
        'player': 'dealer',
        'dealer': 'player'
      }
      state.turn = turns[state.turn]
    },

    setCardToCommonCards (state, {player, card}) {
      const newPlayerHand = state.hands[player].cards.filter(card => !card.selected)
      state.hands[player].cards = newPlayerHand
      card.selected = false
      card.player = 'common'
      state.commonCards.push(card)
    },

    dealDid (state) {
      state.deal++
    },

    setResults (state, results) {
      state.results = results
    },

    changeCardPosition (state, {card, index, position}) {
      const hands = {'player': 0, 'dealer': 1}
      const hand = state.hands[hands[card.player]].cards
      hand.forEach((handCard, index) => {
        if (card === handCard) {
          hand.splice(index, 1)
          return
        }
      })
      state.broomDeck[index].position = position
      state.broomDeck[index].position = position
      state.broomDeck[index].player = position
      state.broomDeck[index].positionIndex = state.commonCards.length
      state.commonCards.push(card)
    }
  },
  actions: {
    startBroomGame ({commit, dispatch}) {
      let deck = prepareDeck()
      commit('setNewBroomDeck', deck)
      dispatch('startDeal')
    },

    startDeal ({commit, dispatch, state}) {
      const dealQueue = [0, 1, 0, 1, 0, 1]
      dealQueue.forEach((handIndex, i) => {
        setTimeout(() => { commit('deal', handIndex) }, 10 * i)
      })
      if (state.deal === 0) {
        setTimeout(() => { dispatch('startDealCommonCards') }, 10 * dealQueue.length - 1)
      }
      commit('dealDid')
    },

    startDealCommonCards ({commit}) {
      const commonCards = 2
      for (let i = 0; i < commonCards; i++) {
        setTimeout(() => { commit('deal', 'commonCard') }, 10 * i)
      }
    },

    correctPlay ({commit, state}) {
      const turns = ['player', 'dealer']
      const currentHandIndex = turns.indexOf(state.turn)
      state.selectedCards.forEach((selectedCard, index) => {
        for (let i = 0; i < state.hands[currentHandIndex].cards.length; i++) {
          const playerCard = state.hands[currentHandIndex].cards[i];
          if (playerCard === selectedCard) {
            commit('removePlayedCard', playerCard)
            break
          }
        }
        for (let i = 0; i < state.commonCards.length; i++) {
          const commonCard = state.commonCards[i];
          if (commonCard === selectedCard) {
            commit('removePlayedCard', commonCard)
          }
        }
      })
      commit('changeTurn')
      commit('resetSelectedCards')
    },

    pass ({commit, state}, {player, card}) {
      commit('setCardToCommonCards', {player, card})
      commit('resetSelectedCards')
      commit('changeTurn')
    },

    dealerPass ({commit, state}, {player, card}) {
      commit('setCardToCommonCards', {player, card})
      commit('resetSelectedCards')
      commit('changeTurn')
    },

    dealerPlay ({commit}, cards) {
      commit('dealerSelectedCards', cards)
      return true
    },

    result ({commit, state}) {
      const player = {
        cards: state.playerCardsWinned.length,
        goldSeven: state.playerCardsWinned.filter(card => card.value === 7 && card.suit === 'gold').length,
        seven: state.playerCardsWinned.filter(card => card.value === 7).length,
        gold: state.playerCardsWinned.filter(card => card.suit === 'gold').length
      }
      const dealer = {
        cards: state.dealerCardsWinned.length,
        goldSeven: state.dealerCardsWinned.filter(card => card.value === 7 && card.suit === 'gold').length,
        seven: state.dealerCardsWinned.filter(card => card.value === 7).length,
        gold: state.dealerCardsWinned.filter(card => card.suit === 'gold').length
      }
      const points = {
        player: 0,
        dealer: 0,
        winner: null
      }
      for (const key in player) {
        if (player[key] > dealer[key]) {
          points.player++
        } else if (player[key] < dealer[key]) {
          points.dealer++
        }
      }
      if (points.player > points.dealer) {
        points.winner = 'player'
      } else {
        points.winner = 'dealer'
      }
      commit('setResults', {player, dealer, points})
    }
  },
  getters: {
    getCommonCard: state => state.commonCards,
    commonCards: state => state.broomDeck.filter(card => card.position === 'common'),
    dealerCards: state => state.broomDeck.filter(card => card.position === 'dealer'),
    dealeWinnedrCards: state => state.broomDeck.filter(card => card.position === 'dealerDeck'),
    playerCards: state => state.broomDeck.filter(card => card.position === 'player'),
    playerWinnedCards: state => state.broomDeck.filter(card => card.position === 'playerDeck')
  }
})
