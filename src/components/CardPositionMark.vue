<template>
  <div class="card-position-mark" :style="{top: `calc(${positions[position].top}% - 4.5rem)`, left: `calc(${positions[position].left}% - ${10 - 7 * positionIndex}rem)`}">
  </div>
</template>

<script>
export default {
  name: 'CardPositionMark',
  props: {
    positionIndex: {
      type: Number,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      positions: {
        deck: {top: 20, left: 5},
        common: {top: 50, left: 50},
        dealer: {top: 20, left: 50},
        dealerDeck: {top: 20, left: 80},
        player: {top: 80, left: 50},
        playerDeck: {top: 80, left: 80}
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/_variables.scss';

.card-position-mark {
  position: absolute;
  cursor: pointer;
  height: 9rem;
  width: 6rem;
  justify-self: center;
  align-self: center;
  transition: all .5s;
  border-radius: 10px;
  border: 0.1rem solid rgba(255, 212, 20, 0.2);
  box-sizing: border-box;
  z-index: -1;
}
</style>
