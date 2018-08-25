<template>
  <button class="the-play-button" @click="play" @dblclick="double">
    READY!
  </button>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ThePlayButton',
  data () {
    return {
      test1: 0
    }
  },
  computed: {
    ...mapState({test: state => [...state.commonCards]}),
    ...mapState(['deal']),
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
    }
  },
  methods: {
    double () {
      console.log('doubleclick')
    },
    play () {
      this.test1++
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
      if (this.playerCards.length === 0 && this.dealerCards.length === 0) {
        this.$store.dispatch('startDeal')
      }
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
