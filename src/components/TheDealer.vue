<template>
  <div class="the-dealer">
    <transition-group name="deal" tag="div" class="the-dealer-hand">
      <Card v-for="(card, i) in $store.state.hands[1].cards" :key="i + 10" :index="i" :card="card"/>
    </transition-group>
  </div>
</template>

<script>
import Card from './Card'
export default {
  name: 'TheDealer',
  props: {
  },
  components: {
    Card
  }
}
</script>

<style lang="scss">
.the-dealer {
  display: flex;
  position: absolute;
  bottom: 60px;
}
.the-dealer-hand {
  display: flex;
}
</style>
