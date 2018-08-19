<template>
  <div id="app">
    <TheGameArea/>
    <!-- <div class="game-area">
      <Card v-for="(card, i) in $store.state.deck" :key="i" :index="i" :card="card"/>
    </div> -->
      <Card v-for="(card, i) in $store.state.hands[0].cards" :key="i + 10" :index="i" :card="card"/>
      <Card v-for="(card, i) in $store.state.hands[1].cards" :key="i + 20" :index="i" :card="card"/>
      <Card v-for="(card, i) in $store.state.commonCards" :key="i" :index="i" :card="card"/>
  </div>
</template>

<script>
import TheGameArea from '@/components/TheGameArea'
import Card from '@/components/Card'
export default {
  computed: {
    cards () {
      return this.$store.state.facedDownCards
    }
  },
  mounted () {
    this.$store.dispatch('startBroomGame')
  },
  components: {
    Card,
    TheGameArea
  }
}
</script>


<style lang="scss">
body {
 margin: 0; 
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.game-area {
  display: grid;
  box-sizing: border-box;
  height: 100%;
  padding: 60px;
  grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10%;
  grid-template-rows: 25% 25% 25% 25%;
  justify-content: center;
  align-items: center;
}
</style>
