<template>
  <div class="the-buttons" :style="{bottom: `calc(20% - 4.4rem)`, right: `calc(50% + 13rem)`}">
    <button class="the-play-button" @click="play" @dblclick="double">
      PLAY
      <i class="far fa-thumbs-up button-icon"></i>
    </button>
    <button class="the-play-button" @click="play" @dblclick="double">
      PASS
      <i class="far fa-dizzy button-icon"></i>
    </button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getAllCombinations, getPlays, getBestPlay } from '@/utils/game'

export default {
  name: 'ThePlayButton',
  data () {
    return {
      positions: {
        player: {top: 20, left: 50},
      },
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
        }, 500)
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
            }, 2000)
          })
      } else {
        this.$store.commit('selectCard', this.dealerCards[0])
        setTimeout(() => {
          this.$store.dispatch('pass', {player: 1, card: this.dealerCards[0]})
        }, 2000)
      }
      if (this.$store.state.deal === 6) this.$store.dispatch('result')
    }
  }
}
</script>

<style lang="scss">
.the-buttons {
  position: absolute;
  // left: 3rem;
  // bottom: 3rem;
  display: flex;
  flex-direction: column;
}
.the-play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 15px;
  margin-top: 1rem;
  background-color: #eee;
  border: none;
  font-weight: 700;
  font-size: 17px;
  color: #251f1f;
  box-sizing: border-box;
  box-shadow: 0 3px 0 0 rgba(0,0,0,.25);
  transition: all .5s;
  &:hover {
    background-color: white;
    transform: translateY(-2px);
    box-shadow: 0 5px 0 0 rgba(0,0,0,.25);
    .button-icon {
      // transform: rotate(90deg);
      animation: move-icon 1s forwards;
    }
  }
  &:active {
    transform: translateY(3px);
    box-shadow: 0 0 0 0 rgba(0,0,0,.25);
    transition: all .1s;
  }
  .button-icon {
    font-size: 1.4rem;
    margin-left: .5rem;
    transition: all .5s;
    // animation: move-icon .5 infinite;
  }
}

@keyframes pulse-shadow{
    0%{
        box-shadow:0 0 0 0 rgb(116, 171, 235);
    }
    70%{
        box-shadow:0 0 5px 10px rgba(255,255,255,0);
    }
    100%{
        box-shadow:0 0 0 0 rgba(255,255,255,0);
    }
}
@keyframes move-icon {
  0% {
    transform: rotate(0deg) translateX(0px);
  }
  10% {
    transform: rotate(10deg) translateX(0px);
  }
  50% {
    transform: rotate(10deg) translateX(5px);
  }
  100% {
    transform: rotate(10deg) translateX(0px);
  }
  100% {
    transform: rotate(10deg) translateX(0px);
  }
}
</style>
