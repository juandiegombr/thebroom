<template>
<div class="card" :class="{'selected': card.selected}" :style="{top: `calc(${positions[card.position].top}% - 4.5rem)`, left: `calc(${positions[card.position].left}% - ${(card.position !== 'player' && card.position !== 'dealer' && card.position !== 'common' ? 0 : card.position === 'common' ? commonCardsInitialPosition : 10 ) - 7 * card.positionIndex}rem)`}">
    <div class="card-front" :class="{'face-down': card.facedDown, 'selected': card.selected}" @click="moveCard">
      <div class="suit-wrapper">
        <!-- <component :is="card.suit"/> -->
      </div>
      <span :class="`card-value ${suitColor}-color`">
        {{card.value}}
      </span>
    </div>
    <div class="card-back" :class="{'face-down': card.facedDown}">
      <div class="card-back-design"></div>
      <div class="card-back-corners-top"></div>
      <div class="card-back-corners-bottom"></div>
    </div>
  </div>
</template>

<script>
// import Sword from './Suits/Sword'
// import Gold from './Suits/Gold'
// import Wood from './Suits/Wood'
// import Heart from './Suits/Heart'

import { getAllCombinations, getPlays, getBestPlay } from '@/utils/game'
import { mapState } from 'vuex'

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
    },
    position: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(['playerCards', 'dealerCards', 'commonCards']),
    suitColor () {
      const colors = {
        heart: 'red',
        sword: 'blue',
        gold: 'yellow',
        wood: 'green'
      }
      return colors[this.card.suit]
    },
    playersCards () {
      return this.playerCards.length + this.dealerCards.length
    },
    commonCardsInitialPosition () {
      return this.commonCards.length / 2 * 6 + (this.commonCards.length - 1) / 2
    }
  },
  methods: {
    moveCard () {
      if (this.card.selected) {
        this.$store.commit('deselectCard', this.card)
      } else {
        this.$store.commit('selectCard', this.card)
      }
    },
    clickOnCard () {
      this.cardSelected = !this.cardSelected
    },
    clickOnCardTest () {
      this.cardSelected = !this.cardSelected
      const handPlays = getPlays(this.playerCards, getAllCombinations(this.commonCards))
      console.log(getPlays(this.playerCards, getAllCombinations(this.commonCards)))
      console.log(getBestPlay(handPlays))
    }
  },
  data () {
    return {
      cardSelected: false,
      positions: {
        deck: {top: 50, left: 5},
        common: {top: 50, left: 50},
        dealer: {top: 20, left: 50},
        dealerDeck: {top: 20, left: 20},
        player: {top: 80, left: 50},
        playerDeck: {top: 80, left: 80}
      },
      positionstest: [
        {
          top: 40,
          left: 50
        },
        {
          top: 2, left: 50
        },
        {
          top: 80, left: 50
        },
        {
          top: 100, left: 100
        },
        {
          top: 0, left: 100
        },
        {
          top: 50, left: 50
        }
      ],
      number: 0
    }
  },
  components: {
    // Sword,
    // Gold,
    // Wood,
    // Heart
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import '@/assets/css/_variables.scss';

.card {
  position: absolute;
  cursor: pointer;
  height: 9rem;
  width: 6rem;
  justify-self: center;
  align-self: center;
  transition: all .8s;
  border-radius: 10px;
  // transition: all 2s cubic-bezier(0.85, 0.12, 0, 1.07) 0s;

  .selected {
    // transform: translateY(-20px) !important;
    transform: scale(1.1) !important;
    box-shadow: 0 0 8px 6px rgba(255, 255, 255, 0.23), 0 0 8px 3px rgba(255, 255, 255, 0.23), 0 0 4px 3px rgba(255, 255, 255, 0.23);
    // animation: pulse-shadow 1s infinite alternate-reverse;
    // z-index: 1;
    // top: 0;
    // right: 0;
  }
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
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);
  backface-visibility: hidden;
  transform: rotateY(0deg);
  transition: all .4s;
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
  // box-shadow: 2px 2px 20px -5px rgba(0, 0, 0, 0.25);
  transform: rotateY(180deg);
  backface-visibility: hidden;
  transition: all .4s;
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
  .pulse-shadow {
    -webkit-animation:pulse-shadow 2s infinite!important;
    animation:pulse-shadow 2s infinite!important;
    z-index: 1;
  }

}
@keyframes pulse-shadow{
    0%{
        box-shadow: 0 0 8px 6px rgba(255, 255, 255, 0.0), 0 0 8px 3px rgba(255, 255, 255, 0.0), 0 0 4px 3px rgba(255, 255, 255, 0.0);
        /* border: 1px solid white; */
    }
    100%{
        box-shadow: 0 0 8px 6px rgba(255, 255, 255, 0.23), 0 0 8px 3px rgba(255, 255, 255, 0.23), 0 0 4px 3px rgba(255, 255, 255, 0.23);
        /* border: 1px solid white; */
    }
}
</style>
