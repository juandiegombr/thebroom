<template>
  <transition-group name="deal" tag="div" class="the-common-cards">
    <Card v-for="(card, i) in $store.state.commonCards" :key="i + 10" :index="i" :card="card"/>
  </transition-group>
</template>

<script>
import Card from './Card'
export default {
  name: 'TheCommonCards',
  props: {
  },
  components: {
    Card
  }
}
</script>

<style lang="scss">
.the-common-cards {
  display: flex;
  position: absolute;
}
</style>
