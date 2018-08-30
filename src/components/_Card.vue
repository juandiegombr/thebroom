<template>
  <div class="card" :class="{'card-selected': card.selected}" @click.stop="clickOnCard">
    <div class="card-front" @dblclick="double">
      <div class="suit-wrapper">
        <component :is="card.suit"/>
      </div>
      <span :class="`card-value ${suitColor}-color`">
        {{card.value}}
      </span>
    </div>
    <div class="card-back" @click="clickOnCard">
      <div class="card-back-design"></div>
      <div class="card-back-corners-top"></div>
      <div class="card-back-corners-bottom"></div>
    </div>
  </div>
</template>

<script>
import Sword from './Suits/Sword'
import Gold from './Suits/Gold'
import Wood from './Suits/Wood'
import Heart from './Suits/Heart'

import { getAllCombinations, getPlays, getPlaysSingleCard, getBestPlay } from '@/utils/game'

export default {
  name: 'Card',
  props: {
    index: {
      type: Number,
      required: true
    },
    card: {
      type: Object,
      required: true
    }
  },
  computed: {
    suitColor () {
      const colors = {
        heart: 'red',
        sword: 'blue',
        gold: 'yellow',
        wood: 'green'
      }
    return colors[this.card.suit]
    },
    commonCards () {
      return this.$store.state.commonCards
    },
    playerCards () {
      return this.$store.state.hands[0].cards
    },
    dealerCards () {
      return this.$store.state.hands[1].cards
    },
    isMyTurn () {
      const { turn } = this.$store.state
      return turn === this.card.player || 'common' === this.card.player
    }
  },
  methods: { 
    double () {
      // clearTimeout(this.timer)
      // console.log('doubleclick')
      // this.prevent = true
      // return
    },
    clickOnCard () {
      // this.timer = setTimeout(() => {
      //   if (!this.prevent) {
      //     console.log('single click')
      //   }
      //   this.prevent = false;
      // }, 300);
      const players = {
        'player': this.playerCards,
        'dealer': this.dealerCards,
        'common': this.commonCards
      }
      if (!this.isMyTurn) return
      if(this.isPlayerOrDealerCard() && this.hasAlreadySelected(players[this.card.player])) {
        this.$store.commit('deselectCard', {card: this.card, index: this.index, player: this.card.player})
        return
      }
      if (this.card.selected) {
        this.$store.commit('deselectCard', {card: this.card, index: this.index, player: this.card.player})
      } else {
        this.$store.commit('selectCard', {card: this.card, index: this.index, player: this.card.player})
      }
        // const handPlays = getPlays(this.playerCards, getAllCombinations(this.commonCards))
        // console.log(getPlays(this.playerCards, getAllCombinations(this.commonCards)))
        // console.log(getBestPlay(handPlays))
          // this.cardSelected = !this.cardSelected
          // if (this.$store.state.facedUpCards.length === 2) return console.log('ya hay dos')
          // if (this.card.facedDown === false) return
          // this.$store.dispatch('setClickedCard', this.card)
          // if (this.$store.state.facedUpCards.length === 2) {
          //   this.$store.dispatch('checkIfCardsMatch')
          // }
    },
    isPlayerOrDealerCard () {
      return this.playerCards.includes(this.card) || this.dealerCards.includes(this.card)
    },
    hasAlreadySelected (cards) {
      return cards.some(card => card.selected)
    },
  },
  data () {
    return {
      cardSelected: false,
      timer: null,
      prevent: false
    }
  },
  components: {
    Sword,
    Gold,
    Wood,
    Heart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/_variables.scss';

.card-selected {
  transform: translateY(-20px) !important;
}
.card {
  position: relative;
  cursor: pointer;
  height: 9rem;
  width: 6rem;
  margin: 5px;
  justify-self: center;
  align-self: center;
  transition: all 0.1s;
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);

  &-value {
    font-size: 80px;
  }
}
.card-front {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 10%;
  transform: rotateY(0deg);
  transition: all .3s;
  &.face-down {
    transform: rotateY(180deg);
    backface-visibility: hidden;
    z-index: 9;
  }
  &.matched {
    transform: rotateY(0deg);
    backface-visibility: hidden;
    z-index: 9;
  }
  .suit-wrapper {
    position: absolute;
    left: 10%;
    top: 6%;
    width: 30%;
    height: 100%;
  }
}
.card-back {
  position: absolute;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 10%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all 1s;
  &.face-down {
    transform: rotateY(0deg);
    z-index: 9;
  }
  &.matched {
    transform: rotateY(180deg);
    z-index: 9;
  }
  &-design {
    position: absolute;
    left: 15px;
    right: 15px;
    top: 15px;
    bottom: 15px;
    border-right: 5px solid rgb(8, 177, 76);
    border-top: 5px solid red;
    border-left: 5px solid rgb(255, 196, 0);
    border-bottom: 5px solid rgb(0, 136, 255);
    &::after {
      // content: '';
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 5px;
      right: 5px;
      border-right: 2px solid rgb(8, 177, 76);
      border-top: 2px solid red;
      border-left: 2px solid rgb(255, 196, 0);
      border-bottom: 2px solid rgb(0, 136, 255);
    }
  }
  &-corners-top {
    position: absolute;
    left: 15px;
    right: 15px;
    top: 15px;
    height: 5px;
    border-right: 5px solid rgb(255, 196, 0);
    border-left: 5px solid rgb(0, 136, 255);
  }
  &-corners-bottom {
    position: absolute;
    left: 15px;
    right: 15px;
    bottom: 15px;
    height: 5px;
    border-right: 5px solid red;
    border-left: 5px solid rgb(8, 177, 76);
  }

}
</style>
