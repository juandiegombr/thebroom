<template>
  <div class="the-player">
    <transition-group name="deal" tag="div" class="the-player-hand">
      <Card v-for="(card, i) in $store.state.hands[0].cards" :key="i + 10" :index="i" :card="card"/>
    </transition-group>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'ThePlayer',
  props: {
  },
  components: {
    Card
  }
}
</script>

<style lang="scss">
.the-player {
  display: flex;
  position: absolute;
  top: 60px;
}
.the-player-hand {
  display: flex;
}
.deal-enter-active {
  animation: deal 0.3s;
}
.deal-leave-active {
  animation: deal 0.3s reverse;
}
@keyframes deal {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
