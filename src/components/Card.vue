<template>
  <div class="card" :class="{'card-selected': cardSelected}">
    <div class="card-front" :class="{'matched': isMatched}" @click="clickOnCard">
      <!-- <div class="suit-wrapper">
        <component :is="card.suit"/>
      </div> -->
      <span :class="`card-value ${suitColor}-color`">
        {{card.value}}
      </span>
    </div>
    <div class="card-back" :class="{'face-down': card.facedDown, 'matched': isMatched}" @click="clickOnCard">
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
    isMatched () {
      const matchedCards = this.$store.state.matchedCards.map(card => card.index)
      return matchedCards.includes(this.index)
    },
    suitColor () {
      const colors = {
        heart: 'red',
        sword: 'blue',
        gold: 'yellow',
        wood: 'green'
      }
    return colors[this.card.suit]
    }
  },
  methods: {
    clickOnCard () {
      console.log('carta')
      this.cardSelected = !this.cardSelected
      // if (this.$store.state.facedUpCards.length === 2) return console.log('ya hay dos')
      // if (this.card.facedDown === false) return
      // this.$store.dispatch('setClickedCard', this.card)
      // if (this.$store.state.facedUpCards.length === 2) {
      //   this.$store.dispatch('checkIfCardsMatch')
      // }
    }
  },
  data () {
    return {
      cardSelected: false
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
    width: 40%;
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
