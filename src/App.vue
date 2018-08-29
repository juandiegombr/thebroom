<template>
  <div id="app">
    <TheGameArea/>
    <!-- <ThePlayer/>
    <TheDealer/>
    <TheCommonCards/> -->
    <ThePlayButton/>
    <Cardtest v-for="(card, index) in deck" :key="index" :card="card" :index="0" :position="0"/>
    <!-- <Cardtest v-if="card" :card="card" :index="0" :position="0"/>
    <Cardtest v-if="card" :card="card" :index="0" :position="1"/>
    <Cardtest v-if="card" :card="card" :index="0" :position="2"/> -->
  </div>
</template>

<script>
import TheGameArea from '@/components/TheGameArea'
import ThePlayer from '@/components/ThePlayer'
import TheDealer from '@/components/TheDealer'
import TheCommonCards from '@/components/TheCommonCards'
import ThePlayButton from '@/components/ThePlayButton'
import Card from '@/components/Card'
import Cardtest from '@/components/Cardtest'
import MessageOk from '@/components/messages/MessageOk'
export default {
  name: 'app',
  computed: {
    cards () {
      return this.$store.state.facedDownCards
    },
    deck () {
      return this.$store.state.broomDeck
    },
    card () {
      return this.$store.state.broomDeck[0]
    },
    playerCards () {
      return this.$store.state.hands[0].cards
    },
    dealerCards () {
      return this.$store.state.hands[1].cards
    },
    playersCards () {
      return this.playerCards.length + this.dealerCards.length
    },
  },
  watch: {
    playersCards (value) {
      if (this.$store.state.deal === 6) return
      if (!value) {
        console.log('empty cards')
        this.$store.dispatch('startDeal')
      }
    }
  },
  mounted () {
    this.$store.dispatch('startBroomGame')
  },
  components: {
    Cardtest,
    Card,
    TheGameArea,
    ThePlayer,
    TheDealer,
    TheCommonCards,
    ThePlayButton,
    MessageOk
  }
}
</script>


<style lang="scss">
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
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
