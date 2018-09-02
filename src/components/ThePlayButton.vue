<template>
  <div class="the-buttons" :style="{bottom: `calc(20% - 4.4rem)`, right: `calc(50% + 13rem)`}">
    <div class="buttons-group">
      <button class="the-play-button" @click="newRound">
        DEAL
        <i class="far fa-share-square button-icon"></i>
      </button>
      <button class="the-play-button" @click="resetGame">
        RESET
        <i class="far fa-star button-icon"></i>
      </button>
    </div>
    <div class="buttons-group">
      <button class="the-play-button" @click="play" @dblclick="double">
        PLAY
        <i class="far fa-thumbs-up button-icon"></i>
      </button>
      <button class="the-play-button" @click="play">
        PASS
        <i class="far fa-dizzy button-icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getTheBestMove, getAllCombinations, getPlays, getBestPlay, selectThePricelessCard, getBestPlayTest } from '@/utils/game'

export default {
  name: 'ThePlayButton',
  data () {
    return {
      positions: {
        player: {top: 20, left: 50}
      }
    }
  },
  computed: {
    ...mapState(['status', 'turn', 'deal', 'restart', 'playerCards', 'dealerCards', 'selectedCards', 'commonCards']),
    areCardsOnPlayers () {
      return this.playerCards.length + this.dealerCards.length
    }
  },
  watch: {
    turn (newTurn) {
      if (newTurn === 'dealer') {
        setTimeout(() => {
          this.dealerPlay()
        }, 500)
      }
    },
    status (value) {
      if (value === 'finished') this.$store.dispatch('showResults')
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
        this.$store.dispatch('correctPlay')
        if (this.commonCards.length === 0) {
          console.log('player broooooom!!!')
          this.$store.commit('broom', 'player')
        }
      } else {
        this.pass()
      }
    },
    pass () {
      const selectedCard = this.playerCards.find(card => card.selected)
      this.$store.dispatch('pass', {player: 'player', card: selectedCard})
    },
    dealerPlay () {
      const bestMove = getTheBestMove(this.dealerCards, this.commonCards)
      // const bestMoveCards = bestMove.cards
      if (bestMove) {
        console.log('bestMove', bestMove.cards)
        this.$store.dispatch('dealerPlay', bestMove.cards)
          .then(() => {
            setTimeout(() => {
              this.$store.dispatch('correctPlay')
              if (this.commonCards.length === 0) {
                console.log('dealer broooooom!!!')
                this.$store.commit('broom', 'dealer')
              }
            }, 2000)
          })
      } else {
        const pricelessCard = selectThePricelessCard(this.dealerCards)
        console.log('priceless', pricelessCard)
        this.$store.commit('selectCard', pricelessCard)
        setTimeout(() => {
          this.$store.dispatch('pass', {player: 'dealer', card: pricelessCard})
        }, 2000)
      }
    },
    resetGame () {
      this.$store.dispatch('resetGame')
    },
    newRound () {
      this.$store.dispatch('newRound')
    }
  }
}
</script>

<style lang="scss">
.the-buttons {
  position: absolute;
  display: flex;
  .buttons-group {
    display: flex;
    flex-direction: column;
  }
}
.the-play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 15px;
  margin-top: 1rem;
  margin-left: 1rem;
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
