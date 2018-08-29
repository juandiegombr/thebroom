<template>
  <button class="the-play-button" @click="play" @dblclick="double">
    READY!
  </button>
</template>

<script>
import { mapState } from 'vuex'
import { getAllCombinations, getPlays, getBestPlay } from '@/utils/game'

export default {
  name: 'ThePlayButton',
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['turn', 'deal']),
    selectedCards () {
      return this.$store.state.selectedCards
    },
    playerCards () {
      return this.$store.state.hands[0].cards
    },
    dealerCards () {
      return this.$store.state.hands[1].cards
    },
    commonCards () {
      return [...this.$store.state.commonCards]
    },
    turn () {
      return this.$store.state.turn
    }
  },
  watch: {
    commonCards (value) {
      if (value.length === 0) {
        console.log('escoba!!!')
      }
    },
    turn (newTurn) {
      console.log(newTurn)
      if (newTurn === 'dealer') {
        setTimeout(() => {
          this.dealerPlay()
        }, 500);
      }
    }
  },
  methods: {
    double () {
      console.log('doubleclick')
    },
    play () {
      const sumValues = (prev, current) => prev + current.value
      const playValue = this.selectedCards.reduce(sumValues, 0)
      if (playValue === 15) {
        console.log('Well play!')
        this.$store.dispatch('correctPlay')
      } else {
        this.pass()
        console.log('Ha ha ha! You have to count better!')
      }
      if (this.$store.state.deal === 6) this.$store.dispatch('result')
    },
    pass () {
      const players = {
        'player': this.playerCards,
        'dealer': this.dealerCards
      }
      const index = {
        'player': 0,
        'dealer': 1
      }
      const selectedCard = players[this.turn].find(card => card.selected)
      this.$store.dispatch('pass', {player: index[this.turn], card: selectedCard})
    },
    dealerPlay () {
      const combinations = getAllCombinations(this.commonCards)
      const plays = getPlays(this.dealerCards, combinations)
      const bestPlay = getBestPlay(plays)
      if (bestPlay.length > 0) {
        this.$store.dispatch('dealerPlay', bestPlay)
          .then(() => {
            setTimeout(() => {
              this.$store.dispatch('correctPlay')
            }, 500)
          })
      } else {
        this.$store.commit('selectCard', this.dealerCards[0])
          setTimeout(() => {
            this.$store.dispatch('pass', {player: 1, card: this.dealerCards[0]})
          }, 500)
      }
      if (this.$store.state.deal === 6) this.$store.dispatch('result')
    }
  }
}
</script>

<style lang="scss">
.the-play-button {
  position: absolute;
  left: 20px;
  bottom: 20px;
  padding: 30px;
  background-color: transparent;
  border: 2px solid white;
  font-weight: 700;
  font-size: 25px;
  color: white;
  &:hover {
    background-color: white;
    color: black
  }
}
</style>
