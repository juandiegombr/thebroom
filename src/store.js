import Vue from 'vue'
import Vuex from 'vuex'

import { prepareDeck, createDeck, setFacedDown, setIndex, areEquals } from '@/utils/game'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isSecondCard: false,
    facedUpCards: [],
    matchedCards: [],
    deck: [],
    broomDeck: [],
    hands: [{cards: []},{cards: []}],
    commonCards: []
  },
  mutations: {
    setNewDeck (state, deck) {
      state.deck = deck
    },
    setNewBroomDeck (state, deck) {
      state.broomDeck = deck
    },
    setSecondCard (state, value) {
      state.isSecondCard = value
    },
    setFacedUp (state, index) {
      state.deck[index].facedDown = !state.deck[index].facedDown
    },
    setFacedDownAll (state) {
      state.deck = state.deck.map(card => {
        return {
          ...card,
          facedDown: true
        }
      })
    },
    setCardFacedUp (state, card) {
      state.facedUpCards.push(card)
    },
    resetFacedUpCards (state) {
      state.facedUpCards = []
    },
    areEquals (state) {
      state.matchedCards.push(...state.facedUpCards)
    },
    deal (state, handIndex) {
      let firstCardOfDeck = state.broomDeck.shift()
      if (handIndex === 'commonCard') {
        state.commonCards.push(firstCardOfDeck)
        return
      }
      const hand = state.hands[handIndex]
      hand.cards.push(firstCardOfDeck)
    },
  },
  actions: {
    startBroomGame ({commit, dispatch}) {
      let deck = prepareDeck()
      commit('setNewBroomDeck', deck)
      dispatch('startDeal')
    },
    startGame ({commit}) {
      let deck = setIndex(setFacedDown(createDeck()))
      commit('setNewDeck', deck)
    },
    setClickedCard ({commit, state}, card) {
      if (state.isSecondCard) {
        commit('setSecondCard', false)
      } else {
        commit('setSecondCard', true)
      }
      commit('setFacedUp', card.index)
      commit('setCardFacedUp', card)
    },
    checkIfCardsMatch ({commit, state}) {
      if (areEquals(state.facedUpCards)) {
        commit('areEquals')
      }
      setTimeout(() => {
        commit('setFacedDownAll')
        commit('resetFacedUpCards')
      }, 2000)
    },
    startDeal ({commit, dispatch}) {
      const dealQueue = [0, 1, 0, 1, 0, 1]
      dealQueue.forEach((handIndex, i) => {
        setTimeout(() => { commit('deal', handIndex) }, 1000 * i)
      })
      setTimeout(() => { dispatch('startDealCommonCards') }, 1000 * dealQueue.length - 1)
    },
    startDealCommonCards ({commit}) {
      const commonCards = 4
      for (let i = 0; i < commonCards; i++) {
        setTimeout(() => { commit('deal', 'commonCard') }, 1000 * i)
      }
    }
  }
})
